//Using Javascript:

//Retrieve the div and console.log it
//Change the name “Pete” to “Richard”.
// Delete the second <li> of the second <ul>.
// Change the name of the first <li> of each <ul> to your name. (Hint : use
//       a loop)
let divCont=document.getElementById('container')
console.log(divCont)
console.log(divCont.innerText)

let nameChange= document.getElementsByTagName("li")[1].innerHTML = "<li>Richard</li>"
let ul2 = document.getElementsByTagName("ul")[1];
let li2 = ul2.getElementsByTagName("li")[1];
ul2.removeChild(li2);

function li1remove(){
    for (let i=0; i<=1; i++){    
        let ul=document.getElementsByTagName('ul')[i];
        let li=ul.getElementsByTagName('li')[0];
        ul.removeChild(li)
    }
}

li1remove();
// Using Javascript:

// Add a class called student_list to both of the <ul>'s.
const list=document.getElementsByClassName('list');
for (let i=0; i<list.length; i++){
    list[i].classList.add('student_list');
}

// Add the classes university and attendance to the first <ul>.
const ul1=document.getElementsByTagName('ul')[0];
ul1.classList.add('university', 'attendance');

// Using Javascript:
// Add a “light blue” background color and some padding to the <div>.
divCont.style.backgroundColor='lightblue';
divCont.style.padding='5px';
// Do not display the <li> that contains the text node “Dan”. (the last <li>
//       of the first <ul>)
let danRemove=document.querySelector('ul:last-of-type li:last-child')
danRemove.style.display='none'
// Add a border to the <li> that contains the text node “Richard”. 
//      (the second <li> of the <ul>)
let liRichard = document.querySelectorAll('ul li')[1];
liRichard.style.border='5px solid black'


// Change the font size of the whole body.
document.body.style.fontSize='28px'

//Bonus: If the background color of the div is “light blue”, alert 
// “Hello x and y” (x and y are the users in the div).
for (let i=0; i<=1; i++) {    
    if (divCont.style.backgroundColor==='lightblue'){
        alert(`Hello ${document.getElementsByTagName('li')[i].innerText}`)
    }
}