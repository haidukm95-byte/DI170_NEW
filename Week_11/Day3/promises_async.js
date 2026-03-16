//Promises are asynchronous

//Example:

let goodGrades = 95;

let endSemester = new Promise((resolve, reject) => {
    console.log("test1")
    if (goodGrades > 90) {
        resolve("Computer");
    } else if (goodGrades => 80 && goodGrades <= 89) {
        resolve("Phone");
    } else {
        reject("I won't get the gift");
    }
    console.log("test2")
})

endSemester.then(value => console.log("Yeahhh I got a gift"))
endSemester.finally(() => console.log(`No matter if I get a gift or not,
                               I want to have good grades`))
console.log("test3");


//You get:

//test1
//test2
//test3

//Yeahhh I got a gift
//No matter if I get a gift or not,I want to have good grades


//You see that the console.log “test1”, “test2” and “test3” are ran before the then() and finally() method.

//It’s because Promises are asynchronous : the code will run without blocking or waiting for the result. 