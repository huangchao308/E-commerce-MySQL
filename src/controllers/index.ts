import ProductController from './product'
import CustomerController from './customer'
import VenderController from './vender'
import OrderController from './order'

const productController = new ProductController()
const customerController = new CustomerController()
const venderController = new VenderController()
const orderController = new OrderController()

export { 
  productController,
  customerController,
  venderController,
  orderController
}
