'use strict'
const Servive = require('egg').Service

class RegisterService extends Servive {
  constructor(ctx) {
    super(ctx)
  }
  async index(body) {
    const { ctx } = this
    //获取前端参数
    const { username, password, nickname } = body
    // 判断是否有相同的用户名
    const hasSameUser = await ctx.model.User.findOne({
      where: {
        username,
      }
    })
    if (!hasSameUser) {
      await ctx.model.User.create({
        username,
        password,
        nickname
      })
      return 'success'
    } else {
      return '该用户已经注册'
    }

  }
}

module.exports = RegisterService