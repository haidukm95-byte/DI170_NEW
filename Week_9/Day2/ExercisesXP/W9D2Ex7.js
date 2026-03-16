//Exercise 7 : Welcome
//Instructions

//John has just signed in to your website and you want to welcome him.

//Create a Navbar in your HTML file.
//In your js file, create a self invoking funtion that takes 1 argument: 
//      the name of the user that just signed in.
//The function should add a div in the nabvar, displaying the name of the 
//      user and his profile picture.
let body=document.body;
let nav=document.createElement('nav');
body.prepend(nav);
(function(name){
    let div=document.createElement('div');
    let img=document.createElement('img');
    img.src='https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.webp?s=1024x1024&w=is&k=20&c=qcfUz-2TZEaFotFckzmyFkQnqx7BWOeAl6fs2VYnmrc=';
    img.style='width: 250px; height: 250px';
    div.innerText=`Welcome ${name}!`;
    div.style='font-family: Arial; font-size: 30px';
    div.append(img);
    nav.append(div);
})('Ryan');

