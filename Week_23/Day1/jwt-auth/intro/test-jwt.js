// in server directory:
//npm init -y
//npm i @node-rs/argon2 cookie-parser cors dotenv express helmet jsonwebtoken pg

import jwt from 'jsonwebtoken';

/**
 * jwt.sign(payload, secret, options)
 */

const PAYLOAD = {userId: 123, email: 'john@gmail.com', username: 'JohnJohn'};
const SECRET = '12345'; //to be stored in .env! should be a string!
const OPTIONS = {expiresIn: '1d', algorithm: 'HS256'}; //HS256 is a default algorythm
//expiresIn: '60s' | '5m' | '2h' | '1d' | '1w' | '1y'
/**
 * ('2 days') // 172800000
 * ('1d') //86400000
 * const expireTime=Math.floor(Date.now()/1000)+15*60 //15 min
 */

const myToken=jwt.sign(PAYLOAD, SECRET, OPTIONS);

console.log(myToken)
// 9tIiwidXNlcm5hbWUiOiJ1c2VyMDAxIiwiaWF0IjoxNzgwNDEzODk2LCJleHAiOjE3ODA1MDAyOTZ9.ifhZTO-l1bkZGzZ_3JrsFaRHCOWoV1De2P89co0u978
const decode=jwt.decode(myToken);
console.log(decode);

/**
 * jwt.verify(token, secret, options?, callback)  - async //options are optional here
 * jwt.verify(token, secret, options) - sync - returns payload
 * 
 */
const TestToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';

jwt.verify(TestToken, SECRET, {algorithms: ['HS256']}, (err, decoded)=>{
    if(err) {
        /**
         * err.name ->
         * TokenExpiredError - the 'exp' is in the past
         * JsonWebTokenError - bad signature, malformed, wrong algorithm
         * NotBeforeError - 'nbf
         */
        console.log('verify failed ->', err.name, err.message);
        return;
    }
    console.log('verify payload ->', decoded)
});

//token is a tool which makes a session remain online for a
// dedicated period of time

