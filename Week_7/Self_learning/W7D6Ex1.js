//Exercise 1 : Find the numbers divisible by 23
//Instructions
//Create a function call displayNumbersDivisible() that takes no parameter.
//In the function, loop through numbers 0 to 500.
function displayNumbersDivisible() {
    for (let x=0; x<=500; x++) {
        if (x % 3 === 0) {
            console.log(x)
        }
    }
}
displayNumbersDivisible();
//Console.log all the numbers divisible by 23.
// At the end, console.log the sum of all numbers that are divisible by 23.
function displayNumbersDivisible23() {
    let sum=0;
    for (let x=0; x<=500; x++) {
        if (x % 23 === 0) { 
            console.log(x)
            sum = sum+x   
        }
    }
    console.log(sum)
}

    //Outcome : 0 23 46 69 92 115 138 161 184 207 230 253 276 299 322 345 
    //368 391 414 437 460 483
    //Sum : 5313
displayNumbersDivisible23()
//Bonus: Add a parameter divisor to the function.

    //displayNumbersDivisible(divisor)

    //Example:
    //displayNumbersDivisible(3) : Console.log all the numbers divisible by 3, 
    //and their sum
    //displayNumbersDivisible(45) : Console.log all the numbers divisible by 45, 
    //and their sum

function displayNumbersDivisibleD(divisor) {
    let sum=0;
    for (let x=0; x<=500; x++) {
        if (x % divisor === 0) { 
            console.log(x)
            sum = sum+x   
        }
    }
    console.log(sum)
}

displayNumbersDivisibleD(3);
displayNumbersDivisibleD(45);