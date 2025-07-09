'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_account', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      account_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subscription_expiry: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
      },
      batch_start_date: {
        type: Sequelize.DATE,
      },
      batch_end_date: {
        type: Sequelize.DATE,
      },
      email_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      ewallet_id: {
        type: Sequelize.BIGINT,
      },
      product_variant_id: {
        type: Sequelize.BIGINT,
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

    await queryInterface.addConstraint('product_account', {
      fields: ['email_id'],
      type: 'foreign key',
      name: 'fk_product_account_email',
      references: {
        table: 'email',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('product_account', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_product_account_product',
      references: {
        table: 'product',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('product_account', {
      fields: ['ewallet_id'],
      type: 'foreign key',
      name: 'fk_product_account_ewallet',
      references: {
        table: 'ewallet',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('product_account', {
      fields: ['product_variant_id'],
      type: 'foreign key',
      name: 'fk_product_account_product_variant',
      references: {
        table: 'product_variant',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_account');
  },
};
