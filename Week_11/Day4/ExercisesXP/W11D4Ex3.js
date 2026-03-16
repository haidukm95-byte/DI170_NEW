//Exercise 3 : Resolve & Reject

//Instructions

//Use Promise.resolve(value) to create a promise that will 
//  resolve itself with a value of 3.

//Use Promise.reject(error) to create a promise that will reject 
//  itself with the string “Boo!”

function numberInput(num){
    return new Promise(function(resolve, reject){
        if(num===3){
            resolve('The value is correct!');
        }
        else{
            reject('Boo!');
        }
    });
}

numberInput(3)
    .then(result => console.log(result))
    .catch(error => console.log(error));

numberInput(8)
    .then(result => console.log(result))
    .catch(error => console.log(error));