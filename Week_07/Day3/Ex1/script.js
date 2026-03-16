//Create a structured HTML file linked to a JS file

//1. Create these variables and give them values: 

let addressNumber;
let addressStreet;
let country;
addressNumber=8;
addressStreet='Bezalel'
country='Israel'

//2. Write a variable named globalAddress, and concatenate inside, 
// the variables:

//let globalAddress=addressNumber+' '+addressStreet+', '+country;

//In order to create a sentence

//3. Display globalAddress Example: globalAddress should display « I live in 55 av Bosquet, in Paris » 


let globalAddress= `${addressNumber} ${addressStreet}, ${country}`;
console.log('I live in '+globalAddress);

