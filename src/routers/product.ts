import Router, { IRouterContext } from 'koa-router'
import { productController } from '../controllers'

const router = new Router({ prefix: '/products' })

router.get('/', async (ctx: IRouterContext) => {
  const { pageIndex, pageSize } = ctx.request.query
  const { code, data } = await productController.getList(pageIndex, pageSize)
  ctx.response.status = code
  ctx.response.body = data
})

router.get('/:id', async (ctx: IRouterContext) => {
  console.log(ctx.params.id)
  const { code, data } = await productController.getById(ctx.params.id) 
  ctx.response.status = code
  ctx.response.body = data
})

export default router
