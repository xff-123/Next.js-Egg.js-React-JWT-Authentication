//封装公用方法
// const CryptoJS = require('crypto-js')
module.exports = {
  //处理200
  success(data){
    const body = {
			success: true,
		}
		if (data) {
			body.data = data
		}
		this.ctx.status = 200
		this.ctx.body = body
  },
  //处理错误
  error(error,status){
    this.ctx.status = status || 403
		this.ctx.body = {
			success: false,
			data: error,
		}
  },

  //生成token
  setToken(opt){
    return this.app.jwt.sign(opt, this.app.config.jwt.secret,{
      expiresIn:'7d'  //设置时效，
    });
  }
}