let isBoss = confirm("Are you the boss?");
alert(isBoss);
undefined
    let user1 = "John"
    let user2 = "Bill"
    let user3 = "Nancy"

    let users = ["John", "Bill", "Nancy"]
undefined
let colors = ["blue", "yellow", "green" ]; 
colors.push("orange") 
console.log(colors)
Array(4) [ "blue", "yellow", "green", "orange" ]

undefined
colors.pop() 
console.log


console.log(colors)
Array(3) [ "blue", "yellow", "green" ]

undefined
let deletedItem = colors.splice(1, 1, 45, 23);
console.log(deletedItem) //  ['yellow']
console.log(colors)
Array [ "yellow" ]

Array(4) [ "blue", 45, 23, "green" ]

undefined
let favorite = colors.slice(2) 
console.log(favorite) // ["green" , "pink"]; 
console.log(colors)
