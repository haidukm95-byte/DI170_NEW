//Review about objects
//Copy and paste the above object to your Javascript file.
const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
}

//Console.log the number of floors in the building.
console.log(`Number of floors: ${building.numberOfFloors}`);
//Console.log how many apartments are on the floors 1 and 3.
console.log(`Apartments on 1st floor: ${building.numberOfAptByFloor.firstFloor}`);
console.log(`Apartments on 3rd floor: ${building.numberOfAptByFloor.thirdFloor}`);
//Console.log the name of the second tenant and the number of rooms he 
// has in his apartment.
console.log(`${building.nameOfTenants[1]} has ${building.numberOfRoomsAndRent.dan[0]} rooms in his apartment.`);
//Check if the sum of Sarah’s and David’s rent is bigger than Dan’s rent. 
// If it is, than increase Dan’s rent to 1200.
let rentSarahDavid = building.numberOfRoomsAndRent.sarah[1] + building.numberOfRoomsAndRent.david[1];
var rentDan = building.numberOfRoomsAndRent.dan[1];
if (rentSarahDavid>rentDan) {
    building.numberOfRoomsAndRent.dan[1]+=200
    console.log(`Sum of Sarah\'s and David\'s rent is ${rentSarahDavid} and is bigger than Dan\'s rent which equals ${rentDan}`);
    console.log(`Now Dan\'s rent has been increased up to ${building.numberOfRoomsAndRent.dan[1]}`);
};


