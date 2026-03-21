const express = require("express");
const app = express();
//middleware
app.use(express.json());

//serve static files
app.use(express.static("public"));

//middleware - parses urlencoded bodies
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app
  .route("/login")
  .get((req, res) => {
    console.log("Query", req.query); //{ username: 'john', password: '123' }
    const user = req.query.username;
    console.log("User", user); //john
    const pass = req.query.password;
    console.log("Password", pass); //123
    const data = {
      message: "Welcome Back",
      user,
    };
    console.log("GET DATA", data);
    // { message: 'Welcome Back', user: 'john' }
    res.send(data);
  })
  .post((req, res) => {
    console.log("req.body", req.body); //{ username: 'sara', password: 'abc' }
    let user = req.body.username;
    let pass = req.body.password;
    console.log("User", user); //Sara
    console.log("Pass", pass); //abc
    const data = {
      message: "Welcome New User",
      user,
    };
    console.log("POST DATA", data);
    //{ message: 'Welcome New User', user: 'Sara' }
    res.send(data);
  });

app.listen(3000, () => console.log("Example app listening on port 3000!"));
