-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-- Basic Tables
select * from payment_methods;
select * from order_status;

delete from order_status;
ALTER TABLE order_status AUTO_INCREMENT = 1;
-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-- USERS
select * from users;
SELECT * FROM users WHERE (user_name = 'rosa@gmail.com' OR email = 'rosa@gmail.com') AND admin = 1;

delete from users where id > 1;
ALTER TABLE users AUTO_INCREMENT = 2;

-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-- PRODUCTS
select * from products;

-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
-- ORDERS
select * from orders;

delete from orders;
ALTER TABLE orders AUTO_INCREMENT = 1;


select * from order_details;
select o.id, o.id_user, u.full_name, u.address, u.phone, u.email, o.order_status_id, os.name order_status_name, o.payment_method_id, p.name payment_method_name, o.date
from orders o
inner join users u on u.id = o.id_user
inner join order_status os on os.id = o.order_status_id
inner join payment_methods p on p.id = o.payment_method_id
where o.id = 57;

delete from order_details; 
delete from orders;
delete from products;

ALTER TABLE payment_methods
ADD CHECK (active = 0 OR active = 1);