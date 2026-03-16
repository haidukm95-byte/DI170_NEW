movePlayer(100, 'Left')
    .then(()=>movePlayer(400, 'Left'))
    .then(()=>movePlayer(10, 'Right'))
    .then(()=>movePlayer(330, 'Left'))

//ASYNC AWAIT FUNCTION FOR WRITTEN ABOVE
async function playerStart() {
    const firstMove=await movePlayer(100, 'Left'); //pause
    await movePlayer(400, 'Left'); //pause
    await movePlayer(330, 'Left'); //pause
}


//EXAMPLE 2
async function fetchUsers() {
    const resp=await fetch('https://jsonplaceholder.typicode.com/users')
    //await is needed to make the code to wait for fetch response
    //await is placed in every async function where is a promise
        //.then(resp=>resp.json())
        //.then(console.log)
    //instead of .then now we use:
    const data=await resp.json();
    console.log(data);
}

fetchUsers();
