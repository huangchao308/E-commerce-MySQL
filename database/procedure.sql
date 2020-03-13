DELIMITER $$

CREATE PROCEDURE addOrderLines(
  IN order_id INT,
  IN product_id VARCHAR(32),
  IN qty INT
)
BEGIN
  DECLARE cprice DECIMAL(8,2);
  DECLARE amount DECIMAL(8,2);
  DECLARE price_cursor CURSOR FOR
  SELECT price FROM price
  WHERE
  product_id = product_id
  AND
  type = 0
  AND
  start_time <= now()
  AND
  end_time > now()
  ORDER BY
  end_time
  LIMIT 1;
  -- Check the valid_qty
  IF (SELECT valid_qty FROM products WHERE id = product_id) < qty
  THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Inventory shortage!';
  END IF;
  
  -- Compute the amount
  OPEN price_cursor;
  FETCH price_cursor INTO cprice;
  CLOSE price_cursor;
  IF cprice IS NULL
  THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'There is no sales price for this product';
  END IF;
  SELECT cprice * qty INTO amount;

  -- Add order line and update products
  START TRANSACTION;
    UPDATE products SET valid_qty = valid_qty - qty WHERE id = product_id;
    INSERT INTO orderlines(order_id,product_id,price,qty,amount)
    VALUES(
      order_id,
      product_id,
      cprice,
      qty,
      amount
    );
  COMMIT;
END;
$$

call addOrderLines(1, 'DW00100001', 1);
$$
