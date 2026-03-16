//Difference between Promises and async/await - Demonstration using Examples
//Example with Promises

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
    endSemester
        .then(value =>
            console.log("I got an amazing gift : A ", value));
}

console.log('test 1');
checkRequest();
console.log('test 3');


//What do you think will be the order or the console.log?

//You get:

//test 1
//test 2
//test 3
//I got an amazing gift : A  Computer


//Same Example with async/await

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

const checkRequest = async () => {
    console.log('test 2');
    let gift = await endSemester;
    console.log(`I got an amazing gift : A ${gift}`);
}

console.log('test 1');
checkRequest();
console.log('test 3');

//You get:

//test 1
//test 2
//test 3
//I got an amazing gift : A  Computer
