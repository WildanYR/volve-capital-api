/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Optional } from 'sequelize';
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
import { AutoBot } from './auto-bot.model';

export interface AutoLogAttributes {
  id: number;
  auto_bot_id: number;
  timestamp: Date;
  log: string;
  type: string;
  auto_bot: AutoBot;
  created_at: Date;
  updated_at: Date;
}

interface AutoLogCreationAttributes
  extends Optional<
    AutoLogAttributes,
    'id' | 'created_at' | 'updated_at' | 'auto_bot'
  > {}

@Table({ tableName: 'auto_log' })
export class AutoLog extends Model<
  AutoLogAttributes,
  AutoLogCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @ForeignKey(() => AutoBot)
  @AllowNull(false)
  @Column(DataType.BIGINT)
  auto_bot_id: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  timestamp: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  log: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  type: string;

  @BelongsTo(() => AutoBot, 'auto_bot_id')
  bot: AutoBot;
}
