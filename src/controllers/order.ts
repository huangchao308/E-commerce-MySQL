import md5 from 'md5'
import moment from 'moment'
import { escape } from 'mysql2'
import { query, handleTransaction, insert } from '../db'

export default class OrderController {
  public async addOrder(order: Order): Promise<ControllerResponse> {
    const { lines, ...head } = order
    const headKeys = Object.keys(head).filter((key: string) => key !== 'id' && key !== 'date')
    const sqlList = []
    sqlList.push(`insert into orders(date,${headKeys.join()}) values(${escape(moment().utc().format('YYYY-MM-DD HH:mm:ss'))},${headKeys.map((key: string) => escape(head[key]))});`)
    sqlList.push(...lines.map((line: OrderLine) => `insert into orderlines(order_id,product_id,price,qty,amount)
      values(@orderid,
        ${escape(line.product_id)},
        ${escape(line.price)},
        ${escape(line.qty)},
        ${escape(line.amount)}
      )`))

    const result = await handleTransaction(sqlList)
    return {
      code: 200,
      data: result
    }
  }
}