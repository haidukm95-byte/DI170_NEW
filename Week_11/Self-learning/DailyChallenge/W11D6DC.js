//1. Use this Giphy API Random documentation. Use this API Key : hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My
//2. In the HTML file, add a form, containing an input and a button. This input is used to fetch gif 
//depending on a specific category.
//3. In the JS file, create a program to fetch one random gif depending on the search of the user 
//(ie. If the search is “sun”, append on the page one gif with a category of “sun”).
//4. The gif should be appended with a DELETE button next to it. Hint : to find the URL of the gif, 
//look for the sub-object named “images” inside the data you receive from the API.
//5. Allow the user to delete a specific gif by clicking the DELETE button.
//6. Allow the user to remove all of the GIFs by clicking a DELETE ALL button.

//1. Within div id='main', create div class='gif'
//2. Add event listener to ADD button according to query value:
// - fetch a random gif according to the query
// - append a gif to div class='gif'
// - append a DELETE button to div class 'gif'
//<!--1.2 Create REMOVE ALL button and place it next to ADD button-->
//<!--1.3 optionally - create an event for REMOVE ALL button when it asks 'are you sure? Y/N'-->

const gifAdd=document.querySelector('#gifAdd');
const removeAll= document.querySelector('#removeAll');
const main=document.querySelector('#main');
const input=document.querySelector('#input');
//`api.giphy.com/v1/gifs/random?tag=${input.value}&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My`

gifAdd.addEventListener('click', async ()=>{
    const query=input.value.trim();
    if(!query) return;

    const apiKey='hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';
    const url = `https://api.giphy.com/v1/gifs/random` + `?tag=${encodeURIComponent(query)}&rating=g&api_key=${apiKey}`;
        try {
            const resp = await fetch(url);
            
            if (!resp.ok) throw new Error(resp.statusText);
            const json = await resp.json();
            const imageUrl = json.data?.images?.original?.url;
            if (!imageUrl) throw new Error('no gif in response');

            const container = document.createElement('div');
            container.className = 'gif';

            const img = document.createElement('img');
            img.src = imageUrl;
            container.appendChild(img);

            const del = document.createElement('button');
            del.className = 'delete';
            del.textContent = 'DELETE';
            del.addEventListener('click', () => container.remove());
            container.appendChild(del);

            main.appendChild(container);
        } catch (err) {
            console.error(err);
        }
});
removeAll.addEventListener('click', () => {
    if (!confirm('Are you sure?')) return;
    while (main.firstChild) main.removeChild(main.firstChild);
});
