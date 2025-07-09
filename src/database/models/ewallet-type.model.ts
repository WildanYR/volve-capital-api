/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Optional } from 'sequelize';
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
import { EWallet, EwalletAttributes } from './ewallet.model';

export interface EwalletTypeAttributes {
  id: number;
  name: string;
  ewallet?: EwalletAttributes[];
  created_at: Date;
  updated_at: Date;
}

interface EwalletTypeCreationAttributes
  extends Optional<
    EwalletTypeAttributes,
    'id' | 'created_at' | 'updated_at' | 'ewallet'
  > {}

@Table({ tableName: 'ewallet_type' })
export class EWalletType extends Model<
  EwalletTypeAttributes,
  EwalletTypeCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => EWallet)
  ewallet?: EWallet[];
}
