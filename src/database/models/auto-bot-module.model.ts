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

export interface AutoBotModuleAttributes {
  id: number;
  auto_bot_id: number;
  name: string;
  bot: AutoBot;
  created_at: Date;
  updated_at: Date;
}

interface AutoBotModuleCreationAttributes
  extends Optional<
    AutoBotModuleAttributes,
    'id' | 'created_at' | 'updated_at' | 'bot'
  > {}

@Table({ tableName: 'auto_bot' })
export class AutoBotModule extends Model<
  AutoBotModuleAttributes,
  AutoBotModuleCreationAttributes
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
  @Column(DataType.STRING)
  name: string;

  @BelongsTo(() => AutoBot, 'auto_bot_id')
  bot: AutoBot;
}
