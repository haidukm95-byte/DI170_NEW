//1. Retrieve the form and console.log it.
let form=document.querySelector('form');
let label=document.querySelectorAll('label');
let input=document.querySelectorAll('input');
function consoleForm() {
    for (let i=0; i<label.length; i++){
    label[i].appendChild(input[i]);
    form.appendChild(label[i]);
    
}
console.log(form, label, input);
}
consoleForm()

//2. Retrieve the inputs by their id and console.log them.
let inputFname=document.querySelector('#fname');
let inputLname=document.querySelector('#lname');
let inputSubmit=document.querySelector('#submit');
console.log(inputFname, inputLname, inputSubmit);
//3. Retrieve the inputs by their name attribute and console.log them.
let inputByName=document.querySelectorAll('[name]');
for (let i=0; i<inputByName.length; i++){
    console.log(inputByName[i]);
}

//4. When the user submits the form (ie. submit event listener)
        //use event.preventDefault(), why ?
        //get the values of the input tags,
        //make sure that they are not empty,
        //create an li per input value,
        //then append them to a the <ul class="usersAnswer"></ul>, below the form.

//The output should be :

//  <ul class="usersAnswer">
   //   <li>first name of the user</li>
   //   <li>last name of the user</li>
//  </ul>

form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (inputFname.value && inputLname.value) {
        const ul = document.querySelector('.usersAnswer');
        let liFname = document.createElement('li');
        liFname.textContent = inputFname.value;
        let liLname = document.createElement('li');
        liLname.textContent = inputLname.value;
        ul.appendChild(liFname);
        ul.appendChild(liLname);
    }
});

//additional element (not the part of the exercise`s tasks!)
const wipeOut=document.createElement('button');
wipeOut.innerText='Clear the names';
wipeOut.style.backgroundColor='grey';
wipeOut.style.width='150px';
wipeOut.style.height='30px';
document.body.appendChild(wipeOut);
wipeOut.addEventListener('click', function(){
    wipeOut.style.backgroundColor='red'
    const ul1=document.querySelector('.usersAnswer');
    ul1.innerHTML=''
})