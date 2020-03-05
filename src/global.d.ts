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

declare const a : {

}
