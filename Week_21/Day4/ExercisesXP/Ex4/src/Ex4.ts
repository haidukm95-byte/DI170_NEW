/*
Exercise 4: Static Properties and Methods

Instructions:

Create a class Calculator with the following static methods:

    add(a: number, b: number): number – returns the sum of two numbers.
    subtract(a: number, b: number): number – returns the difference between two numbers.

Call these methods without creating an instance of the class.
*/

class Calculator{
    static add(a: number, b: number){
        return a+b;
    }

    static substract(a: number, b: number){
        return a-b;
    }
}

console.log(Calculator.add(5,8));
console.log(Calculator.substract(32, 9));