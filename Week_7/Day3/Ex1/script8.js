//Create a structured HTML file linked to a JS file
//1. Write a JavaScript for loop that will iterate from 0 to 15. For each iteration, it will check if the current number is odd or even, and display a message to the screen.
for (let i = 0; i < 8; i++) {
    console.log("the current number is " + i)
    if (i % 2 === 0) {
        console.log(`${i} is even`)
    }
    else {
        console.log(`${i} is odd`)
    }
}
//Sample Output: //"0 is even" //"1 is odd" //"2 is even"
