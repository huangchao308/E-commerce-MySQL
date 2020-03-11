import Router, { IRouterContext } from 'koa-router'
import { orderController } from '../controllers'

const router = new Router({ prefix: '/order' })

router.post('/', async (ctx: IRouterContext) => {
  const customer_id = ctx.state.user.id
  const order = Object.assign(ctx.request.body, { customer_id })
  const { code, data } = await orderController.addOrder(order)
  ctx.status = code
  ctx.body = data
})

export default router
