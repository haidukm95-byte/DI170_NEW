//Async

//Syntax

async function <func_name>(param1,param2, ect ..) {
   statements
}

async function name(){}

const name = async function(){}

const name = async () => {}


//An async function returns a Promise which will be resolved or rejected.

  //  When no return statement is defined, or a return statement has no value, the function returns a resolving promise, equivalent to return Promise.Resolve()
  //  When a return statement is defined with a value, it will return a resolving promise with the given return value, equivalent to return Promise.Resolve(value)
  //  When an error is thrown, a rejected promised will be returned with the thrown error, equivalent to return Promise.Reject(error) .


async function foo() {
   return "Hey"
}

foo()


//…is equivalent to:

function foo() {
   return Promise.resolve("Hey")
}

foo()


//We receive:

//Promise {<fulfilled>: 'Hey'}
//[[Prototype]]: Promise
//[[PromiseState]]: "fulfilled"
//[[PromiseResult]]: "Hey


//No return value

async function foo() {
   return;
}

foo()


//We receive :

//Promise {<fulfilled>: undefined}
//[[Prototype]]: Promise
//[[PromiseState]]: "fulfilled"
//[[PromiseResult]]: undefined


//Error Thrown


async function foo() {
   throw new Error("Something went wrong")
}

foo()


//We receive :

//Promise {<rejected>: Error: Something went wrong
//[[Prototype]]: Promise
//[[PromiseState]]: "rejected"
//[[PromiseResult]]: Error: Something went wrong
//IN RED : STOPS THE EXECUTION
//Uncaught (in promise) Error: Something went wrong
//    at foo (<anonymous>:2:10)
//    at <anonymous>:1:1
