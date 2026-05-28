/* Exercise 2: Readonly Properties in a Class

Instructions:

Create a class Product with the following properties:

    A readonly property id of type number.
    A public property name of type string.
    A public property price of type number.

Create a method getProductInfo that returns a string with the product’s name and price. Attempt to modify the id 
property after creating a new instance of the class and observe the result.

*/

class Product {
    static count: number=0;
    static getCount(): number{
        return Product.count
    }
    readonly id: number;
    public name: string;
    public price: number;
    constructor(name: string, price: number) {
        this.id=++Product.count+1
        this.name=name;
        this.price=price;
    }
    getProductInfo(){
        return `#${this.id} ${this.name}: $${this.price}`
    };
};

const xiaomiPad7Pro=new Product('Xiaomi Pad 7 Pro', 550);
const samsungA35=new Product('Samsung Galaxy A35', 400);
const lenovoT430=new Product('Lenovo ThinkPad T430', 500);
console.log(xiaomiPad7Pro.getProductInfo());
console.log(samsungA35.getProductInfo());
console.log(lenovoT430.getProductInfo());

// lenovoT430.id=33; // cannot assign to id because it is a read-only property

