//Exercise 3 : Playing with numbers
//Instructions

let age = [20,5,12,43,98,55];

//Requirements : Don’t use built-in Javascript methods to answer the following questions. 
// You have to create the logic by yourself. Use simple for loops.
//1. Console.log the sum of all the numbers in the age array.
//2. Console.log the highest age in the array.
let sum=0;
for(let i=0; i<age.length; i++){
    sum+=age[i];
}
console.log(sum);

let ageMax=0;
for(let j=0; j<age.length; j++){
    if(age[j]>ageMax){
        ageMax=age[j];
    }
}
console.log(ageMax);