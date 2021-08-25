const Servive = require('egg').Service

class UserInfoService extends Servive {
  constructor(ctx) {
    super(ctx)
  }
  async index() {
    //获取前端参数
    const { ctx } = this;
    const data = {};
    // 获取token解析后的用户信息
    const { username, password } = ctx.decode;
    const user = await ctx.model.User.findOne({
      where: {
        username,
        password
      },
    })
    if (!user) {
      data.status = 404
    } else {
      data.status = 'success'
    }
    data.data = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
    }
    return data
  }
}

module.exports = UserInfoService