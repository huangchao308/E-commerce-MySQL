import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'

import { checkLogin } from './middleware/check-login'
import productRouter from './routers/product'
import adminProductRouter from './routers/product-admin'
import customerRouter from './routers/customer'
import venderRouter from './routers/vender'
import orderRouter from './routers/order'

const app = new koa()
app.keys = ['secret']

app.use(session(app))
app.use(bodyParser())

app.use(customerRouter.routes())
app.use(productRouter.routes())
app.use(venderRouter.routes())

app.use(checkLogin())

app.use(adminProductRouter.routes())
app.use(orderRouter.routes())

export default app
