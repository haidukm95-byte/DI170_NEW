//Instructions
//1st daily challenge

//Create two functions. Each function should return a promise.
//The first function called makeAllCaps(), takes an array of 
// words as an argument
    //If all the words in the array are strings, resolve the 
    //  promise. The value of the resolved promise is the array of
    //  words uppercased.
    //    else, reject the promise with a reason.

//The second function called sortWords(), takes an array of words 
//      uppercased as an argument
    //If the array length is bigger than 4, resolve the promise. 
    //      The value of the resolved promise is the array of 
    //      words sorted in alphabetical order.

    //else, reject the promise with a reason.

const array1=['1914', 'was', 'the year', 'of', 'World War I beginning'];
const array2=[1914, 'was the year', 'of World War I beginning'];
const array3=['1914 was the year', 'of World War I beginning'];

function makeAllCaps(array){
    return new Promise((resolve, reject)=>{
        if(array.every(item=>typeof item==='string')){
            resolve(array.map(item => item.toUpperCase()));
        }
        else{
            reject('There are values which are not a string!');
        }
    });
}

function sortWords(array){
    return new Promise((resolve, reject)=>{
        if(array.length>4){
            resolve(array.sort());
        }
        else{
            reject('The array is too short!')
        }
    });
}

makeAllCaps(array1)
    .then(result => sortWords(result))
    .then(result=>console.log(result))
    .catch(error=>console.log(error));

makeAllCaps(array2)
    .then(result => sortWords(result))
    .then(result=>console.log(result))
    .catch(error=>console.log(error));

makeAllCaps(array3)
    .then(result => sortWords(result))
    .then(result=>console.log(result))
    .catch(error=>console.log(error));

