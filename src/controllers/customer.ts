import md5 from 'md5'
import moment from 'moment'
import { escape } from 'mysql2'
import { query, handleTransaction, insert } from '../db'

export default class CustomerController {
  public async register (user: User): Promise<ControllerResponse> {
    const { password, ...others } = user
    const result = await insert(`insert into customers(password,register_time,${Object.keys(others).join()})
      values(${escape(md5(password))},${escape(moment().utc().format('YYYY-MM-DD HH:mm:ss'))},${Object.keys(others).map((key: string) => escape(others[key])).join()});`)
    return {
      code: 200,
      data: result
    }
  }

  public async login (username: string, password: string): Promise<ControllerResponse> {
    const [user] = await query(`select id from customers where username = ${escape(username)} and password = ${escape(md5(password))};`)
    if (user && user.id) {
      return {
        code: 200,
        data: user
      }
    }
    return {
      code: 403,
      data: { message: 'username or password invalid' }
    }
  }
}
