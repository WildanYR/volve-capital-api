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
  PlatformProduct,
  PlatformProductAttributes,
} from './platform-product.model';
import { Optional } from 'sequelize';

export interface PlatformAttributes {
  id: number;
  name: string;
  platform_product?: PlatformProductAttributes[];
  created_at: Date;
  updated_at: Date;
}

interface PlatformCreationAttributes
  extends Optional<
    PlatformAttributes,
    'id' | 'created_at' | 'updated_at' | 'platform_product'
  > {}

@Table({ tableName: 'platform' })
export class Platform extends Model<
  PlatformAttributes,
  PlatformCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => PlatformProduct)
  platform_product?: PlatformProduct[];
}
