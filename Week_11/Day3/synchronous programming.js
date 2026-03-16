//Synchronous programming

//Let’s say we are creating a program to prepare a burger.
//In the example below, each step is synchronous, meaning that first we get the meat, then we get the buns, finally we prepare the burger.

const makeBurger = () => {
    const meatType = getMeat();
    const bunsType = getBuns();
    const burger = putMeatBetwenBuns(bunsType, meatType);
    return burger;
};

function getMeat() {
    console.log("getting the beef from the butcher");
    return "beef"
}

function getBuns() {
    console.log("getting the buns from the bakery");
    return "whole grain";
}


function putMeatBetwenBuns(bunsType, meatType) {
    console.log(`creating the ${meatType} burger with ${bunsType} buns`);
    return "Delicious Burger"
}

const burger = makeBurger();
console.log(burger);

//We will receive in the console

//getting the beef from the butcher
//getting the buns from the bakery
//creating the beef burger with whole grain buns
//Delicious Burger

//But let’s say that getting the meat takes some time, therefore we will modify the getMeat() function by adding a setTimeout method.


const makeBurger = () => {
    const meatType = getMeat();
    const bunsType = getBuns();
    const burger = putMeatBetwenBuns(bunsType, meatType);
    return burger;
};

function getMeat() {
    console.log("walking to the butcher...");
    setTimeout(() => {
        console.log("getting the beef from the butcher");
        return "beef"
    }, 2000);
}

function getBuns() {
    console.log("getting the buns from the bakery");
    return "whole grain";
}


function putMeatBetwenBuns(bunsType, meatType) {
    console.log(`creating the ${meatType} burger with ${bunsType} buns`);
    return "Delicious Burger"
}

const burger = makeBurger();
console.log(burger);

//The function passed to setTimeout will be executed asynchronously, which means that the program will continue to execute the next line of code without waiting for the timeout to complete.

//In fact :

 //   The getMeat() function will start, so the setTimeout function is added to the call stack and triggers the execution of the Web API.
 //   While we wait 2000ms, the getBuns() and the putMeatBetwenBuns() functions are added to the call stack and are executed
 //   Only after 2000ms, the callback function of the setTimeout is added to the callback queue. The event loop then takes the callback from the queue and adds it to the call stack as soon as the call stack is empty, and executes the function.

//Which means that we will receive:


//getting the buns from the bakery
//creating the undefined burger with whole grain buns
//Delicious Burger
//getting the beef from the butcher


//Callback Hell

//We rewrite our code using callback functions, in order to wait for the meat to be retrieved, before we move on to the other actions.


function getMeat(callback) {
    console.log("walking to the butcher...");
    setTimeout(() => {
        console.log("getting the beef from the butcher");
        callback("beef");
    }, 2000);
}

function getBuns(callback) {
    console.log("getting the buns from the bakery");
    callback("whole grains");
}


function putMeatBetwenBuns(bunsType, meatType, callback) {
    console.log("preparing the burger...");
    callback(`The ${meatType} burger with ${bunsType} buns is created`)
}

const makeBurger = () => {
    getMeat((meatType) => {
        getBuns((bunsType) => {
            putMeatBetwenBuns(bunsType, meatType, (finalBurger) => {
                console.log(finalBurger);
            })
        })
    })
}

const burger = makeBurger();


//We receive :


//walking to the butcher...
//getting the beef from the butcher
//getting the buns from the bakery
//preparing the burger...
//The beef burger with whole grain buns is created


//You are seeing now a nesting of functions. The code looks scary…

//This is what we call a Callback Hell.

//When we nest callbacks like this, it can also get very hard to handle errors: often you have to handle errors at each level of the “pyramid”, instead of having error handling only once at the top level.

//For these reasons, most modern asynchronous APIs don’t use callbacks. Instead, the foundation of asynchronous programming in JavaScript is the Promise.


//Promises

//Promises are the alternative to callbacks for delivering the results of asynchronous computation.
//They allow you to easily chain asynchronous functions without ending up in what’s called callback hell or pyramid of doom.
//They are more readable as compared to callbacks and have many applications like fetch in Javascript.

//We would rewrite our code with Promises:

function startBurger() {
    return new Promise((resolve, reject) => {
        console.log("walking to the butcher...");
        setTimeout(() => {
            console.log("getting the beef from the butcher");
            resolve("beef");
        }, 2000)
    })
}


startBurger()
    .then(meatType => {
        console.log("getting the buns from the bakery");
        return [meatType, "whole grains"];
    })
    .then(([meatType, bunsType]) => {
        console.log("preparing the burger...");
        console.log(`The ${meatType} burger with ${bunsType} buns is created`);
    })


//and we will receive:

//walking to the butcher...
//getting the beef from the butcher
//getting the buns from the bakery
//preparing the burger...
//The beef burger with whole grain buns is created
