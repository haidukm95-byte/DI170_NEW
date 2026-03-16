//Exercise

//Use the methods above to :

  //  Count how many keys and values are in the object below
  //  Display : "The x# key is : --- The x# value is : ---".

let myObj = {
    name : "John",
    lastName : "Doe",
    age : 25,
    friends : ["Mark", "Lucie", "Ana"]
}
let a=Object.keys(myObj)
console.log(a.length)
let b=Object.values(myObj)
console.log(b.length)
for (item in Oblect.values(myObj)) {
    `The x# key is: ${item[0]} The x# value is: ${item[1]}`
}