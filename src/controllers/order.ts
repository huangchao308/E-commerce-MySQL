import md5 from 'md5'
import moment from 'moment'
import { escape } from 'mysql2'
import { query, handleTransaction, insert } from '../db'

export default class OrderController {
  public async addOrder(order: OrderInsert): Promise<ControllerResponse> {
    const { lines, ...head } = order
    const headKeys = Object.keys(head).filter((key: string) => key !== 'id' && key !== 'date')
    const sqlList = []
    sqlList.push(`insert into orders(date,${headKeys.join()}) values(${escape(moment().format('YYYY-MM-DD HH:mm:ss'))},${headKeys.map((key: string) => escape(head[key]))});`)
    sqlList.push(...lines.map((line: OrderLine) => `call addOrderLines(@orderid, ${escape(line.product_id)}, ${escape(line.qty)})`))

    const result = await handleTransaction(sqlList)
    return {
      code: 200,
      data: result
    }
  }

  public async getOrderList(filter: { customer_id: number, status?: number, type?: number }, pagination: Pagination) {
    const heads = await query(`
      select * from orders_head_view
      where
      ${Object.keys(filter).filter((key: string) => !!filter[key]).map((key: string) => `${key} = ${escape(filter[key])}`).join(' and ')}
      limit ${(pagination.pageIndex - 1) * pagination.pageSize},${pagination.pageSize};
    `)
    const orders = await Promise.all(heads.map(async (order: OrderQuery) => {
      order.lines = await this.getLines(order.id)
      return order
    }))

    return {
      code: 200,
      data: orders
    }
  }

  private getLines(orderId: number) {
    return query(`select * from orderlines where order_id = ${escape(orderId)}`)
  }
}