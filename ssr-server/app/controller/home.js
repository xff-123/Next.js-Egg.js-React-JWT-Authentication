'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.helper.success('成功') 
    // ctx.helper.error('错误',405)
    ctx.helper.success() 
  }
}

module.exports = HomeController;
