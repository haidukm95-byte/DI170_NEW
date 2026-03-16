//Fetch API

//The fetch() method is available in the global scope, it instructs the web browsers to send a request to a URL.

//The fetch() method takes one mandatory argument: the path to the resource you want to fetch.

fetch(resource)


//The fetch() method returns a Promise that resolves to the Response to that request, whether it is successful or not.
//The Response object holds information about the server’s response.

//Let’s fetch this Third Party API : https://api.artic.edu/api/v1/artworks/4 - an API from the Art Institute of Chicago that allows developers to integrate the museum’s public data into their projects

console.log(fetch("https://api.artic.edu/api/v1/artworks/4"))

//Using fetch()

fetch('url')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))
  .finally(() => console.log('all done'));
