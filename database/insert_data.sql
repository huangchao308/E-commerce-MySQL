####################
#  Insert categories data
####################
INSERT INTO categories (name,description) VALUES('watch','手表');
INSERT INTO categories (name,description) VALUES('bracelet','手镯');
INSERT INTO categories (name,description) VALUES('ring','戒指');
INSERT INTO categories (name,description,parent_id) VALUES('Classic Watch','经典系列',1);
INSERT INTO categories (name,description,parent_id) VALUES('Icon Watch','全新Icon系列',1);
INSERT INTO categories (name,description,parent_id) VALUES('Petite Watch','Petite系列',1);
INSERT INTO categories (name,description,parent_id) VALUES('Classic bracelet','经典手镯',2);
INSERT INTO categories (name,description,parent_id) VALUES('Classic ring','经典戒指',3);

####################
#  Insert venders data
####################
INSERT INTO venders (name,description,address,tel,country,province,city) VALUES('测试用供应商','本供应商仅供测试使用，并非真实供应商','广东省深圳市南山区NB工业园','0755-88211790','中国','广东省','深圳市');

####################
#  Insert products data
####################
INSERT INTO products (id,name,vender_id,category_id,actual_qty,valid_qty,description) VALUES('DW00100001','Classic Watch 32mm',1,7,1000,1000,'经典款手表');
INSERT INTO products (id,name,vender_id,category_id,actual_qty,valid_qty,description) VALUES('DW00100002','Classic Watch 30mm',1,7,1000,1000,'经典款手表');
INSERT INTO products (id,name,vender_id,category_id,actual_qty,valid_qty,description) VALUES('DW00100003','Classic Watch 28mm',1,7,1000,1000,'经典款手表');
INSERT INTO products (id,name,vender_id,category_id,actual_qty,valid_qty,description) VALUES('DW00100004','Icon Link Watch 36mm',1,8,1000,1000,'全新Icon Link手表');
INSERT INTO products (id,name,vender_id,category_id,actual_qty,valid_qty,description) VALUES('DW00100005','Icon Link Watch 32mm',1,8,1000,1000,'全新Icon Link手表');
INSERT INTO products (id,name,vender_id,category_id,actual_qty,valid_qty,description) VALUES('DW00100006','Icon Link Watch 28mm',1,8,1000,1000,'全新Icon Link手表');
INSERT INTO products (id,name,vender_id,category_id,actual_qty,valid_qty,description) VALUES('DW00200001','Classic bracelet 32mm',1,10,1000,1000,'经典款手镯');
INSERT INTO products (id,name,vender_id,category_id,actual_qty,valid_qty,description) VALUES('DW00300001','Classic ring 18',1,11,1000,1000,'经典款戒指');

####################
#  Insert products price data
####################
INSERT INTO price (product_id,price,type,description) VALUES('DW00100001',800.00,1,'采购价格');
INSERT INTO price (product_id,price,type,description) VALUES('DW00100001',1290.00,0,'零售价格');
INSERT INTO price (product_id,price,type,description,start_time,end_time) VALUES('DW00100001',999.00,0,'双11活动零售价格','2020-11-11 00:00:00', '2020-11-18 23:59:59');
INSERT INTO price (product_id,price,type,description) VALUES('DW00100002',900.00,1,'采购价格');
INSERT INTO price (product_id,price,type,description) VALUES('DW00100002',1390.00,0,'零售价格');
INSERT INTO price (product_id,price,type,description,start_time,end_time) VALUES('DW00100002',1099.00,0,'双11活动零售价格','2020-11-11 00:00:00', '2020-11-18 23:59:59');
INSERT INTO price (product_id,price,type,description) VALUES('DW00100003',1000.00,1,'采购价格');
INSERT INTO price (product_id,price,type,description) VALUES('DW00100003',1490.00,0,'零售价格');
INSERT INTO price (product_id,price,type,description,start_time,end_time) VALUES('DW00100003',1199.00,0,'双11活动零售价格','2020-11-11 00:00:00', '2020-11-18 23:59:59');
INSERT INTO price (product_id,price,type,description) VALUES('DW00100004',1000.00,1,'采购价格');
INSERT INTO price (product_id,price,type,description) VALUES('DW00100004',1490.00,0,'零售价格');
INSERT INTO price (product_id,price,type,description,start_time,end_time) VALUES('DW00100004',1199.00,0,'双11活动零售价格','2020-11-11 00:00:00', '2020-11-18 23:59:59');
INSERT INTO price (product_id,price,type,description) VALUES('DW00100005',1000.00,1,'采购价格');
INSERT INTO price (product_id,price,type,description) VALUES('DW00100005',1490.00,0,'零售价格');
INSERT INTO price (product_id,price,type,description,start_time,end_time) VALUES('DW00100005',1199.00,0,'双11活动零售价格','2020-11-11 00:00:00', '2020-11-18 23:59:59');
INSERT INTO price (product_id,price,type,description) VALUES('DW00100006',1000.00,1,'采购价格');
INSERT INTO price (product_id,price,type,description) VALUES('DW00100006',1490.00,0,'零售价格');
INSERT INTO price (product_id,price,type,description,start_time,end_time) VALUES('DW00100006',1199.00,0,'双11活动零售价格','2020-11-11 00:00:00', '2020-11-18 23:59:59');
INSERT INTO price (product_id,price,type,description) VALUES('DW00200001',200.00,1,'采购价格');
INSERT INTO price (product_id,price,type,description) VALUES('DW00200001',600.00,0,'零售价格');
INSERT INTO price (product_id,price,type,description,start_time,end_time) VALUES('DW00200001',499.00,0,'双11活动零售价格','2020-11-11 00:00:00', '2020-11-18 23:59:59');
INSERT INTO price (product_id,price,type,description) VALUES('DW00300001',150.00,1,'采购价格');
INSERT INTO price (product_id,price,type,description) VALUES('DW00300001',500.00,0,'零售价格');
INSERT INTO price (product_id,price,type,description,start_time,end_time) VALUES('DW00300001',399.00,0,'双11活动零售价格','2020-11-11 00:00:00', '2020-11-18 23:59:59');

####################
#  Insert products attributes data
####################
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100001','表盘直径','32mm');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100001','表盘颜色','黑色');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100001','表带颜色','黑色');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100001','表带材质','尼龙');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100002','表盘直径','30mm');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100002','表盘颜色','白色');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100002','表带颜色','黑色');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100002','表带材质','皮革');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100003','表盘直径','28mm');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100003','表盘颜色','黑色');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100003','表带颜色','黑色');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100003','表带材质','尼龙');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100004','表盘直径','36mm');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100004','表盘颜色','黑色');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100004','表带颜色','金色');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100004','表带材质','不锈钢');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100005','表盘直径','32mm');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100005','表盘颜色','白色');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100005','表带颜色','金色色');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100005','表带材质','不锈钢');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100006','表盘直径','28mm');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100006','表盘颜色','黑色');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100006','表带颜色','银色');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00100006','表带材质','不锈钢');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00200001','尺寸','32mm');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00200001','颜色','银色');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00200001','材质','不锈钢');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00300001','尺寸','18mm');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00300001','颜色','金色');
INSERT INTO product_attributes (product_id,attribute_name,attribute_value) VALUES('DW00300001','材质','不锈钢');
