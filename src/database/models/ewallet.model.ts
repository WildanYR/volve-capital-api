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
import { EWalletType, EwalletTypeAttributes } from './ewallet-type.model';
import { Device, DeviceAttributes } from './device.model';
import { EWalletTopup, EwalletTopupAttributes } from './ewallet-topup.model';
import {
  ProductAccount,
  ProductAccountAttributes,
} from './product-account.model';
import { Simcard, SimcardAttributes } from './simcard.model';
import { Optional } from 'sequelize';

export interface EwalletAttributes {
  id: number;
  status?: string;
  registration_date?: Date;
  simcard_id: number;
  ewallet_type_id: number;
  device_id: number;
  simcard: SimcardAttributes;
  ewallet_type: EwalletTypeAttributes;
  device: DeviceAttributes;
  topup?: EwalletTopupAttributes[];
  product_account?: ProductAccountAttributes[];
  created_at: Date;
  updated_at: Date;
}

interface EwalletCreationAttributes
  extends Optional<
    EwalletAttributes,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'simcard'
    | 'ewallet_type'
    | 'device'
    | 'topup'
    | 'product_account'
  > {}

@Table({ tableName: 'ewallet' })
export class EWallet extends Model<
  EwalletAttributes,
  EwalletCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @Column(DataType.STRING)
  status?: string;

  @Column(DataType.DATE)
  registration_date?: Date;

  @ForeignKey(() => Simcard)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  simcard_id: number;

  @ForeignKey(() => EWalletType)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  ewallet_type_id: number;

  @ForeignKey(() => Device)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  device_id: number;

  @BelongsTo(() => Simcard, 'simcard_id')
  simcard: Simcard;

  @BelongsTo(() => EWalletType, 'ewallet_type_id')
  ewallet_type: EWalletType;

  @BelongsTo(() => Device, 'device_id')
  device: Device;

  @HasMany(() => EWalletTopup)
  topup?: EWalletTopup[];

  @HasMany(() => ProductAccount)
  product_account?: ProductAccount[];
}
