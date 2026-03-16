//Await

//The keyword await makes JavaScript wait until that promise settles and returns its result.
//The function execution “pauses” and resumes when the promise resolves.

//With the await keyword, we can suspend the asynchronous function while waiting for the awaited value to return a resolved promise.
//While the function waits, the JavaScript engine can do other jobs in the meantime: execute other scripts, handle events, etc.

//The argument that follows await in the async function must return a Promise!

//Async functions make the code look like it’s synchronous, but it’s asynchronous and non-blocking behind the scenes.

//Explanation

async function foo() {
   await 1
}


//…is equivalent to:

function foo() {
   return Promise.resolve(1).then(() => undefined)
}


//It’s just a more elegant syntax of getting the promised result than promise.then, easier to read and write.


//Example : async function returns a Promise

async function hello() {
    return 'Hello';
}

const b = hello();

console.log(b)


//You get:

//Promise
//__proto__: Promise
//[[PromiseStatus]]: "resolved"
//[[PromiseValue]]: "Hello"

//Example : async function with then keyword

async function hello() {
    return 'Hello';
}

const b = hello();

b.then((result) => console.log(result))


//You get:

//Hello

//Example : with arrow function

const hello = async () => 'Hello'

const b = hello();

b.then((result) => console.log(result))
