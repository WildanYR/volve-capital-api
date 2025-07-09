/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import {
  ProductVariant,
  ProductVariantAttributes,
} from './product-variant.model';
import { Platform, PlatformAttributes } from './platform.model';
import { Optional } from 'sequelize';

export interface PlatformProductAttributes {
  id: number;
  platform_product_id: string;
  product_name: string;
  platform_id: number;
  product_variant_id: number;
  platform: PlatformAttributes;
  product_variant: ProductVariantAttributes;
  created_at: Date;
  updated_at: Date;
}

interface PlatformProductCreationAttributes
  extends Optional<
    PlatformProductAttributes,
    'id' | 'created_at' | 'updated_at' | 'platform' | 'product_variant'
  > {}

@Table({ tableName: 'platform_product' })
export class PlatformProduct extends Model<
  PlatformProductAttributes,
  PlatformProductCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  platform_product_id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  product_name: string;

  @ForeignKey(() => Platform)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  platform_id: number;

  @ForeignKey(() => ProductVariant)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  product_variant_id: number;

  @BelongsTo(() => Platform, 'platform_id')
  platform: Platform;

  @BelongsTo(() => ProductVariant, 'product_variant_id')
  product_variant: ProductVariant;
}
