type ControllerResponse = {
  code: number
  data: any
}

type DBResponse = {
  result: boolean
  message: string
  code: string
}

type Product = {
  id: string,
  name: string,
  description?: string
  vender_id: number
  category_id: number
  actual_qty: number
  valid_qty: number
  attributes?: Attribute[]
  priceList?: Price[]
}

type Attribute = {
  attribute_name: string
  attribute_value: string
  description: string
}

type Price = {
  type: number
  price: number
  start_time?: string
  end_time?: string
  description?: string
}

type User = {
  mobile: string
  username: string
  password: string
  nickname?: string
  gender?: number
  birthday?: string
}

type Vender = {
  name: string
  description?: string
  country: string
  province: string
  city: string
  address: string
  tel: string
}

type Address = {
  customer_id: number
  country: string
  province: string
  city: string
  address: string
  zip: string
}

type OrderInsert = {
  id?: number
  type: number
  customer_id: number
  status: number
  date?: string
  refer_order?: number
  amounts: number
  address: number
  lines: OrderLine[]
}

type OrderQuery = {
  id: number
  type: number
  customer_id: number
  mobile: string
  customer: string
  status: number
  date?: string
  refer_order?: number
  amounts: number
  address: string
  ZIP: string
  city: string
  lines: OrderLine[]
}

type OrderLine = {
  order_id?: number
  line_no?: number
  product_id: string
  qty: number
}

type Pagination = {
  pageIndex: number
  pageSize: number
}
