import Koa from 'koa';
import Router from '@koa/router';
import tags from './tags';

function mountRouters(server: Koa<Koa.DefaultState, Koa.DefaultContext>): void {
  const router = new Router({
    prefix: '/v1'
  });

  // router.use(chat2.routes()).use(chat2.allowedMethods());
  router.use(tags.routes()).use(tags.allowedMethods());

  server.use(router.routes()).use(router.allowedMethods());
}

export default mountRouters;
