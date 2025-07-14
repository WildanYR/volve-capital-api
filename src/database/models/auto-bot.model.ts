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
import { AutoLog } from './auto-log.model';
import { AutoBotModule } from './auto-bot-module.model';

export interface AutoBotAttributes {
  id: number;
  bot_id: string;
  name: string;
  health_check_date: Date;
  type: string;
  status: string;
  modules: AutoBotModule[];
  logs: AutoLog[];
  created_at: Date;
  updated_at: Date;
}

interface AutoBotCreationAttributes
  extends Optional<
    AutoBotAttributes,
    'id' | 'created_at' | 'updated_at' | 'logs' | 'modules'
  > {}

@Table({ tableName: 'auto_bot' })
export class AutoBot extends Model<
  AutoBotAttributes,
  AutoBotCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  bot_id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.DATE)
  health_check_date: Date;

  @Column(DataType.STRING)
  status: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  type: string;

  @HasMany(() => AutoBotModule)
  modules?: AutoBotModule[];

  @HasMany(() => AutoLog)
  logs: AutoLog[];
}
