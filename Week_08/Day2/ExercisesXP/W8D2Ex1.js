//1. Using a DOM property, retrieve the h1 and console.log it.
let someFacts=document.getElementsByTagName('h1');
for (let i=0; i<someFacts.length; i++){
    console.log(someFacts[i].textContent);
}
//2. Using DOM methods, remove the last paragraph in the <article> tag.
let article=document.querySelector('article');
let p=article.getElementsByTagName('p');
let pArray=Array.from(p);
for (let i=0; i<pArray.length; i++){
    article.appendChild(pArray[i]);
}
article.removeChild(article.lastElementChild);
//3. Add a event listener which will change the background color of the h2 to red, when it’s 
//      clicked on.
let theChocolate=document.querySelector('h2');
theChocolate.addEventListener('click', function() {
    theChocolate.style.backgroundColor='brown'
})
//4. Add an event listener which will hide the h3 when it’s clicked on 
//  (use the display:none property).
let history=document.querySelector('h3');
history.addEventListener('click', function(){
    history.style='display: none'
})
//5. Add a <button> to the HTML file, that when clicked on, should make the
//  text of all the paragraphs, bold.
let button=document.createElement('button');
document.body.appendChild(button);
button.innerText='Bold';
button.style.padding='5px 10px'; 
button.style.backgroundColor='#fedcba';
let paragraphs=document.querySelectorAll('p');
button.addEventListener('click', function(){
    for (let i=0; i<paragraphs.length; i++){
        pArray[i].style.fontWeight='bold';
    }
})

