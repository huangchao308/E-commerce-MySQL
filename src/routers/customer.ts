import Router, { IRouterContext } from 'koa-router'
import { customerController } from '../controllers'

const router = new Router({ prefix: '/customer' })

router.post('/login', async (ctx: IRouterContext) => {
  const { username, password } = ctx.request.body
  const { code, data } = await customerController.login(username, password)
  if (code === 200) {
    ctx.state.user = data
  }
  ctx.response.status = code
  ctx.response.body = data
})

router.post('/register', async (ctx: IRouterContext) => {
  const { code, data } = await customerController.register(ctx.request.body)
  ctx.response.status = code
  ctx.response.body = data
})

router.post('/address', async (ctx: IRouterContext) => {
  const { code, data } = await customerController.addAddress(ctx.request.body)
  ctx.response.status = code
  ctx.response.body = data
})

export default router
