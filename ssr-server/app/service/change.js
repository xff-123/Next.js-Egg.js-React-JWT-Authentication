'use strict'
const Servive = require('egg').Service

class ChangeService extends Servive {
  constructor(ctx) {
    super(ctx)
  }
  async index(body) {
    //获取前端参数
    const { ctx } = this;
    const {old_password, new_password } = body;
    console.log(`*****${old_password}***${new_password}`)
    const { username, password } = ctx.decode;
    console.log(`*****${username}***${password}`)
    const data = {};
    const user = await this.ctx.model.User.update({ username, password: new_password }, {
      where: {
        username,
        password: old_password
      },
    })
    if (!user[0]) {
      data.status = 'failed'
      data.data = {
        message: '账号或者密码错误'
      }
    } else {
      data.status = 'success'
      data.data = {
        message: '修改成功'
      }
    }
    return data
  }
}

module.exports = ChangeService