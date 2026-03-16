//GET request

//Steps :

  //  We call the Fetch API and pass in the URL to the API.

  //  The fetch() method returns a Promise that needs to be consumed. We use the then() method that receives the Response object.
  //      We check the status of the reponse.
  //          If the response is successful, the data is parsed. In fact, the data returned from the API is not usually in a useable form. So we’ll need to convert the data to a form which our JavaScript can operate with.
  //          To extract the JSON body content from the response, we use the Response.json() method.
  //          If the response is not successful, we throw an error that will be caught by the catch and will log the potential error to the console.

  //  The Response.json() returns a Promise that resolves with the result of parsing the response body text as JSON.
  //  Therefore, the JSON data needs to be processed, se we add another then() statement.

console.log("Starting ...")


const getArtwork = () => {
    console.log("Working ...")
    fetch("https://api.artic.edu/api/v1/artworks/14572")
        .then((response) => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error("Wrong artwork")
            }
        })
        .then((obj) => {
            console.log(obj);
            console.log(`The painting is named ${obj.data.title} 
                         by the artist ${obj.data.artist_title}`)
        })
        .catch(function (error) {
            console.log(`We got the error ${error}`)
        });
    console.log("Work Done ...")
}


getArtwork()

//We get :

//Starting ...
//Working ...
//Work Done ...
//{data: {…}, info: {…}, config: {…}}
//The painting is named The Millinery Shop 
//by the artist Hilaire Germain Edgar Degas


//If the artwork couldn’t be found, for example using this url : https://api.artic.edu/api/v1/artworks/1. We get :

//Starting ...
//Working ...
//Work Done ...
//GET https://api.artic.edu/api/v1/artworks/1 404
//We got : Error: Wrong artwork
