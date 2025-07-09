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

export interface SimcardAttributes {
  id: number;
  simcard_number: string;
  location?: string;
  ewallet?: EwalletAttributes[];
  created_at: Date;
  updated_at: Date;
}

interface SimcardCreationAttributes
  extends Optional<
    SimcardAttributes,
    'id' | 'created_at' | 'updated_at' | 'ewallet'
  > {}

@Table({ tableName: 'simcard' })
export class Simcard extends Model<
  SimcardAttributes,
  SimcardCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  simcard_number: string;

  @Column(DataType.STRING)
  location?: string;

  @HasMany(() => EWallet)
  ewallet?: EWallet[];
}
