//Exercise 4 : Vacations Costs
//Instructions
//Let’s create functions that calculate your vacation’s costs:
//Define a function called hotelCost().
    //    It should ask the user for the number of nights they would like to 
    // stay in the hotel.
    //    If the user doesn’t answer or if the answer is not a number, ask 
    // again.
    //    The hotel costs $140 per night. The function should return the 
    // total price of the hotel.

function hotelCost() {
    let nightsNumber = '';
    while (nightsNumber === '' || nightsNumber === null || isNaN(nightsNumber)) {
        nightsNumber=prompt('How many nights are you going to spend in the hotel?')
    }
    let costPerNight=140;
    let totalCost=costPerNight*nightsNumber;
    alert(`The total cost of the hotel for ${nightsNumber} nights is $${totalCost}`)
    return totalCost
}

    //Define a function called planeRideCost().
     //   It should ask the user for their destination.
     //   If the user doesn’t answer or if the answer is not a string, 
     // ask again.
     //   The function should return a different price depending on the location.
      //      “London”: 183$
       //     “Paris” : 220$
        //    All other destination : 300$
function planeRideCost() {
    let destination = '';
    while (destination === '' || destination === null) {
        destination=prompt('What is your destination?')
    }
    let flightTicketPrice=null;
    if (destination=='London') {
        flightTicketPrice=183;
    }
    else if (destination=='Paris') {
        flightTicketPrice=220
    }
    else {
        flightTicketPrice=300
    }
    alert(`The cost of the flight ticket to ${destination} is $${flightTicketPrice}`)
    return flightTicketPrice
}


    

    //Define a function called rentalCarCost().
      //  It should ask the user for the number of days they would like to rent the car.
      //  If the user doesn’t answer or if the answer is not a number, ask again.
      //  Calculate the cost to rent the car. The car costs $40 everyday.
      //      If the user rents a car for more than 10 days, they get a 5% discount.
      //  The function should return the total price of the car rental.
function rentalCarCost(){
    let daysNumber=''
    while (daysNumber === '' || daysNumber === null || isNaN(daysNumber)) {
        daysNumber=prompt('For how many days are you going to rent a car?')
    }
    let costRentalPerDay=40;
    let totalCarRentalCost=daysNumber*costRentalPerDay;
    if (daysNumber>10){
        totalCarRentalCost-=totalCarRentalCost*0.05;
    }
    alert(`The total price of the car rental for ${daysNumber} days is $${totalCarRentalCost}.`)
    return totalCarRentalCost
}


    //Define a function called totalVacationCost() that returns the total cost of the user’s 
    //  vacation by calling the 3 functions that you created above.
    //Example : The car cost: $x, the hotel cost: $y, the plane tickets cost: $z.
    //Hint: You have to call the functions hotelCost(), planeRideCost() and rentalCarCost() inside 
    //  the function totalVacationCost().
    function totalVacationCost(){
        let hotel=hotelCost()
        let plane=planeRideCost()
        let car=rentalCarCost()
        alert(`Total vacation cost is $${hotel + plane + car}`)
    }


//    Call the function totalVacationCost()
totalVacationCost()

