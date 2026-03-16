
//Examples of Promises
//Table of Contents

            //The Example
            //Waiting For A Promise To Finish
            //Comsuming a Promise
            //Returning Values Out Of Promises
            //Using A Promise Later
            //Chaining Promises
            //Making A Promise Start Later
            //Static functions
            //Managing Multiple Promises
            //Static functions

//The Example

const flip = () => {
    let x = (Math.floor(Math.random() * 2) == 0);
    if (x) {
        return "heads";
    } else {
        return "tails";
    }
}

const flipACoin = new Promise((resolve, reject) => {
    const flipResult = flip();
    if(flipResult) {
      resolve();
    } else {
      reject();
    }
});

console.log("I'm about to flip a coin!");


Waiting For A Promise To Finish

const flip = () => {
    let x = (Math.floor(Math.random() * 2) == 0);
    if (x) {
        return "heads";
    } else {
        return "tails";
    }
}

console.log("I'm about to flip a coin!");

const flipACoin = new Promise((resolve, reject) => {
  console.log("I'm flipping the coin!");
  const flipResult = flip(); //let's say flip() takes a few seconds
  if(flipResult) {
    console.log("Here is the coin flip result!", flipResult);
    resolve();
  } else {
    reject();
  }
})
.then(() => {
  console.log("I have flipped the coin.")
});


//You get:

//I'm about to flip a coin!
//I'm flipping the coin!
//Here is the coin flip result! tails
//I have flipped the coin.


//Comsuming a Promise

//Here are all of the other Promise functions that you can use:

const flipACoin = new Promise((resolve, reject) => {
  resolve();
})
.then(() => {
  doSomethingElse()
  //use `.then()` to do something after `resolve()` has been called
})
.catch(() => {
  //use `.catch()` to do something after `reject()` has been called
})
.finally(() => {
  //use `.finally()` to do something either way
});


//Returning Values Out Of Promises

//resolve() should take in an argument.
//The function in .then() should take in a parameter.
//The argument passed to the resolve() function, is received by the parameter of the .then() method.


const flip = () => {
    let x = (Math.floor(Math.random() * 2) == 0);
    if (x) {
        return "heads";
    } else {
        return "tails";
    }
}

const flipACoin = new Promise((resolve, reject) => {
  const flipResult = flip(); //let's say flip() takes a few seconds
  if(flipResult) {
    resolve(flipResult);
  } else {
    reject();
  }
}).then((flipResult) => {
  console.log(`The result was ${flipResult}`);
});


//You get:

//The result was tails.


const p = new Promise((resolve, reject) => {
    if(true){
      resolve('hello world');
    }
    else{
      reject('error');
    }
});

p.then((result) => {
    // console.log(result);
    return result + "!";
})
.then((result1) => {
   return result1 + "?";
})
.then(result2=>{
  return result2 + "#";
})
.then(result3 => {
  console.log(result3);
})
.catch(err => {

});


//You get:

//hello world!?#
//Promise {<fulfilled>: undefined}


Using A Promise Later

const flip = () => {
    let x = (Math.floor(Math.random() * 2) == 0);
    if (x) {
        return "heads";
    } else {
        return "tails";
    }
}

const flipACoin = new Promise((resolve, reject) => {
  const flipResult = flip(); //let's say flip() takes a few seconds

  if(flipResult) {
    resolve(flipResult);
  } else {
    reject();
  }
});
//
//...
//do other things
//...
//
console.log("Wait, did I flip the coin?");
//
flipACoin.then((flipResult) => {
  console.log("Oh I did!");
  // console.log(flipResult);
});
//
console.log("Double checking...");
// //
flipACoin.then((flipResult) => {
  console.log("Okay I definitely did!");
  // console.log(flipResult);
});


//You get:

//Wait, did I flip the coin?
//Double-checking...
//Oh, I did!
//Okay, I did!
//Promise {<fulfilled>: undefined}


Chaining Promises

The most aesthetic property of promises is that they can be chained:

const flipACoin = new Promise((resolve, reject) => {
  resolve();
}).then(() => {
  //doSomething();
}).then(() => {
  //doSomethingElse();
}).then(() => {
  //doAnotherThing();
});


//Every .then() call in a chain waits on the last Promise in the chain, not the .then() before it.
//That means if doSomething() takes a while, doSomethingElse() may finish executing before doSomething() is finished executing.

//Example:

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 2000);
})
.then((result) => {
  console.log("Done!1");
})
.then((result) => {
  setTimeout(() => {
        console.log("Done!2");
  }, 5000);
})
.then((result) => {
  console.log("Done!3");
});


//You get:

//Done!1
//Done!3
//Done!2


//Easy way to wait on the last one

console.log('1111111111111111111111111');

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 2000);
}).then((result) => {
  console.log("Done!1");
}).then((result) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Done!2");
      resolve();
    }, 3000);
  });
}).then((result) => {
  console.log("Done!3");
});
console.log('2222222222222222222222222');


//You get:

//1111111111111111111111111
//2222222222222222222222222
//Done!1
//Done!2
//Done!3


//Making A Promise Start Later

const doThisLater = () => {
  return new Promise((resolve, reject) => {
    console.log("Done!");
    resolve();
  });
};

console.log("After promise-creating function");

doThisLater();


//You get:

//After promise-creating function
//Done!
//Promise {<fulfilled>: undefined}


//Static functions

    Promise.resolve()
    Promise.reject()

Promise.resolve(); //makes a promise that instantly resolves

Promise.reject(); //makes a promise that instantly rejects


const resolvingPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("resolved result");
  }, 2000);
});

const rejectingPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("rejected result");
  }, 2000);
});

resolvingPromise.then((result) => {
  console.log(`done! + ${result}`);
});
//done! + resolved result

rejectingPromise.catch((result) => {
  console.log(`done! + ${result}`);
});
//done! + rejected result

resolvingPromise.finally((result) => {
  //note that this demonstrates that there is no result passed to
  // `.finally()`
  console.log(`done! + ${result}`);
});
//done! + undefined


const resolvingPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("resolved result");
  }, 2000);
});

resolvingPromise.then((result) => {
  console.log(`done! ${result}`);
})
.catch((error) => {
  console.log(`done! ${error}`);
})
.finally(() => {
  //note that this demonstrates that there is no result passed to finally()
  console.log(`do something finally`);
});


//You get:

//done! resolved result
//do something finally


//Managing Multiple Promises
//Static functions

    Promise.all()
    Promise.allSettled()
    Promise.race()

Promise.all([promise1,promise2,.....]).then((results) => {
  //if all promises in the collection resolves,
  // `results` is an array of
  // [promise1 result, promise2 result, promise3 result]
}).catch((error) => {
  //if any promise is rejected,
  // `error` will have the rejected value of the promise that failed
  //if multiple failed,
  // `error` will be the error of the first one that failed
});

Promise.allSettled(allPromises).then((results) => {
  //waits until all promises either resolved or rejected
  //`results` will be an array of
  // [promise1 result, promise2 result, promise3 result]
});

Promise.race(allPromises).then((value) => {
  //waits until first promise in array is resolved
  //`value` will be the resolved value of the first promise resolved
}).catch((value) => {
  //waits until first promise in array is rejected
  //`value` will be the rejected value of the first promise rejected
});


//Example:

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("result1");
    }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("result2");
    }, 2000);
});

const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("result3");
    }, 3000);
});

Promise.all([promise1, promise2, promise3])
.then((results) => {
  console.log(results);
}).catch((error) => {
  console.log(error);
});
// result2

Promise.allSettled([promise1, promise2, promise3])
.then((results) => {
  console.log(results);
  // results.map(r => {
  //   console.log(`{ status: ${r.status}, value: ${r.value}, reason: ${r.reason} }`);
  // })
})
//  [
//   { status: 'fulfilled', value: 'result1' },
//   { status: 'rejected', reason: 'result2' },
//   { status: 'fulfilled', value: 'result3' }
// ]


Promise.race([promise1, promise2, promise3])
.then((results) => {
  console.log(results);
})
.catch((error) => {
  console.log(error);
});
//result1
