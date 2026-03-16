const randomUid=()=>{
    let min=1;
    let max=83;
    let res=Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.trunc(res);
}

//  `https://www.swapi.tech/api/people/${uid}`

const search=document.querySelector('#search');

search.addEventListener('click', fetchData);
    async function fetchData() {
        const uid=randomUid()
        const api=`https://www.swapi.tech/api/people/${uid}`;
        const name=document.querySelector('#name');
        const height=document.querySelector('#height');
        const gender=document.querySelector('#gender');
        const birthyear=document.querySelector('#birth-year');
        const homeworld=document.querySelector('#home-world');
        try{
            const response = await fetch(api);
            if (!response.ok){
                throw new Error('This person is not available!')
            }
            const data = await response.json();
            name.innerText=data.result.properties.name;
            height.innerText=`Height: ${data.result.properties.height}`;
            gender.innerText=`Gender: ${data.result.properties.gender}`;
            birthyear.innerText=`Birthyear: ${data.result.properties.birth_year}`;
            fetch(data.result.properties.homeworld)
                .then(res => res.json())
                .then(planet => homeworld.innerText = `Homeworld: ${planet.result.properties.name}`)
                .catch(() => homeworld.innerText = 'Homeworld: [not available]');
        }
        catch(error){
            name.innerText='Error fetching data!';
            console.error('Error fetching data!', error);
        }
    }