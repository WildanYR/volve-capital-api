import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  AUTO_BOT_MODULE_REPOSITORY,
  AUTO_BOT_REPOSITORY,
  AUTO_LOG_REPOSITORY,
  MYSQL_PROVIDER,
  PLATFORM_PRODUCT_REPOSITORY,
  TRANSACTION_REPOSITORY,
} from 'src/constant/database.const';
import { AutoBot } from 'src/database/models/auto-bot.model';
import { AutoLog } from 'src/database/models/auto-log.model';
import { ConnectBotDto } from './dto/connect-bot.dto';
import { LogBotDto } from './dto/log-bot.dto';
import { AutoBotModule } from 'src/database/models/auto-bot-module.model';
import { BotTransactionDto } from './dto/bot-transaction.dto';
import { PlatformProduct } from 'src/database/models/platform-product.model';
import { Op } from 'sequelize';
import { TransactionService } from '../transaction/transaction.service';
import { Transaction } from 'src/database/models/transaction.model';
import { ProductVariant } from 'src/database/models/product-variant.model';
import { ProductAccountUser } from 'src/database/models/product-account-user.model';
import { ProductAccount } from 'src/database/models/product-account.model';
import { Email } from 'src/database/models/email.model';
import { MysqlProvider } from 'src/database/mysql.provider';

/**
 *
 * Bot Type:
 * 1. PLATFORM_BOT
 * 2. ACCOUNT_TASK_BOT
 *
 * Status:
 * 1. CONNECTED
 * 2. DISCONNECTED
 * 3. RUNNING
 * 4. LOGIN
 * 6. PAUSED
 *
 * untuk PLATFORM_BOT status connected perlu di start manual
 * dari frontend, kemudian akan mengubah statusnya jadi RUNNING
 * atau LOGIN
 * jika LOGIN maka
 */

@Injectable()
export class AutomationService {
  constructor(
    @Inject(AUTO_BOT_REPOSITORY)
    private readonly autoBotRepository: typeof AutoBot,
    @Inject(AUTO_BOT_MODULE_REPOSITORY)
    private readonly autoBotModuleRepository: typeof AutoBotModule,
    @Inject(AUTO_LOG_REPOSITORY)
    private readonly autoLogRepository: typeof AutoLog,
    @Inject(PLATFORM_PRODUCT_REPOSITORY)
    private readonly platformProductRepository: typeof PlatformProduct,
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: typeof Transaction,
    @Inject(MYSQL_PROVIDER) private mysqlProvider: MysqlProvider,
    private readonly transactionService: TransactionService,
  ) {}

  async connect(botId: string, connectBotDto: ConnectBotDto) {
    console.log({ connected: { ...connectBotDto, id: botId } });
    const nowDate = new Date();
    const bot = await this.autoBotRepository.findOne({
      where: { bot_id: botId },
    });

    if (!bot) {
      const { name, type, modules } = connectBotDto;
      const newBot = await this.autoBotRepository.create({
        bot_id: botId,
        health_check_date: nowDate,
        name,
        type,
        status: 'CONNECTED',
      });
      if (modules?.length) {
        const moduleCreate = modules.map((item) => ({
          name: item,
          auto_bot_id: newBot.id,
        }));
        await this.autoBotModuleRepository.bulkCreate(moduleCreate);
      }
      return newBot;
    }

    await bot.update({ health_check_date: nowDate, status: 'CONNECTED' });
  }

  async disconnect(botId: string) {
    const bot = await this.autoBotRepository.findOne({
      where: { bot_id: botId },
    });

    if (!bot) {
      throw new NotFoundException(`bot ${botId} tidak ditemukan`);
    }

    await bot.update({ status: 'DISCONNECTED' });
  }

  async healthCheck(botId: string) {
    const bot = await this.autoBotRepository.findOne({
      where: { bot_id: botId },
    });

    if (!bot) {
      throw new NotFoundException(`bot ${botId} tidak ditemukan`);
    }

    await bot.update({ health_check_date: new Date() });
  }

  async log(botId: string, logBotDto: LogBotDto) {
    const bot = await this.autoBotRepository.findOne({
      where: { bot_id: botId },
    });

    if (!bot) {
      throw new NotFoundException(`bot ${botId} tidak ditemukan`);
    }

    await this.autoLogRepository.create({
      auto_bot_id: bot.id,
      log: logBotDto.log,
      type: logBotDto.type,
      timestamp: logBotDto.timestamp,
    });
  }

  async updateStatus(botId: string, status: string) {
    console.log({ connected: { id: botId, status } });
    const bot = await this.autoBotRepository.findOne({
      where: { bot_id: botId },
    });

    if (!bot) {
      throw new NotFoundException(`bot ${botId} tidak ditemukan`);
    }

    if (bot.status !== status) {
      await bot.update({ status });
    }
  }

  async createAccount(botId: string, botTransactionDto: BotTransactionDto) {
    const transaction = await this.mysqlProvider.transaction();
    try {
      // urai itemnya, cek dengan nama di produk platform
      const productNames = botTransactionDto.items.map((item) => item.name);
      console.log({ productNames });
      const platformProducts = await this.platformProductRepository.findAll({
        where: {
          product_name: {
            [Op.in]: productNames,
          },
        },
        raw: true,
        transaction,
      });
      console.log({ platformProducts });
      const transactionsItems: { name: string; product_variant_id: number }[] =
        [];
      for (const pp of platformProducts) {
        for (const item of botTransactionDto.items) {
          if (pp.product_name === item.name) {
            if (item.qty) {
              for (let i = 0; i < item.qty; i++) {
                transactionsItems.push({
                  name: botTransactionDto.username,
                  product_variant_id: pp.product_variant_id,
                });
              }
            }
          }
        }
      }
      console.log({ transactionsItems });
      if (!transactionsItems.length) {
        await transaction.commit();
        return { messages: [] };
      }
      // buat transaksi dan generate user baru
      const generatedTransactionIds: number[] = [];
      for (const ti of transactionsItems) {
        const generatedTransaction = await this.transactionService.create(
          ti,
          transaction,
        );
        console.log({ generatedTransaction: generatedTransaction.toJSON() });
        generatedTransactionIds.push(generatedTransaction.toJSON().id);
      }
      console.log({ generatedTransactionIds });
      const transactions = await this.transactionRepository.findAll({
        where: {
          id: { [Op.in]: generatedTransactionIds },
        },
        include: [
          { model: ProductVariant, as: 'product_variant' },
          {
            model: ProductAccount,
            as: 'product_account',
            include: [{ model: Email, as: 'email' }],
          },
          { model: ProductAccountUser, as: 'product_account_user' },
        ],
        transaction,
      });
      console.log({ transactions });
      // buat template text berdasarkan template di produk varian
      const messages: string[] = [];
      for (const t of transactions) {
        const to = t.toJSON();
        const args: {
          email?: string;
          pass?: string;
          profil?: string;
          expired?: string;
        } = {
          email: to.product_account.email.email,
          expired: to.product_account.batch_end_date?.toLocaleString() ?? '',
          pass: to.product_account.account_password,
          profil: to.product_account_user.account_profile ?? '',
        };
        let result = '';
        if (!to.product_variant.template) {
          result = `Email: ${args.email}\nPassword: ${args.pass}`;
        } else {
          result = to.product_variant.template.replace(
            /{(\w+)}/g,
            (_, key) => args[key as keyof typeof args] ?? `{${key}}`,
          );
        }
        messages.push(result.replaceAll(/\\n/g, '\n'));
      }
      await transaction.commit();
      console.log(messages);
      return { messages };
    } catch (error) {
      await transaction.rollback();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      console.log({ error });
      const bot = await this.autoBotRepository.findOne({
        where: { bot_id: botId },
        raw: true,
      });

      if (bot) {
        await this.autoLogRepository.create({
          auto_bot_id: bot.id,
          timestamp: new Date(),
          type: 'GENERATE_ACCOUNT_ERROR',
          log: `Gagal generate akun di penjualan ${botTransactionDto.order_id}`,
        });
      }
      return {
        messages: [
          'Pesanan kaka sudah kami terima dan akan kami proses sekarang juga ka, mohon ditunggu sebentar 🔁',
        ],
      };
    }
  }
}
