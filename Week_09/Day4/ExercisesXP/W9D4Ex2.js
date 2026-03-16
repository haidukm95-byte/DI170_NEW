//Exercise 2 : Colors #2
//Instructions

//Using these arrays :

const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th","st","nd","rd"];

//Write a JavaScript program that displays the colors in the following order : 
//  “1st choice is Blue .” “2nd choice is Green.” “3rd choice is Red.” ect…
// Hint : Use the array methods taught in class and ternary operator.

const displayColors=colors.map((color, i)=>{
    return i<=2 ? `${i+1}${ordinal[i+1]} choice is ${color}`: `${i+1}${ordinal[0]} choice is ${color}` 
})

displayColors