'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_variant', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      duration_hour: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      interval_hour: {
        type: Sequelize.INTEGER,
      },
      max_user: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      product_id: {
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

    await queryInterface.addConstraint('product_variant', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_product_variant_product',
      references: {
        table: 'product',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_variant');
  },
};
