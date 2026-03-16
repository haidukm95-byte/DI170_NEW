//Daily challenge: Groceries
//Instructions

//Using this object :

let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
}

//Hint: To do this daily challenge, take a look at today’s lesson 
// Pass By Value & Pass By Reference

//Create an arrow function named displayGroceries, that console.logs the 3 
// fruits from the groceries object. Use the forEach method.
let displayGroceries=(i)=>{
    console.log(i);
}
groceries.fruits.forEach(displayGroceries);

//Create another arrow function named cloneGroceries.
let cloneGroceries=()=>{
    let user=client;
    client='Betty';
    let shopping=groceries;
    groceries.totalPrice='35$';
    groceries.other.paid=false;
    console.log(`Client: ${client}`);
    console.log(`User: ${user}`);
    console.log(`Groceries.totalPrice: ${groceries.totalPrice}`);
    console.log(`Shopping.totalPrice: ${shopping.totalPrice}`);
    console.log(`Groceries.other.paid: ${groceries.other.paid}`);
    console.log(`Shopping.other.paid: ${shopping.other.paid}`);
}
cloneGroceries();
    //In the function, create a variable named user that is a copy of the 
    // client variable. (Tip : make the user variable equal to the client 
    // variable)
            //Change the client variable to “Betty”. Will we also see this 
            // modification in the user variable ? Why ?
//ANSWER: let client is a primitive string, so, after assigning 
// user=client, a standalone copy of client='John' has been created, and
// 'Betty' was reassigned to a user variable separately

        //In the function, create a variable named shopping that is equal to 
        // the groceries variable.
            //Change the value of the totalPrice key to 35$. Will we also 
            // see this modification in the shopping object ? Why ?
            //Change the value of the paid key to false. Will we also see 
            // this modification in the shopping object ? Why ?

    //ANSWER: Primitives (string, number, boolean) → the value itself is copied → independent
//Objects (objects, arrays) → only the reference is copied → they share the same data.
// So, because of this, groceries object has been modified and currently shares
// the same data along with shopping object.

    //Invoke the cloneGroceries function.



