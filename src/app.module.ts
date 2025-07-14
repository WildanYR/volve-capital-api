import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './config/app.config';
import { DatabaseConfig } from './config/database.config';
import { DatabaseModule } from './database/database.module';
import { DeviceModule } from './modules/device/device.module';
import { SimcardModule } from './modules/simcard/simcard.module';
import { EWalletTypeModule } from './modules/ewallet-type/ewallet-type.module';
import { ProductModule } from './modules/product/product.module';
import { PlatformModule } from './modules/platform/platform.module';
import { EmailModule } from './modules/email/email.module';
import { EWalletModule } from './modules/ewallet/ewallet.module';
import { EWalletTopupModule } from './modules/ewallet-topup/ewallet-topup.module';
import { ProductVariantModule } from './modules/product-variant/product-variant.module';
import { PlatformProductModule } from './modules/platform-product/platform-product.module';
import { ProductAccountModule } from './modules/product-account/product-account.module';
import { ProductAccountUserModule } from './modules/product-account-user/product-account-user.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { AutomationModule } from './modules/automation/automation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [AppConfig, DatabaseConfig],
    }),
    DatabaseModule,
    DeviceModule,
    SimcardModule,
    EmailModule,
    EWalletTypeModule,
    EWalletModule,
    EWalletTopupModule,
    ProductModule,
    ProductVariantModule,
    PlatformModule,
    PlatformProductModule,
    ProductAccountModule,
    ProductAccountUserModule,
    TransactionModule,
    AutomationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
