import Router from '@koa/router';
import { ParameterizedContext } from 'koa';
import Ollama from '../index';

const router = new Router({
  prefix: '/tags'
});

router.options('/', async (ctx: ParameterizedContext): Promise<void> => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  ctx.status = 204;
});

router.get('/', async (ctx: ParameterizedContext): Promise<void> => {
  ctx.status = 200;
  ctx.type = 'application/json';
  ctx.body = {
    models: [...Ollama.getAI]
  };
});

export default router;
