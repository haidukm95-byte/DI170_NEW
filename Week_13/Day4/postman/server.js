/*npm install body-parser
However, if you are running a version of Express that is 4.16+, it now includes the same functionality inside of Express.

Instead of adding these lines in the code like I will show you in the next video:

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

If you are using Express 4.16+ you can now replace that with:
(npm list express to check current version)

app.use(express.urlencoded({extended: false}));
app.use(express.json());
*/

//npm install express
//for more information about routing:
// https://expressjs.com/en/guide/routing

const express = require("express");
const app = express();

//TO SEND THE BODY as form-data or x-www-form-urlencoded!!!

/* FOR EXPRESS v. BELOW 4.16:
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); */

/* FOR EXPRESS v. ABOVE 4.16 (WITH PRE-INSTALLED BODY-PARSER!!!)*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Getting root");
});

app.get("/profile", (req, res) => {
  res.send("Getting profile");
});

app.post("/profile", (req, res) => {
  console.log(req.body);
  const user = {
    name: "Marko",
    age: "30",
  };
  res.send(user);
});

app.listen(3001);
