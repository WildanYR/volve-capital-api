/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import {
  ProductVariant,
  ProductVariantAttributes,
} from './product-variant.model';
import {
  ProductAccount,
  ProductAccountAttributes,
} from './product-account.model';
import { Optional } from 'sequelize';

export interface ProductAttributes {
  id: number;
  name: string;
  variant?: ProductVariantAttributes[];
  product_account?: ProductAccountAttributes[];
  created_at: Date;
  updated_at: Date;
}

interface ProductCreationAttributes
  extends Optional<
    ProductAttributes,
    'id' | 'created_at' | 'updated_at' | 'variant' | 'product_account'
  > {}

@Table({ tableName: 'product' })
export class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => ProductVariant)
  variant?: ProductVariant[];

  @HasMany(() => ProductAccount)
  product_account?: ProductAccount[];
}
