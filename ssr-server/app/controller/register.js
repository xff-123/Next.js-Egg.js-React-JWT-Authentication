'use strict';

const Controller = require('egg').Controller;
const rule = {
  username: 'string',
  password: 'string',
  nickname: 'string'
}

class RegisterController extends Controller {
  async index() {
    const { ctx } = this;
    // 参数校验
    ctx.validate(rule, ctx.request.body);
    // service处理数据,链接数据库
    const status = await ctx.service.register.index(ctx.request.body)
    if (status === 'success') {
      ctx.helper.success('成功');
    } else {
      ctx.helper.error(status);
    }


  }
}

module.exports = RegisterController;
