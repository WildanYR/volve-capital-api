import { Device } from './device.model';
import { Email } from './email.model';
import { EWalletTopup } from './ewallet-topup.model';
import { EWalletType } from './ewallet-type.model';
import { EWallet } from './ewallet.model';
import { Simcard } from './simcard.model';
import { PlatformProduct } from './platform-product.model';
import { Platform } from './platform.model';
import { ProductAccountUser } from './product-account-user.model';
import { ProductAccount } from './product-account.model';
import { ProductVariant } from './product-variant.model';
import { Product } from './product.model';
import { Transaction } from './transaction.model';
import { AutoBot } from './auto-bot.model';
import { AutoLog } from './auto-log.model';
import { AutoBotModule } from './auto-bot-module.model';

export const Models = () => [
  Device,
  Email,
  Simcard,
  EWalletType,
  EWallet,
  EWalletTopup,
  Product,
  ProductVariant,
  Platform,
  PlatformProduct,
  ProductAccount,
  ProductAccountUser,
  Transaction,
  AutoBot,
  AutoBotModule,
  AutoLog,
];
