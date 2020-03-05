import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'

import productRouter from './routers/product'
import adminProductRouter from './routers/product-admin'
import customerRouter from './routers/customer'
import { checkLogin } from './middleware/check-login'

const app = new koa()
app.keys = ['secret']

app.use(session(app))
app.use(bodyParser())

app.use(customerRouter.routes())
app.use(productRouter.routes())

app.use(checkLogin())

app.use(adminProductRouter.routes())

export default app
