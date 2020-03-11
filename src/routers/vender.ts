import Router, { IRouterContext } from 'koa-router'
import { venderController } from '../controllers'

const router = new Router({ prefix: '/vender' })

router.get('/', async (ctx: IRouterContext) => {
  const { pageIndex = 1, pageSize = 10, ...filter} = ctx.request.query
  const { code, data } = await venderController.getVenders(parseInt(pageIndex), parseInt(pageSize), filter)
  ctx.response.status = code
  ctx.response.body = data
})

router.post('/', async (ctx: IRouterContext) => {
  const { code, data } = await venderController.addVender(ctx.request.body)
  ctx.response.status = code
  ctx.response.body = data
})

export default router
