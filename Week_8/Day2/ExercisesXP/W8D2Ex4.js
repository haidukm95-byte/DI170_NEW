//Write a JavaScript program to calculate the volume of a sphere. 
// Use the HTML code as a base

//Math.PI for 3.14~~~~
//create a variable for input(r)
let radInput=document.querySelector('#radius');
let volOutput=document.querySelector('#volume');
//create a variable for output(volume)
//formula is volume=4/3*Math.PI*r*r*r

let submit=document.querySelector('#submit');
submit.addEventListener('click', function(event){
    event.preventDefault();
    let r=radInput.value;
    let v=4/3*Math.PI*r*r*r;
    volOutput.value=v;
})

