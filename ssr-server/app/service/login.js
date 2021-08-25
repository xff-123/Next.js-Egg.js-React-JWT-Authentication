const Servive = require('egg').Service

class LoginService extends Servive {
  constructor(ctx) {
    super(ctx)
  }
  async index(body) {
    //获取前端参数
    const { username, password } = body;
    const data = {};
    const user = await this.ctx.model.User.findOne({
      where: {
        username,
        password
      },
    })
    if (!user) {
      return '用户名或密码错误'
    }
    data.status = 'success'
    data.data = {
      id:user.id,
      username: user.username,
      nickname: user.nickname
    }
    return data
  }
}

module.exports = LoginService