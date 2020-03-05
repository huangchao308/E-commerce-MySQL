import mysql from 'mysql2/promise'

let connection = null

const getConnection = async (): Promise<mysql.Connection> => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'Urie_308',
      database: 'Ecommerce'
    })
  }
  return connection
}

export const insert = async (sql: string): Promise<DBResponse> => {
  try {
    const connection: mysql.Connection = await getConnection()
    await connection.execute(sql)
    return {
      code: 'success',
      result: true,
      message: 'success'
    }
  } catch (error) {
    console.log(`Run this SQL failed: ${sql}`)
    console.log(error.stack)
    return {
      result: false,
      message: error.sqlMessage,
      code: error.code
    }
  }
}

export const query = async (sql: string): Promise<any[]> => {
  try {
    const connection: mysql.Connection = await getConnection()
    const [rows] = await connection.execute(sql)
    return rows as any[]
  } catch (error) {
    console.log(`Run this SQL failed: ${sql}`)
    console.log(error.stack)
    return []
  }
}

export const handleTransaction = async (sqlList: string[]): Promise<DBResponse> => {
  try {
    const connection: mysql.Connection = await getConnection()
    await connection.query('start transaction;')
    for (const sql of sqlList) {
      await connection.query(sql)
    }
    await connection.query('commit;')
    return {
      result: true,
      message: 'success',
      code: 'success'
    }
  } catch (error) {
    console.log(`Run SQL failed. SQL List: ${sqlList.join('\n')}`)
    console.log(error.stack)
    return {
      result: false,
      message: error.sqlMessage,
      code: error.code
    }
  }
}
