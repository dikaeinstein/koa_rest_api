import Router from 'koa-router';

const router = new Router({ prefix: '/api/v1' });

router.get('/', async (ctx, next) => {
  ctx.body = {
    message: 'Hello World!',
    status: 'success',
  };
});

export default router;
