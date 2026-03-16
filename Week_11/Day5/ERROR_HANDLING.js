//Error Handling

//Difference between Promises and Async/Await - Demonstration with examples
//Example with Promises and error handling

//    In this example, try/catch won’t handle the undefined variable because the error is happening inside a promise.

let goodGrades = 93;

let endSemester = new Promise((resolve, reject) => {
    if (goodGrades > 90) {
        resolve("Computer");
    } else if (goodGrades => 80 && goodGrades <= 89) {
        resolve("Phone");
    } else {
        reject("I won't get the gift");
    }
})

const checkRequest = () => {
    console.log('test 2');
    try {
        endSemester
            .then(value => {
                hey; //variable not defined
                console.log("I got an amazing gift : A ", value);
            });
    } catch (err) {
        console.log("In the catch ", err)
    }

}

console.log('test 1');
checkRequest();
console.log('test 3');


//You get :

//test 1
//test 2
//test 3
//IN RED : STOPS THE EXECUTION
//Uncaught (in promise) ReferenceError: hey is not defined

//Or you should write :

const checkRequest = () => {
    console.log('test 2')
    try {
        endSemester
            .then(value => {
                hey //variable not defined
                console.log("I got an amazing gift : A ", value)
            })
            //handle asynchronous errors
            .catch((err) => {
                console.log(err)
            })
    } catch (err) {
        console.log("In the catch ", err)
    }
}

console.log('test 1');
checkRequest();
console.log('test 3');


//You get :

//test 1
//test 2
//In the catch  ReferenceError: hey is not defined
//test 3


//Example with async/await and error handling

const checkRequest = async () => {
    console.log('test 2');
    try {
        hey //variable not defined
        let result = await endSemester;
        console.log("I got an amazing gift : A ", result);
    } catch (err) {
        console.log("In the catch ", err);
    }
}


console.log('test 1');
checkRequest();
console.log('test 3');


//You get :

//test 1
//test 2
//In the catch  ReferenceError: hey is not defined
//test 3


//Fetch API - Using Async/Await

//Demonstration with examples

//Example async/await and Fetch API

const fetchSunRise = async (endpoint) => {
    const response = await fetch(endpoint);
    console.log("response", response)
    let data = await response.json();
    console.log("data", data);
    let sunrise = data.results.sunrise;
    console.log(`The hour of the sunrise in London is: ${sunrise}`);
}

fetchSunRise("https://api.sunrise-sunset.org/json?lat=32.0853&lng=34.7818");


//You get :
//result async await


//Error Handling & Fetch API - Using Async/Await

//Demonstration with examples

//Example async/await and Fetch API and try/catch

const fetchSunRise = async (endpoint) => {
    try {
        const response = await fetch(endpoint);
        console.log("response", response)
        let data = await response.json();
        console.log("data", data);
        hey; // undefined variable
        let sunrise = data.results.sunrise;
        console.log(`The hour of the sunrise in London is: ${sunrise}`);
    } catch (err) {
        console.log(err);
    }
}

fetchSunRise("https://api.sunrise-sunset.org/json?lat=32.0853&lng=34.7818");


//You get :
//result async await try/catch



//Error Handling & throw error & Fetch API - Using Async/Await

//Demonstration with examples

  //  In this example, the undefined variable will be caught, because async returns a Promise.

const fetchSunRise = async (endpoint) => {
    try {
        const response = await fetch(endpoint);
        if (response.status == 400) {
            throw new Error("Something went wrong")
        } else {
            console.log("response", response)
            hey; // undefined variable
            let data = await response.json();
            console.log("data", data);
            let sunrise = data.results.sunrise;
            console.log(`The hour of the sunrise in London is: ${sunrise}`)
        }
    } catch (err) {
        console.log("In the catch ", err)
    }
}

fetchSunRise("https://api.sunrise-sunset.org/json?lat=0.0853&lng=0.7818")


//In the catch  ReferenceError: hey is not defined
 //   at fetchSunRise (<anonymous>:8:13)

//You can also write :

const fetchSunRise = async (endpoint) => {
    const response = await fetch(endpoint);
    if (response.status == 400) {
        throw new Error("API - wrong link ")
    } else {
        console.log("response", response)
        hey // undefined variable
        let data = await response.json();
        console.log("data", data)
        let sunrise = data.results.sunrise
        console.log(`The hour of the sunrise in London is: ${sunrise}`)
    }
}


fetchSunRise("https://api.sunrise-sunset.org/json?lat=0.0853&lng=0.7818")
.catch((err) => console.log("Error", err))
