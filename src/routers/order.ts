import Router, { IRouterContext } from 'koa-router'
import { orderController } from '../controllers'

const router = new Router({ prefix: '/order' })

router.post('/sales', async (ctx: IRouterContext) => {
  const order = Object.assign(ctx.request.body, { customer_id: ctx.state.user.id, type: 1, status: 10 })
  const { code, data } = await orderController.addOrder(order)
  ctx.status = code
  ctx.body = data
})

router.post('/return', async (ctx: IRouterContext) => {
  const order = Object.assign(ctx.request.body, { customer_id: ctx.state.user.id, type: 2, status: 20 })
  const { code, data } = await orderController.addOrder(order)
  ctx.status = code
  ctx.body = data
})

router.post('/refund', async (ctx: IRouterContext) => {
  const order = Object.assign(ctx.request.body, { customer_id: ctx.state.user.id, type: 3, status: 30 })
  const { code, data } = await orderController.addOrder(order)
  ctx.status = code
  ctx.body = data
})

router.get('/', async (ctx: IRouterContext) => {
  const customer_id = ctx.state.user.id
  const { pageIndex, pageSize, status, type } = ctx.query
  const filter = {
    customer_id,
    status: parseInt(status) || undefined,
    type: parseInt(type) || 1
  }
  const pagination: Pagination = {
    pageIndex: parseInt(pageIndex) || 1,
    pageSize: parseInt(pageSize) || 10
  }
  const { code, data } = await orderController.getOrderList(filter, pagination)
  ctx.status = code
  ctx.body = data
})

export default router
