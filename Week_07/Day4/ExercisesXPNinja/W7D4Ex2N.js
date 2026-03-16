//Exercise 2 : Grade Average
//Instructions

//Hint:
//- This Exercise is trickier then the others. You have to think about its structure before you start coding.
//- You must use functions to complete this exercise, to do so take a look at tomorrow’s lesson.

//In this exercise we will be creating a function which takes an array of grades as an argument and will console.log 
// the average.

//    Create a function called findAvg(gradesList) that takes an argument called gradesList.

//    Your function must calculate and console.log the average.

//    If the average is above 65 let the user know they passed

//    If the average is below 65 let the user know they failed and must repeat the course.
//    Bonus Try and split parts 1,2 and 3,4 of this exercise to two separate functions.
//    Hint One function must call the other.

let gradesList=[74, 62, 40, 88, 70, 55, 76];
let gradesList2=[33, 88, 34, 55, 68];
let gradesList3=[95, 88, 79, 92, 65];
let gradesList4=[44, 90, 72, 62, 84, 53];
function findAvg(arr){
    let sum=0;
    for(let i=0; i<arr.length; i++){
        sum+=arr[i];
    }
    let avg=sum/arr.length;
    function hasPassed(value){
        if(value>65){
            console.log('Congratuations! You have been passed!')
            return true
        }
        else{
            console.log('Unfortunately, you haven\'t passed.')
            return false
        }
    }
    console.log('Your average mark is ',+avg);
    hasPassed(avg);
}

findAvg(gradesList);
findAvg(gradesList2);
findAvg(gradesList3);
findAvg(gradesList4);
