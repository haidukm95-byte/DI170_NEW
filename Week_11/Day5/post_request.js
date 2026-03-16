POST Request

You can also use the Fetch API to make POST requests. This is useful if you need to send data to a web server, such as when submitting forms or uploading files.

fetch(resource, options)


    resource : This defines the resource that you wish to fetch. This can either be a string or any other object with a stringifier — including a URL object — that provides the URL of the resource you want to fetch, or a Request object.

    options Optional
    An object containing any custom settings that you want to apply to the request. The possible options are:
        method : The request method, e.g., GET, POST, PUT, DELETE

        headers : Any headers you want to add to your request, contained within a Headers object or an object literal with String values. It helps the server understand what type of request it is dealing with.

        body : Any body that you want to add to your request: this can be a Blob, an ArrayBuffer, a TypedArray, a DataView, a FormData, a URLSearchParams, string object or literal. Note that a request using the GET method cannot have a body.


Steps :

We will use this endpoint : https://jsonplaceholder.typicode.com/posts to send a new article to the server. The data will not be saved in any database,
this API is just for demonstration purposes.

    We call the Fetch API, we pass in the URL to the API and the options :
        the method : POST
        the body : the new article we want to add.
            the body holds the data to be sent to the server and added to the JSONPlaceholder posts API.
            Note: It is always best to serialize your data before sending it to a web server or API using the JSON.stringify() method. This will help convert and ensure your JSON data is in string format.
        the headers : 'Content-Type': 'application/json; charset=UTF-8'. The headers hold the type of content you want to send to the server, which in this case is JSON data.

    If the request is successful, the server will send us back the new article as well as its id.


JS - script.js

console.log("Starting ...")

const data = {
    title: "Article on Javascript",
    body: "This is an article presenting the new features of Javascript", 
    userId:1
}

const objBody = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-type": "application/json; charset=UTF-8"}
}

const addArticle = () => {
    console.log("Working ...")
    fetch("https://jsonplaceholder.typicode.com/posts", objBody)
        .then((response) => {
            console.log(response);
            if(response.ok === true){
                return response.json()
            } else {
                throw new Error("Wrong post")
            }
        })
        .then((obj) => {
            console.log(obj);
        })
        .catch((error)  => {
            console.log(error);
        });
    console.log("Work Done ...")
}

addArticle()


We receive

Starting ...
Working ...
Work Done ...

Response {type: 'cors', 
url: 'https://jsonplaceholder.typicode.com/posts', 
redirected: false, status: 201, ok: true, …}

body: (...)
bodyUsed: true
headers: Headers {}
ok: true
redirected: false
status: 201
statusText: ""
type: "cors"
url: "https://jsonplaceholder.typicode.com/posts"

{
  "title": "Article on Javascript",
  "body": "This is an article presenting the new features of Javascript",
  "userId": 1,
  "id": 101
}


POST request using Form Data

The FormData interface provides a way to construct a set of key/value pairs representing form fields and their values, which can be sent using the fetch() method.

The Object.fromEntries() static method transforms a list of key-value pairs into an object.


HTML - index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form>
        <label for="title-article">The title of the article</label>
        <input type="text" name="title" id="title-article">
        <label for="content-article">The content of the article</label>
        <input type="text" name="body" id="content-article">
        <label for="user-article">The user that wrote the article</label>
        <input type="text" name="userId" id="user-article">
        <button>Submit the article</button>
    </form>
    <script src="script.js"></script>
</body>
</html>


JS - script.js

console.log("Starting ...")

const addArticle = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const objBody = {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(data)),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }

    console.log("Working ...")
    fetch("https://jsonplaceholder.typicode.com/posts", objBody)
        .then((response) => {
            console.log(response);
            if(response.ok === true){
                return response.json()
            } else {
                throw new Error("Wrong post")
            }
        })
        .then((obj) => {
            console.log(obj);
        })
        .catch((error)  => {
            console.log(error);
        });
    console.log("Work Done ...")
}

const formArticle = document.querySelector("form");
formArticle.addEventListener("submit", addArticle);


We receive

Starting ...
Working ...
Work Done ...

Response {type: 'cors', 
url: 'https://jsonplaceholder.typicode.com/posts', 
redirected: false, status: 201, ok: true, …}

body: (...)
bodyUsed: true
headers: Headers {}
ok: true
redirected: false
status: 201
statusText: ""
type: "cors"
url: "https://jsonplaceholder.typicode.com/posts"

{
  "title": "Article on Javascript",
  "body": "This is an article presenting the new features of Javascript",
  "userId": 1,
  "id": 101
}
