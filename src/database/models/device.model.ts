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
import { Email, EmailAttributes } from './email.model';
import { Optional } from 'sequelize';
import { EWallet, EwalletAttributes } from './ewallet.model';

export interface DeviceAttributes {
  id: number;
  name: string;
  description?: string;
  registered_email?: EmailAttributes[];
  ewallet?: EwalletAttributes[];
  created_at: Date;
  updated_at: Date;
}

interface DeviceCreationAttributes
  extends Optional<
    DeviceAttributes,
    'id' | 'created_at' | 'updated_at' | 'registered_email' | 'ewallet'
  > {}

@Table({ tableName: 'device' })
export class Device extends Model<DeviceAttributes, DeviceCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  description?: string;

  @HasMany(() => Email)
  registered_email?: Email[];

  @HasMany(() => EWallet)
  ewallet?: EWallet[];
}
