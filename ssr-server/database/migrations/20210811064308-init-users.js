'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: {
        type: STRING(30),
        unique: true
      },  //用户名
      password: STRING(30),  //密码
      nickname: STRING(30), //昵称
      status: {  //启用状态
        type: INTEGER,
        defaultValue: 1  //默认值
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
