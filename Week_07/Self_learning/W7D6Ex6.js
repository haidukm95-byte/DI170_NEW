//Add the code above, to your HTML file
//Using Javascript, in the <div>, change the value of the id attribute from navBar 
//      to socialNetworkNavigation, using the setAttribute method.
const div=document.getElementById('navBar');
div.setAttribute('id', 'socialNetworkNavigation');
//We are going to add a new <li> to the <ul>.
//First, create a new <li> tag (use the createElement method).
const ul=document.querySelector('ul');
const li=document.createElement('li');
//Create a new text node with “Logout” as its specified text.
const logout=document.createTextNode('Logout');
//Append the text node to the newly created list node (<li>).
li.appendChild(logout);
//Finally, append this updated list node to the unordered list (<ul>), using the appendChild method.
ul.appendChild(li);
//Use the firstElementChild and the lastElementChild properties to retrieve 
// the first and last <li> elements from their parent element (<ul>). 
// Display the text of each link. (Hint: use the textContent property).
const firstLi=ul.firstElementChild;
const lastLi=ul.lastElementChild;
console.log(`First: ${firstLi.textContent}`);
console.log(`Last: ${lastLi.textContent}`);