//Promise API
//Follow this documentation:
//https://javascript.info/promise-api

//Promise.all

//Used to execute many promises in parallel and wait until all of them are ready.
//Promise.all is a promise that takes an array of promises as an input (an iterable).

//Promise.all() returns a promise that is :

//    Fulfilled if all promises are fulfilled.
//    Then its fulfillment value is an Array with the fulfillment values of promises.
//    Rejected if at least one Promise is rejected.
//    Then its rejection value is the rejection value of that Promise.

//Promise.allSettled

//It returns a promise that always resolves after all of the given promises have either fulfilled or rejected.
//It returns an array of objects that each describes the outcome of each promise.
//Look at this part of the tutorial: https://javascript.info/promise-api#promise-allsettled
//Interesting tutorial - Promise.allSettled() VS Promise.all() in JavaScript: https://dev.to/viclafouch/promise-allsettled-vs-promise-all-in-javascript-4mle

//Promise.resolve/reject

//Promise.resolve(value) creates a resolved promise with the result value.
//Promise.reject(error) creates a rejected promise with error.

//Look at this part of the tutorial: https://javascript.info/promise-api#promise-resolve-reject
