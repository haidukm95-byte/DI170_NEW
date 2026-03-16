--Instructions
--Create a table called product_orders and a table called items. You decide which fields should be
-- in each table, although make sure the items table has a column called price.
--There should be a one to many relationship between the product_orders table and the items table. 
--An order can have many items, but an item can belong to only one order.

--Create a function that returns the total price for a given order.

--Bonus :
        --Create a table called users.
       -- There should be a one to many relationship between the users table and the product_orders
       -- table.
    --Create a function that returns the total price for a given order of a given user.

CREATE TABLE items(
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    on_stock INGERER NOT NULL,
    price INTEGER NOT NULL,
    total_cost INTEGER NOT NULL,
    total_cost=on_stock*price
);
CREATE TABLE product_orders(
    order_id SERIAL PRIMARY KEY;
    item_id INTEGER REFERENCES items(item_id),
    item_name VARCHAR(200) REFERENCES items(name),
    quantity INTEGER,
    price INTEGER NOT NULL REFERENCES items(price),

)

--try to create a custom function which calculates total sum of the whole order
--product_orders may be a list of all the orders, but a separate table is needed for each order displaying
--also customers table needed
--customer`s name to be included into product_orders table
--REDO product_orders according to the script