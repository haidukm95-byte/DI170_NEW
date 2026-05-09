import React from "react";

const Car = (props) => {
    const { chosenCar, nameChosenCar } = props;

    // a function to make the website more userfriendly
    const checkCars = () => {
        if (chosenCar.length > 1) {
            return `Here are all the ${nameChosenCar} cars available in the shop`
        } else if (chosenCar.length === 1) {
            return `Here is the only ${nameChosenCar} car available in the shop`
        } else if (chosenCar.length === 0) {
            return `No ${nameChosenCar} car currently available in the shop`
        }
    }

    return (
        <div>
            <h1>{checkCars()}</h1>
            {
                chosenCar.map(item => (
                    <ul key={item.id}>
                        <li>Brand : {item.brand}</li>
                        <li>Name : {item.name}</li>
                        <li>Year of creation : {item.year}</li>
                        <li>Origin : {item.origin}</li>
                    </ul>
                ))
            }
        </div>
    )
}


export default Car;