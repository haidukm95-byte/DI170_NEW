//Chaining Promises

//Promises are useful when you have to handle more than one asynchronous task, one after another. For that, we use promise chaining.

//We chain promises by passing the result through the chain of .then handlers.

//Because of promise chaining, you don’t need to catch errors in each individual then(). If you put catch() at the end of your promise chain, any errors in the promise chain will bypass the rest of the promise chain and go straight to your catch() error handler.

myPromise
.then(handleResolvedA)
.then(handleResolvedB)
.then(handleResolvedC)
.catch(handleRejectedAny);


//Each handler (success or error) can return a value, which will be passed to the next function as an argument, in the chain of promises.

//Example:

let bankAmount = 1000
let expense = 500

let bankPromise = new Promise((resolve, reject) => {
    if (expense<bankAmount) {
        resolve(expense);
    } else {
        reject("Rejected by the Bank");
    }
});

//1st "then"
bankPromise.then((result) => {
    //result is the argument passed in the resolve function
    console.log(`The expense is ${result} dollars`);
    return result * 1.17;
//2nd "then"
}).then((resultTwo) => {
    //resultTwo is the expense including taxes
    console.log(`The expense included taxes is ${resultTwo} dollars`);
    bankAmount -= resultTwo;
    console.log(`I have ${bankAmount} dollars left in the bank`);
    return bankAmount;
}).catch((error) => {
    console.log(`We have a problem : ${error}`)
});


//Process: Chaining promises

  //  First then() :
  //  The callback passed to the then() method executes once the bankPromise is resolved.
  //  In the callback function, we show the result of the promise, the amount of the expense 500 and we return a new value: result*1.17.
  //  The value returned is passed to the next .then handler
  //  Second then() :
  //  Because the first then() method returns a new Promise , we can call the second then() method on the returned Promise.
  //  In the callback function, we show the result of the previous promise, the amount of the expense included taxes 585 and we return the amount left in the bank.
  //  catch() : if there is an error somewhere in the process, the catch() method is executed.


//We receive :

//The expense is 500 dollars
//The expense included taxes is 585 dollars
//I have 415 dollars left in the bank


//We also receive the promise below, which is the promise returned by the last then() method

//Promise {<fulfilled>: 415}
//[[Prototype]]: Promise
//[[PromiseState]]: "fulfilled"
//[[PromiseResult]]: 415


//If the bankPromise rejects :

//let bankAmount = 1000
//let expense = 1500

//let bankPromise = new Promise((resolve, reject) => {
//    if (expense<bankAmount) {
//        resolve(expense);
//    } else {
//        reject("Rejected by the Bank");
//    }
//});

bankPromise.then((result) => {
    console.log(`The expense is ${result} dollars`);
    return result * 1.17;
}).then((resultTwo) => {
    console.log(`The expense included taxes is ${resultTwo} dollars`);
    bankAmount -= resultTwo;
    console.log(`I have ${bankAmount} dollars left in the bank`);
    return bankAmount;
//straight to the catch
}).catch((error) => {
    console.log(`We have a problem : ${error}`)
});

//We receive

//We have a problem : Rejected by the Bank

//If there is an error in one of the then() method:

let bankAmount1 = 1000
let expense1 = 500

let bankPromise1 = new Promise((resolve, reject) => {
    if (expense<bankAmount) {
        resolve(expense);
    } else {
        reject("Rejected by the Bank");
    }
});


bankPromise1.then((result) => {
    console.log(`The expense is ${result} dollars`);
    hello //undefined variable
    return result * 1.17;
}).then((resultTwo) => {
    console.log(`The expense included taxes is ${resultTwo} dollars`);
    bankAmount -= resultTwo;
    console.log(`I have ${bankAmount} dollars left in the bank`);
    return bankAmount;
}).catch((error) => {
    console.log(`We have a problem : ${error}`)
});


//We receive

//The expense is 500 dollars
//We have a problem : ReferenceError: hello is not defined
