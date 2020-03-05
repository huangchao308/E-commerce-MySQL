import Router, { IRouterContext } from 'koa-router'
import { customerController } from '../controllers'

const router = new Router({ prefix: '/customer' })

router.post('/login', async (ctx: IRouterContext) => {
  const { username, password } = ctx.request.body
  const { code, data } = await customerController.login(username, password)
  ctx.response.status = code
  ctx.response.body = data
})

router.post('/register', async (ctx: IRouterContext) => {
  const { code, data } = await customerController.register(ctx.request.body)
  ctx.response.status = code
  ctx.response.body = data
})

export default router
