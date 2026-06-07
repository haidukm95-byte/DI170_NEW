import jwt from "jsonwebtoken";
// const jwt = require('jsonwebtoken')

/**
 * jwt.sign(payload, secret, options)
 */
const PAYLOAD = { userId: 123, email: "john@gmail.com", username: "JohnJohn" };
const SECRET = "123456";
const OPTIONS = { expiresIn: 86400000, algorithm: "HS256" };
// expiresIn: '60s' | '5m' | '2h' | '1d' | '1w' | '1y' | or a number
/**
('2 days')  // 172800000
('1d')   // 86400000
('10h')  // 36000000
('2.5 hrs') // 9000000
('2h')      // 7200000
('1m')      // 60000
('5s')      // 5000
('1y')      // 31557600000
('-3 days') // -259200000
('-1h')     // -3600000
*/
//const expireTime = Math.floor(Date.now() / 1000) + 15 * 60; // 15 min

// const myToken = jwt.sign(PAYLOAD, SECRET, OPTIONS)
const myToken = jwt.sign(
  { userId: 123, email: "john@gmail.com", username: "JohnJohn" },
  SECRET,
  { expiresIn: "1d", algorithm: 'HS256' },
);

// console.log(myToken);

const decode = jwt.decode(myToken);
// console.log(decode);

/**
 * jwt.verify(token,secret, options, callback) - async
 * jwt.verify(token,secret, options) - sync - returns payload
 */
const TestToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiZW1haWwiOiJqb2huQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiSm9obkpvaG4iLCJpYXQiOjE3ODA0MTQ0MjMsImV4cCI6MTc4MDUwMDgyM30.jqguYh3PF_qAQpHMQmR0aXAEnk71TDN4dNnCJ_M3z4w";

jwt.verify(TestToken, '12345', { algorithms: ["HS256"] }, (err, decoded) => {
    if(err) {
        /**
         * err.name-> 
         * TokenExipredError - the 'exp' is in the past
         * JsonWebTokenError - bad sigature, malformed,wrong algorithm
         * NotBeforeError - 'nbf 
         */
        console.log('verify failed ->', err.name, err.message);
        return;
    }
    console.log('verify payload ->', decoded);
});

