'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/register', controller.register.index)
  router.post('/api/login', controller.login.index)
  router.post('/api/change', controller.change.index)
  router.get('/api/detail', controller.userInfo.index)
};
