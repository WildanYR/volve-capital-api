/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product, ProductAttributes } from './product.model';
import {
  PlatformProduct,
  PlatformProductAttributes,
} from './platform-product.model';
import {
  ProductAccount,
  ProductAccountAttributes,
} from './product-account.model';
import { Transaction, TransactionAttributes } from './transaction.model';
import { Optional } from 'sequelize';

export interface ProductVariantAttributes {
  id: number;
  name: string;
  duration_hour: number;
  interval_hour: number;
  cooldown: number;
  max_user: number;
  product_id: number;
  product: ProductAttributes;
  platform_product?: PlatformProductAttributes[];
  product_account?: ProductAccountAttributes[];
  transaction?: TransactionAttributes[];
  created_at: Date;
  updated_at: Date;
}

interface ProductVariantCreationAttributes
  extends Optional<
    ProductVariantAttributes,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'product'
    | 'platform_product'
    | 'product_account'
    | 'transaction'
  > {}

@Table({ tableName: 'product_variant' })
export class ProductVariant extends Model<
  ProductVariantAttributes,
  ProductVariantCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  duration_hour: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  interval_hour: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  cooldown: number;

  @Default(1)
  @Column(DataType.INTEGER)
  max_user: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  product_id: number;

  @BelongsTo(() => Product, 'product_id')
  product: Product;

  @HasMany(() => PlatformProduct)
  platform_product?: PlatformProduct[];

  @HasMany(() => ProductAccount)
  product_account?: ProductAccount[];

  @HasMany(() => Transaction)
  transaction?: Transaction[];
}
