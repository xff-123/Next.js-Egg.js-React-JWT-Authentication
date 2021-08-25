/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_';

  // add your middleware config here
  config.middleware = ['tokenHandler']
  //配置tokenHander
  config.tokenHandler = {
    match(ctx) {
      const url = ctx.request.url
      if (url.startsWith('/api/login')||url.startsWith('/api/register')) {
        return false
      } else {
        return true
      }
    }
    //match匹配
    //ignore  //忽略
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*']
  };

  //sequelize 开发
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'ssr',
    username: 'root',
    password: 'HOUYIFAN123'
  },

    //token密钥
    config.jwt = {
      secret: "ndiejmve7392i"
    }

    config.cors = {
      origin: 'http://localhost:3000',//匹配规则  域名+端口  *则为全匹配
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };
  return {
    ...config,
    ...userConfig,
  };
};
