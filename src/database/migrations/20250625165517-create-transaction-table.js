'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaction', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.STRING,
      },
      product_variant_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      product_account_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      product_account_user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addConstraint('transaction', {
      fields: ['product_variant_id'],
      type: 'foreign key',
      name: 'fk_transaction_product_variant',
      references: {
        table: 'product_variant',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('transaction', {
      fields: ['product_account_id'],
      type: 'foreign key',
      name: 'fk_transaction_product_account',
      references: {
        table: 'product_account',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('transaction', {
      fields: ['product_account_user_id'],
      type: 'foreign key',
      name: 'fk_transaction_product_account_user',
      references: {
        table: 'product_account_user',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaction');
  },
};
