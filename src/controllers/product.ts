import { escape } from 'mysql2'
import { query, handleTransaction } from '../db'

export default class ProductController {
  public async addProduct (product: Product): Promise<ControllerResponse> {
    const { attributes, priceList, ...others } = product
    const addAttSQL = attributes.map((attr: Attribute) => `insert into product_attributes
      (product_id,${Object.keys(attr).join()})
      values(${escape(product.id)},${Object.keys(attr).map((key: string) => escape(attr[key])).join()});
    `)
    const addPriceSQL = priceList.map((price: Price) => `insert into price
      (product_id,${Object.keys(price).join()})
      values(${escape(product.id)},${Object.keys(price).map((key: string) => escape(price[key])).join()});
    `)
    const sql = `insert into products(${Object.keys(others).join()})
      values(${Object.keys(others).map((key: string) => escape(others[key])).join()});
    `
    const sqlList = [sql, ...addAttSQL, ...addPriceSQL]
    const res = await handleTransaction(sqlList)
    return {
      code: res.result ? 201 : 400,
      data: res
    }
  }

  public async getList (pageIndex: number = 1, pageSize: number = 10): Promise<ControllerResponse> {
    const rows = await query(`select id from products limit ${(pageIndex - 1) * pageSize},${pageSize};`)
    const results = await Promise.all(rows.map(async (row: { id: string }) => {
      const { data } = await this.getById(row.id)
      return data
    }))
    
    return {
      code: 200,
      data: results
    }
  }

  public async getById (id: string): Promise<ControllerResponse> {
    const getProdSQL = `select
      p.id,
      p.name,
      p.valid_qty,
      p.description,
      price.price
      from 
      products as p,price 
      where 
      p.id = ${escape(id)}
      and
      p.id = price.product_id 
      and 
      price.type = 0
      and
      price.start_time <= now()
      and 
      price.end_time > now()
      order by
      price.end_time
      limit 1;
    `
    const getAttSQL = `select attribute_name,attribute_value from product_attributes where product_id = ${escape(id)}`
    const [products, attributes] = await Promise.all([query(getProdSQL), query(getAttSQL)])
    if (products.length > 0) {
      const product = products[0]
      product.attributes = attributes
      return {
        code: 200,
        data: product
      }
    }
    return {
      code: 404,
      data: {
        code: 404,
        message: 'Not found'
      }
    }
  }

  public async getListAdmin(pageIndex: number = 1, pageSize: number = 10) {
    const rows = await query(`select
      p.id,
      p.name,
      p.description,
      p.valid_qty,
      p.actual_qty,
      v.name as vender,
      v.tel as vender_tel,
      v.address as vender_address,
      v.country as vender_country,
      v.province as vender_province,
      v.city as vender_city
      from products as p,venders as v
      where p.vender_id = v.id
      limit ${(pageIndex - 1) * pageSize},${pageSize};
    `)
    const results = await Promise.all(rows.map(async (row: { id: string }) => {
      const [attributes, priceList] = await Promise.all([this.getAtt(row.id), this.getPrice(row.id)])
      return {
        ...row,
        attributes,
        priceList
      }
    }))

    return {
      code: 200,
      data: results
    }
  }

  public async getByIdAdmin (id: string) {
    const rows = await query(`select
      p.id,
      p.name,
      p.description,
      p.valid_qty,
      p.actual_qty,
      v.name as vender,
      v.tel as vender_tel,
      v.address as vender_address,
      v.country as vender_country,
      v.province as vender_province,
      v.city as vender_city
      from products as p,venders as v
      where p.vender_id = v.id
      and
      p.id = ${escape(id)};
    `)
    if (rows.length === 0) {
      return {
        code: 404,
        data: {
          code: 404,
          message: 'Not found'
        }
      }
    }
    const attributes = await this.getAtt(id)
    const priceList = await this.getPrice(id)
    return {
      code: 200,
      data: { ...rows[0], attributes, priceList }
    }
  }

  private getAtt (id: string) {
    return query(`select
      attribute_name,
      attribute_value,
      description
      from product_attributes
      where
      product_id = ${escape(id)};
    `)
  }

  private getPrice (id: string) {
    return query(`select
      price,
      type,
      start_time,
      end_time,
      description
      from price
      where
      product_id = ${escape(id)};
    `)
  }
}
