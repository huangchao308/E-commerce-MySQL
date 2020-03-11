import { escape } from 'mysql2'
import { query, handleTransaction, insert } from '../db'

export default class VenderController {
  public async addVender(vender: Vender): Promise<ControllerResponse> {
    const result = await insert(`insert into venders(${Object.keys(vender).join()}) 
      values(${Object.keys(vender).map((key: string) => escape(vender[key])).join()});`)

    return {
      code: 200,
      data: result
    }
  }

  public async getVenders(pageIndex: number, pageSize: number, filter?: object) {
    let condition = ''
    if (filter) {
      condition = 'where ' + Object.keys(filter).map((key: string) => `${key} = ${escape(filter[key])}`).join(' and ')
    }
    const result = await query(`
      select id,name,country,province,city,address,tel,description
      from 
      venders
      ${condition} 
      limit ${(pageIndex - 1) * pageSize},${pageSize};
    `)

    return {
      code: 200,
      data: result
    }
  }
}
