CREATE OR REPLACE VIEW orders_head_view AS
  SELECT
    orders.id as id,
    orders.type as type,
    orders.date as date,
    orders.status as status,
    orders.refer_order as refer_order,
    orders.amounts as amounts,
    customer.mobile as mobile,
    customer.username as customer,
    customer.id as customer_id,
    address.address as address,
    address.zip as ZIP,
    address.city as city
  FROM orders,customers as customer,customer_address as address
  WHERE
  orders.customer_id = customer.id AND orders.address = address.id
  ORDER BY orders.id DESC;