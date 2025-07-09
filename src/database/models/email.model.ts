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
import { Device, DeviceAttributes } from './device.model';
import {
  ProductAccount,
  ProductAccountAttributes,
} from './product-account.model';
import { Optional } from 'sequelize';

export interface EmailAttributes {
  id: number;
  email: string;
  password: string;
  register_device_id?: number;
  device?: DeviceAttributes;
  product_account?: ProductAccountAttributes[];
  created_at: Date;
  updated_at: Date;
}

interface EmailCreationAttributes
  extends Optional<
    EmailAttributes,
    'id' | 'created_at' | 'updated_at' | 'device' | 'product_account'
  > {}

@Table({ tableName: 'email' })
export class Email extends Model<EmailAttributes, EmailCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @ForeignKey(() => Device)
  @Column(DataType.BIGINT)
  register_device_id?: number;

  @BelongsTo(() => Device, 'register_device_id')
  device?: Device;

  @HasMany(() => ProductAccount)
  product_account?: ProductAccount[];
}
