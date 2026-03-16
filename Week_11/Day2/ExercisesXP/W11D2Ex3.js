const marioGame = {
  detail : "An amazing game!",
  characters : {
      mario : {
        description:"Small and jumpy. Likes princesses.",
        height: 10,
        weight: 3,
        speed: 12,
      },
      bowser : {
        description: "Big and green, Hates princesses.",
        height: 16,
        weight: 6,
        speed: 4,
      },
      princessPeach : {
        description: "Beautiful princess.",
        height: 12,
        weight: 2,
        speed: 2,
      }
  },
}

//1. Convert this JS object into a JSON object. What happens to the nested objects ?
let jsonMarioGame=JSON.stringify(marioGame);
console.log(typeof jsonMarioGame);
console.log(jsonMarioGame);
// After stringifying marioGame has converted into a string, with saving all the brackets of an object.
//  Also both property names and values got double quoted. It looks like a single string and quite hard 
// to read.

//2. Convert and pretty print this JS object into a JSON object. Hint : Check out the JSON lesson 
// on the platform.
let jsonPrettyMarioGame=JSON.stringify(marioGame, null, 2);
console.log(typeof jsonPrettyMarioGame);
console.log(jsonPrettyMarioGame);
//Type of the stringified oblect is a string, but it`s now pretty printed, e.g. printed in readable form,
// with saving the same object structure as in marioGame object.

//3. Use your web inspector to add a breakpoint. Check the values of the JSON object in the debugger.
debugger;

// After stopping the code from execution on line 26, all the JSON content has
// been appeared in Sources > Scope tab:

//Script
//jsonMarioGame
//: 
//<value unavailable>
//jsonPrettyMarioGame
//: 
//<value unavailable>
//marioGame
//: 
//characters
//: 
//bowser
//: 
//description
//: 
//"Big and green, Hates princesses."
//height
//: 
//16
//speed
//: 
//4
//weight
//: 
//6
//[[Prototype]]
//: 
//Object
//
//: 
//description
//: 
//"Small and jumpy. Likes princesses."
//height
//: 
//10
//speed
//: 
//12
//weight
//: 
//3
//[[Prototype]]
//: 
//Object
//princessPeach
//: 
//description
//: 
//"Beautiful princess."
//height
//: 
//12
//speed
//: 
//2
//weight
//: 
//2
//[[Prototype]]
//: 
//Object
//[[Prototype]]
//: 
//Object
//detail
//: 
//"An amazing game!"
//[[Prototype]]
//: 
//Object