'use strict';

const Controller = require('egg').Controller;
const rule = {
  username: 'string',
  password: 'string'
}

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    try {
      //参数校验
      ctx.validate(rule, ctx.request.body)
      //service处理数据,链接数据库
      const body = await ctx.service.login.index(ctx.request.body)
      if (body.status === 'success') {
        //成功状态生成token
        const { username, password } = ctx.request.body
        body.data.token = ctx.helper.setToken({ username, password })
        ctx.helper.success(body.data)  //todo 生成tocken并返回
      } else {
        ctx.helper.error(body.status)
      }
    } catch (error) {
      ctx.helper.error(error)
    }
  }
}

module.exports = LoginController;
