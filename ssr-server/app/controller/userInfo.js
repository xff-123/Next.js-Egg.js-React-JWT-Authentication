'use strict';

const Controller = require('egg').Controller;
class UserInfoController extends Controller {
  async index() {
    const { ctx } = this;
      // service处理数据,链接数据库
      const data = await ctx.service.userInfo.index()
      if (data.status === 'success') {
        ctx.helper.success(data.data);
      } else {
        ctx.helper.error(data.data, data.status);
      }
  }
}

module.exports = UserInfoController;
