//In this exercise we will be creating a webpage with a black background as the solar system and we 
//         will fill the solar system with planets and their moons.
//We will provide the HTML page.
//You only have to work with a JS file.
const listPlanets = document.querySelector('.listPlanets');
//Create an array which value is the planets of the solar system.
const planets=['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 
'Uranus', 'Neptune', 'Pluto'];
const moons=[[], [], ['Moon'], ['Phobos', 'Deimos'],['Ganymede', 'Io', 'Europa', 'Callisto', 'Amalthea', 'Thebe', 'Metis'],
['Titan', 'Rhea', 'Iapetus', 'Dione', 'Tethys', 'Enceladus', 'Mimas'], 
['Titania', 'Oberon', 'Umbriel', 'Ariel', 'Miranda'], ['Triton', 'Proteus', 'Nereid', 'Larissa'], 
['Charon']];
const planetsBgcolors=['#9d9897', '#e6dfda', '#507297', '#b99c77', 
'#e6983d', '#817c5f', '#b4ceda', '#84a5b4', '#817565'];
//For each planet in the array, create a <div> using createElement. This div should have a class 
//  named "planet".
for(let i=0; i<planets.length; i++){
    let planet=document.createElement('div');
    planet.classList.add('planet', planets[i]);
    planet.style.backgroundColor=planetsBgcolors[i];
    planet.textContent=planets[i];
    for (let j = 0; j < moons[i].length; j++) {
        let moon = document.createElement('p');
        moon.classList.add('moon', moons[i][j]);
        moon.style.backgroundColor='#9d9897';
        moon.textContent = moons[i][j];
        planet.appendChild(moon);
    }
    listPlanets.appendChild(planet);

}
listPlanets.style.display='flex';
listPlanets.style.flexDirection='column';
listPlanets.style.gap='20px';

document.querySelectorAll('.planet').forEach(planet=>{
    let wrapper=document.createElement('div');
    wrapper.style.display='flex';
    wrapper.style.alignItems='center';
    wrapper.style.gap='10px';
    planet.parentNode.insertBefore(wrapper, planet);
    wrapper.appendChild(planet);
    let moons=planet.querySelectorAll('.moon');
    moons.forEach(moon=>{
        moon.style.position='relative';
        wrapper.appendChild(moon);    
    });
});

//Each planet should have a different background color. (Hint: you could add a new class to each 
//  planet - each class containing a different background-color).
//Finally append each div to the <section> in the HTML (presented below).
    
//Bonus: Do the same process to create the moons.
    //Be careful, each planet has a certain amount of moons. How should you display them?
    //Should you still use an array for the planets ? Or an array of objects ?





