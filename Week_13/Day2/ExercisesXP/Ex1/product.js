//Exercise 1: Multiple Exports and Import using CommonJS syntax
//Instructions
//Create a file named products.js.
//Inside products.js, create an array of objects, each representing a product with properties like name, price, and category.
//Export this array using the Common JS syntax.
//Create another file named shop.js.
//In shop.js, require the product objects from the products.js module.
//Create a function that takes a product name as a parameter and searches for the corresponding product object.
//Call this function with different product names and print the details of the products.
//Run shop.js and verify that the correct product details are displayed.


const products = [
    {'name': 'Lenovo T430',
     'price': 1700,
     'category': 'laptops'   
    },
    {'name': 'Samsung Galaxy A35',
     'price': 1200,
     'category': 'smartphones'   
    },
    {'name': 'MSI Titan 18 HX Dragon',
     'price': 20000,
     'category': 'laptops'   
    },
    {'name': 'Xiaomi Redmi A10',
     'price': 700,
     'category': 'smartphones'   
    }];

module.exports=products;

