//A promise in Javascript is like an absolute promise.

//For example :
//Your mother promises you that if you get good grades at the end of the semester, she will buy you a gift.

//A promise starts in the pending state which indicates that the promise hasn’t completed. It ends with either fulfilled (successful) or rejected (failed) state.

//A promise has three states.

 //   Pending: the semester isn’t yet finished, so you don’t know if you will get good grades. Therefore you don’t know if you will get the gift.
 //   Fulfilled: you got good grades, and you receive the gift
 //   Rejected: you didn’t get good grades, so you don’t receive the gift

//In Javascript, a promise represents the result of an asynchronous operation.
//It’s an object that returns a value that you hope to receive in the future.

//Syntax

let promise = new Promise(function(resolve, reject) {
  // executor 
});


//The function passed to new Promise is called the executor. When new Promise is created, the executor runs automatically.
//The arguments resolve and reject are callbacks provided by JavaScript


let goodGrades = true;

let endSemester = new Promise(function (resolve, reject) {
    if (goodGrades) {
        resolve("I will get a gift");
    } else {
        reject("I won't get the gift");
    }
});

//Inside the executor:

//you manually call the resolve() function if the executor is completed successfully.
//you manually call the reject() function if an error occurs.

//The promise object, returned by the new Promise constructor, has a few properties:

    //The state of the promise : "pending", "resolved" or "rejected".
    //The result of the promise. The result is initially undefined.
    //    When the resolve(value) is called, the result becomes the value (the argument of the function resolve)
    //    When the reject(error) is called, the result becomes the error (the argument of the function reject)

//For example
//If you call the variable endSemester you get:

//Promise {<resolved>: "I will get a gift"}
__proto__: Promise
[[PromiseStatus]]: "resolved"
[[PromiseValue]]: "I will get a gift"

//The Promise status is resolved because the variable goodGrades is true.

//To see the process of a Promise, let’s add a timer :

let goodGrades1 = true;

let endSemester1 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        if (goodGrades1) {
            resolve("I will get a gift");
        } else {
            reject("I won't get the gift");
        }
    }, 5000);
});

console.log(endSemester1)

//Before the 5 seconds are up, you get :

//Promise {<pending>}
//__proto__: Promise
//[[PromiseStatus]]: "pending"
//[[PromiseValue]]: undefined


//After the 5 seconds are up, the result is different :

//Promise {<resolved>: "I will get a gift"}
//__proto__: Promise
//[[PromiseStatus]]: "resolved"
//[[PromiseValue]]: "I will get a gift"


//Prototypes methods: Consuming a Promise

//The prototype methods are applied to the instances of the Promise object. There are three methods:

//    then() : used to schedule a callback to be executed when the promise is successfully resolved.

//Promise.prototype.then(onFulfilled, onRejected) 


//onFulfilled and onRejected are callbacks called depending on the state of the Promise

    //catch(): used to schedule a callback to be executed when the promise is rejected

Promise.prototype.catch(onRejected)


    //finally() : used to execute the same piece of code whether the promise is fulfilled or rejected.

Promise.prototype.finally(onFinally)

//Example

let goodGrades2 = 83;

let endSemester2 = new Promise(function (resolve, reject) {
    if (goodGrades2 > 90) {
        resolve("Computer");
    } else if (goodGrades2 > 80 && goodGrades2 <= 89) {
        resolve("Phone");
    } else {
        reject("I won't get the gift");
    }
});


endSemester2.then(function (value) {
    console.log("I got an amazing gift : A ", value);
});

endSemester2.catch(function (value) {
    console.log("Booo", value);
});

endSemester2.finally(function () {
    console.log(`No matter if I get a gift or not, 
                I want to have good grades`);
});

console.log(endSemester2)


//You get :

//Promise {<resolved>: "Phone"}
//__proto__: Promise
//    [[PromiseStatus]]: "resolved"
//    [[PromiseValue]]: "Phone"

//I got an amazing gift : A Phone
//No matter if I get a gift or not, I want to have good grades


//You can also use Arrow Functions:

let goodGrades3 = 93;

let endSemester3 = new Promise((resolve, reject) => {
    if (goodGrades3 > 90) {
        resolve("Computer");
    } else if (goodGrades3 >= 80 && goodGrades3 <= 89) {
        resolve("Phone");
    } else {
        reject("I won't get the gift");
    }
})

endSemester3.finally(() => console.log(`No matter if I get a gift or not, 
                                       I want to have good grades`))
endSemester3.then(value => console.log("I got an amazing gift : A ", 
                                      value ));
endSemester3.catch(value => console.log("Booo", value));

console.log(endSemester3)


//You get :

//Promise {<pending>}
//__proto__: Promise
//    [[PromiseStatus]]: "resolved"
//    [[PromiseValue]]: "Computer"

//No matter if I get a gift or not, I want to have good grades
//I got an amazing gift : A Computer





