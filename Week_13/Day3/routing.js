//How to set up basic routing w/ Express
//Routing refers to setting up responses to client requests at designated endpoints.

//For example, a clothing site could have endpoints /shoes, /tees, and /pants. The client could request data from these 
// endpoints through a URI, like example.com + [endpoint], and an HTTP request method (GET, POST, etc.). The default 
// request method is GET.

//When a web application receives a request, it can send a file or serve up a webpage as a response.

//Below is the default structure of a route in Express:

//app.METHOD(PATH, HANDLER)

//    app is an instance of Express
//    METHOD is an HTTP express method
//    PATH is the endpoint
//    HANDLER is the function executed when a request is received from the path


//Hello world application

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

 //   Requires the express module and puts it in a variable (line 1)
 //   Calls the express function and creates an instance of the Express application to the app variable (line 2)
 //   Creates a variable port equal to 3000 (line 3)
 //   App starts server and listens for connections to port 3000 (line 7)
 //   Listens for requests to the the root URL / and sends the response “Hello World!” (line 5)

//To see the output on a local browser, run the app with the command node app.js. Then, load http://localhost:3000/ in a browser to see the output.

