//Part I
//1. In your Javascript file, using setTimeout, call a function after 
// 2 seconds.
//2. The function will alert “Hello World”.
function helloWorld(){
    alert('Hello World!')
}
setTimeout(helloWorld, 2000);
//Part II
//1. In your Javascript file, using setTimeout, call a function after 
// 2 seconds.
//2. The function will add a new paragraph <p>Hello World</p> to the 
// <div id="container">.
const div=document.querySelector('#container');
const p=document.createElement('p');
const button=document.querySelector('#clear');
p.innerText='Hello world';
function pAdd(){
    div.appendChild(p);
}
//setTimeout(pAdd, 2000);
//Part III
//1. In your Javascript file, using setInterval, call a function every 
// 2 seconds.
//2. The function will add a new paragraph <p>Hello World</p> to the 
// <div id="container">.
//3. The interval will be cleared (ie. clearInterval), when the user 
// will click on the button.
//4. Instead of clicking on the button, the interval will be cleared 
// (ie. clearInterval) as soon as there will be 5 paragraphs inside 
// the <div id="container">.
let intervalId = setInterval(function() {
    const p = document.createElement('p');
    p.innerText = 'Hello world';
    div.appendChild(p);
    let pQuant = div.querySelectorAll('p');
    if (pQuant.length >= 5) {
        clearInterval(intervalId);
    }
}, 2000);

// Clear on button click
button.addEventListener('click', function() {
    clearInterval(intervalId);
});