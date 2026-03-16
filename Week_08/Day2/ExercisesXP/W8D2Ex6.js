//1. Copy the code above, to a structured HTML file.
//2. In your Javascript file, use setInterval to move the <div id="animate"> to the right side of the <div id="container">, when the button is clicked on.

//The <div id="animate"> should move 1px to the right every milisecond, 
// until it reaches the end of the <div id="container">.
//Hint : use clearInterval as soon as the box reaches the right end side
//  of the container
//Hint : check out the demonstration in the Course Noted named JS Functions

const button=document.querySelector('button');
const container=document.querySelector('#container');
const animate=document.querySelector('#animate');
function myMove(){
    button.addEventListener('click', function (){
        let pos = 0;  // starting position
        const id = setInterval(function() {
        pos += 1;  // increase by 1 pixel
        animate.style.left = pos + 'px';
        if (pos>=350) {
            clearInterval(id)
        }
        })
    })
}
myMove()