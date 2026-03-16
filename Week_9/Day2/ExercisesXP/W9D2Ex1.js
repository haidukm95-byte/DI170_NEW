//Exercise 1 : Scope
//Instructions
//Analyse the code below, and predict what will be the value of a in all the 
//      following functions.
//Write your prediction as comments in a js file. Explain your predictions.


// #1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
}
//if a is bigger than 5, it`s redeclared to a=3. a is inside the fucntion, so 
//the final output will be 3, according to the condition

// #1.1 - run in the console:
funcOne()
// #1.2 What will happen if the variable is declared 
//      with const instead of let ?
//Uncaught SyntaxError: unexpected token: identifier (because const is non-changeable)
//#2
let a = 0;
function funcTwo() {
    a = 5;
}

function funcThree() {
    alert(`inside the funcThree function ${a}`);
}

// #2.1 - run in the console:
funcThree()
//a===0, because a = 5 value is within function funcTwo() and is not global
funcTwo()
//it's not possible to define funcTwo() after defining let a=0; because let variable is non-redeclarable
funcThree()
// #2.2 What will happen if the variable is declared 
// with const instead of let ?
//funcThree()
//inside the funcThree function 0 (because const is non-changeable for any matter)
//funcTwo()
//Uncaught TypeError: invalid assignment to const 'a' (const is non-changeable)

//#3
function funcFour() {
    window.a = "hello";
}


function funcFive() {
    alert(`inside the funcFive function ${a}`);
}

//#3.1 - run in the console:
funcFour()
//the function is non-definable, because a has been already declared as let. Restarting the console:
//after restarting the console and redefining theses two functions:
// output: undefined
funcFive()
// output: inside the funcFive function hello

//#4
let a = 1;
//in this page, a has been already declared in first functions.
//this example is run after restarting the console on funcFour()
function funcSix() {
    let a = "test";
    alert(`inside the funcSix function ${a}`);
}


// #4.1 - run in the console:
funcSix()
//output: inside the funcSix function test (because built-in-function a has been run and global a has ben ignored)
// #4.2 What will happen if the variable is declared 
// with const instead of let ?
//Uncaught TypeError: invalid assignment to const 'a' (const is non-changeable)

//#5
let a = 2;
if (true) {
    let a = 5;
    alert(`in the if block ${a}`);
    //in the if block 5 (in-function a is run)
}
alert(`outside of the if block ${a}`);
//outside of the if block 2 (out-function a is run) 

// #5.1 - run the code in the console
// #5.2 What will happen if the variable is declared 
// with const instead of let ?
//output will be exactly the same in all cases:
//    - if declaring both a as const;
//    - if declaring only a global a as const;
//    - if declaring only an intra-function a as const
// because both alert's used different a's. In fact, intra-function a can be
// run only within a function, while the global one - everywhere except the function.