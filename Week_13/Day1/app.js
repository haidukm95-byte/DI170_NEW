// const {a, sayhi, saybey} = require('./utils.js')
import { saybey, sayhi, a } from "./utils.js";
import { multi, plus, minus, divide } from "./math/math.js";
import axios from "axios";
import fs from "fs";

// const res = await axios.get("https://jsonplaceholder.typicode.com/users");
// console.log(res.data);
console.log("before");

// fs.readFile("text.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log(data);
// });

const data = fs.readFileSync('text.txt', 'utf-8')
console.log(data);
console.log('after');

// console.log(plus(5,6));
// console.log(minus(5,6));
// console.log(divide(5,6));
// console.log(multi(5,6));

// sayhi('Dan')
// saybey('Dan')

// console.log(a);

// console.log('hello NodeJS');

// for(let i = 0; i < 5; i++) {
//     console.log(i);
// }

// fetch('https://jsonplaceholder.typicode.com/users')
// .then(res=> res.json())
// .then(data => {
//     console.log(data);
// })

/**
 * Node Module System
 * 1. Core Modules (built in) -> fs, http, path, crypto ....
 * 2. Third Party Modules - NPM -
 * 3. Local Modules -
 */

/**
 * Create a new Folder - math
 * Create a file math.js
 * create 4 function - multi, divide, plus, minus - 2 inputs parametes (a,b)
 * return the a * b, a / b, a + b, a -b
 * Test these functions
 * create a module from math.js
 * use those functions in app.js/ main.js
 */
