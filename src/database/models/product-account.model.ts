/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Email, EmailAttributes } from './email.model';
import { EWallet, EwalletAttributes } from './ewallet.model';
import { Product, ProductAttributes } from './product.model';
import {
  ProductVariant,
  ProductVariantAttributes,
} from './product-variant.model';
import {
  ProductAccountUser,
  ProductAccountUserAttributes,
} from './product-account-user.model';
import { Transaction, TransactionAttributes } from './transaction.model';
import { Optional } from 'sequelize';

export interface ProductAccountAttributes {
  id: number;
  account_password: string;
  subscription_expiry: Date;
  status?: string | null;
  batch_start_date?: Date | null;
  batch_end_date?: Date | null;
  email_id: number;
  product_id: number;
  ewallet_id?: number | null;
  product_variant_id?: number | null;
  email: EmailAttributes;
  ewallet?: EwalletAttributes;
  product: ProductAttributes;
  product_variant?: ProductVariantAttributes;
  user?: ProductAccountUserAttributes[];
  transaction?: TransactionAttributes[];
  created_at: Date;
  updated_at: Date;
}

interface ProductAccountCreationAttributes
  extends Optional<
    ProductAccountAttributes,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'email'
    | 'ewallet'
    | 'product'
    | 'product_variant'
    | 'user'
    | 'transaction'
  > {}

@Table({ tableName: 'product_account' })
export class ProductAccount extends Model<
  ProductAccountAttributes,
  ProductAccountCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  account_password: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  subscription_expiry?: Date | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  status?: string | null;

  @AllowNull(true)
  @Column(DataType.DATE)
  batch_start_date?: Date | null;

  @AllowNull(true)
  @Column(DataType.DATE)
  batch_end_date?: Date | null;

  @ForeignKey(() => Email)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  email_id: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  product_id: number;

  @ForeignKey(() => EWallet)
  @AllowNull(true)
  @Column(DataType.BIGINT)
  ewallet_id?: number | null;

  @ForeignKey(() => ProductVariant)
  @AllowNull(true)
  @Column(DataType.BIGINT)
  product_variant_id: number | null;

  @BelongsTo(() => Email, 'email_id')
  email: Email;

  @BelongsTo(() => EWallet, 'ewallet_id')
  ewallet?: EWallet;

  @BelongsTo(() => Product, 'product_id')
  product: Product;

  @BelongsTo(() => ProductVariant, 'product_variant_id')
  product_variant: ProductVariant;

  @HasMany(() => ProductAccountUser)
  user?: ProductAccountUser[];

  @HasMany(() => Transaction)
  transaction?: Transaction[];
}
