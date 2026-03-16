//Exercise 5 : Kg and grams
//Instructions

//Create a function that receives a weight in kilograms and 
// returns it in grams. (Hint: 1 kg is 1000gr)
//First, use function declaration and invoke it.
function kgToGDecl(x){
    return x*1000;
}
console.log(kgToGDecl(28));
//28000
// Then, use function expression and invoke it.
var kgToGExpr=function(x){
    return x*1000;
}
console.log(kgToGExpr(26));
//26000
//Write in a one line comment, the difference between function declaration 
// and function expression.
//function declaration can be hoisted, while expressions cannot.
//Finally, use a one line arrow function and invoke it.
var kgToGArr=(x)=>console.log(x*1000);
kgToGArr(22)
//22000