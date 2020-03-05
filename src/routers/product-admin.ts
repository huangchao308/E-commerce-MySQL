import Router, { IRouterContext } from 'koa-router'
import { productController } from '../controllers'

const router = new Router({ prefix: '/admin/products' })

router.get('/', async (ctx: IRouterContext) => {
  const { pageIndex, pageSize } = ctx.request.query
  const { code, data } = await productController.getListAdmin(pageIndex, pageSize)
  ctx.response.status = code
  ctx.response.body = data
})

router.post('/', async (ctx: IRouterContext) => {
  const product = ctx.request.body
  const { code, data } = await productController.addProduct(product)
  ctx.response.status = code
  ctx.response.body = data
})

router.get('/:id', async (ctx: IRouterContext) => {
  const { code, data } = await productController.getByIdAdmin(ctx.params.id)
  ctx.response.status = code
  ctx.response.body = data
})

export default router
