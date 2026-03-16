//Exercise 1 : Checking the BMI
//Instructions

//Hint:
//- You must use functions to complete this exercise, to do so take a look at tomorrow’s lesson.

//    Create two objects, each object should hold a person’s details. Here are the details:
//        FullName
//        Mass
//        Height

//Each object should also have a key which value is a function (ie. A method), that calculates the Body Mass Index (BMI) of each person

//Outside of the objects, create a JS function that compares the BMI of both objects.

//Display the name of the person who has the largest BMI.

function bmi(a,b){
    let i=a/(b**2);
    return i.toFixed(2);
}
let obj1={
    FullName: 'Marko Haiduk',
    Mass: 80,
    Height: 1.82,
    BMI: function() {return bmi(this.Mass, this.Height);}
};

let obj2={
    FullName: 'Fredi Shaulov',
    Mass: 58,
    Height: 1.63,
    BMI: function() {return bmi(this.Mass, this.Height);}
};

let compare=(a,b)=>{
    if (a.BMI()>b.BMI()){
        console.log(`${a.FullName} has the biggest BMI.`)
    }
    else if (a.BMI()<b.BMI()) {
        console.log(`${b.FullName} has the biggest BMI.`)
    }
    else{
        console.log('Both BMI\'s are equal.')
    };
}

compare(obj1, obj2);
