'use strict';

const Controller = require('egg').Controller;
const rule = {
  old_password: 'string',
  new_password: 'string'
}

class ChangeController extends Controller {
  async index() {
    const { ctx } = this;
      // 参数校验
      ctx.validate(rule, ctx.request.body);
      // service处理数据,链接数据库
      const data = await ctx.service.change.index(ctx.request.body)
      if (data.status === 'success') {
        ctx.helper.success(data.data);
      } else {
        ctx.helper.error(data.data, 200);
      }
  }
}

module.exports = ChangeController;
