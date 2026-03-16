const divDom=document.body.firstChild;
const divDom2=document.body.children[0];
console.log(divDom);
console.log(divDom2);

const ulDom=document.body.firstElementChild.nextElementSibling;
console.log(ulDom);
const ulDom2=document.body.lastElementChild.previousElementSibling;

const pete=document.body.firstElementChild.nextElementSibling.lastElementChild;
const pete2=ulDom.lastElementChild;
console.log(pete2);

const pete3=document.getElementById('Pete');
console.log(pete3);
pete.innerText='Marko';
const names=document.getElementsByClassName('name');
console.log(names);

const names2=document.querySelector('');
const tova = document.createElement('li')
tova.innerText='Tova'


