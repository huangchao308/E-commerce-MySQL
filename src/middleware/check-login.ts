import { Base64 } from 'js-base64'
import { Context } from 'koa'
import { customerController } from '../controllers'

export const checkLogin = () => {
  return async (ctx: Context, next) => {
    let hasLogin = false
    if (ctx.state.user) {
      hasLogin = true
    }
    const { authorization } = ctx.request.headers
    if (!hasLogin && authorization) {
      const str = Base64.decode(authorization.slice(6))
      const username = str.split(':')[0]
      const password = str.split(':')[1]
      console.log(username + ": " + password)
      const { code, data } = await customerController.login(username, password)
      if (code === 200) {
        ctx.state.user = data
        hasLogin = true
      }
    }
    if (hasLogin) {
      return next()
    }
    ctx.response.status = 401
    ctx.response.set({
      'WWW-Authenticate': 'Basic'
    })
  }
}
