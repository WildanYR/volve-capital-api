'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'product_account_user',
      'product_variant_id',
      { type: Sequelize.BIGINT, allowNull: false },
    );
    await queryInterface.addConstraint('product_account_user', {
      fields: ['product_variant_id'],
      type: 'foreign key',
      name: 'fk_product_account_user_product_variant',
      references: {
        table: 'product_variant',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'product_account_user',
      'fk_product_account_user_product_variant',
    );

    await queryInterface.removeColumn(
      'product_account_user',
      'product_variant_id',
    );
  },
};
