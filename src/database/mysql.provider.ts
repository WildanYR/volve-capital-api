import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryOptions } from 'sequelize';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Models } from './models';

@Injectable()
export class MysqlProvider {
  private sequelize?: Sequelize;

  constructor(private configService: ConfigService) {
    if (!this.sequelize) {
      this.sequelize = new Sequelize({
        dialect: 'mysql',
        host: this.configService.get('database.host'),
        port: this.configService.get('database.port'),
        username: this.configService.get('database.username'),
        password: this.configService.get('database.password'),
        database: this.configService.get('database.database'),
        define: {
          freezeTableName: true,
          timestamps: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
      });
      this.sequelize.addModels(Models());
    } else {
      this.sequelize.connectionManager.initPools();

      const connectionManager = (
        this.sequelize as { connectionManager?: { getConnection?: unknown } }
      ).connectionManager;

      if (
        connectionManager &&
        typeof connectionManager.getConnection === 'function'
      ) {
        connectionManager.getConnection = undefined;
      }
    }
  }

  async transaction(): Promise<Transaction> {
    if (!this.sequelize) {
      throw new Error('database connection not estabilished');
    }
    return await this.sequelize.transaction();
  }

  async rawQuery(sql: string, options: QueryOptions) {
    if (!this.sequelize) {
      throw new Error('database connection not estabilished');
    }
    return await this.sequelize.query(sql, options);
  }
}
