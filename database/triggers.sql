DELIMITER $$

CREATE TRIGGER neworder AFTER INSERT ON orders FOR EACH ROW SET @orderid = NEW.id;
$$

CREATE TRIGGER validateorder BEFORE INSERT ON orders FOR EACH ROW
BEGIN
  IF NEW.type = 1 AND NEW.status <> 10
  THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Cannot add or update row: status should be 10 when type is 1';
  END IF;
  IF NEW.type = 2 AND NEW.status <> 20
  THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Cannot add or update row: status should be 20 when type is 2';
  END IF; 
  IF NEW.type = 3 AND NEW.status <> 30
  THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Cannot add or update row: status should be 30 when type is 3';
  END IF;
  IF NEW.type <> 1 AND NEW.refer_order IS NULL
  THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Cannot add or update row: Return/refund order should has a relevant sales order';
  END IF;
  IF NEW.type <> 1 AND (SELECT COUNT(id) FROM orders WHERE id = NEW.refer_order) = 0
  THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Cannot add or update row: Return/refund order should has a relevant sales order';
  END IF;
END;
$$
