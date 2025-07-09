'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('platform_product', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      platform_product_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      platform_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      product_variant_id: {
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

    await queryInterface.addConstraint('platform_product', {
      fields: ['platform_id'],
      type: 'foreign key',
      name: 'fk_platform_product_platform',
      references: {
        table: 'platform',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('platform_product', {
      fields: ['product_variant_id'],
      type: 'foreign key',
      name: 'fk_platform_product_product_variant',
      references: {
        table: 'product_variant',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('platform_product');
  },
};
