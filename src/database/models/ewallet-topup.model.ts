/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { EWallet, EwalletAttributes } from './ewallet.model';
import { Optional } from 'sequelize';

export interface EwalletTopupAttributes {
  id: number;
  amount: number;
  ewallet_id: number;
  ewallet: EwalletAttributes;
  created_at: Date;
  updated_at: Date;
}

interface EwalletTopupCreationAttributes
  extends Optional<
    EwalletTopupAttributes,
    'id' | 'created_at' | 'updated_at' | 'ewallet'
  > {}

@Table({ tableName: 'ewallet_topup' })
export class EWalletTopup extends Model<
  EwalletTopupAttributes,
  EwalletTopupCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  amount: number;

  @ForeignKey(() => EWallet)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  ewallet_id: number;

  @BelongsTo(() => EWallet, 'ewallet_id')
  ewallet: EWallet;
}
