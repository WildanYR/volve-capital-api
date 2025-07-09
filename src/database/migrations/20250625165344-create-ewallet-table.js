'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ewallet', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      status: {
        type: Sequelize.STRING,
      },
      registration_date: {
        type: Sequelize.DATE,
      },
      simcard_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      ewallet_type_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      device_id: {
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

    await queryInterface.addConstraint('ewallet', {
      fields: ['simcard_id'],
      type: 'foreign key',
      name: 'fk_ewallet_simcard',
      references: {
        table: 'simcard',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('ewallet', {
      fields: ['ewallet_type_id'],
      type: 'foreign key',
      name: 'fk_ewallet_ewallet_type',
      references: {
        table: 'ewallet_type',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('ewallet', {
      fields: ['device_id'],
      type: 'foreign key',
      name: 'fk_ewallet_device',
      references: {
        table: 'device',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ewallet');
  },
};
