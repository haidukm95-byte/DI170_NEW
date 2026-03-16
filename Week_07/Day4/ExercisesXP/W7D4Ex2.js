//Exercise 2 : Your favorite colors
//Instructions

//    Create an array called colors where the value is a list of your
//  five favorite colors.
let colors = ['black', 'blue', 'red', 'green', 'grey'];
//    Loop through the array and as you loop console.log a string like 
// so: “My #1 choice is blue”, “My #2 choice is red” ect… .
for (let x in colors) {
    let output=`My #${x} choice is ${colors[x]}`
    console.log(output);
}
//    Bonus: Change it to console.log “My 1st choice”, “My 2nd choice”, 
// “My 3rd choice”, picking the correct suffix for each number.
//    Hint : create an array of suffixes to do the Bonus



