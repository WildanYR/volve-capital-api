'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ewallet_topup', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      amount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      ewallet_id: {
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

    await queryInterface.addConstraint('ewallet_topup', {
      fields: ['ewallet_id'],
      type: 'foreign key',
      name: 'fk_ewallet_topup_ewallet',
      references: {
        table: 'ewallet',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ewallet_topup');
  },
};
