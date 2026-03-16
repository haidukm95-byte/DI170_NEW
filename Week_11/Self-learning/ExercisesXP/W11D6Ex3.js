//Exercise 3 : Async function
//Instructions

//Improve the program below :

//fetch("https://www.swapi.tech/api/starships/9/")
//    .then(response => response.json())
//    .then(objectStarWars => console.log(objectStarWars.result));

//Create an async function, that will await for the above GET request.
// The program shouldn’t contain any then() method.
// Make sure to check the status of the Response and to catch any occuring errors.
async function getStarshipData(){
    const url='https://www.swapi.tech/api/starships/9/';
    try{
        // 1. Await the GET request
        const response = await fetch(url);

        // 2. Check the status of the Response
        if (!response.ok) {
            // If response is not OK (e.g., 404, 500), throw an error
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 3. Await the JSON parsing
        const objectStarWars = await response.json();

        // Log the specific result data
        console.log(objectStarWars.result);
    }
    catch (error) {
        // 4. Catch any occurring errors (network issues, failed response.ok check, JSON parsing errors)
        console.error("Error fetching starship data:", error);
        // Optionally, you could display an error message to the user here
    };
};

getStarshipData();

