import { useState } from "react";
import Garage from "./Garage";

function Car({ name, model }) {
    const [color, setColor] = useState("red");
    return (
        <>
            <Garage/>
            <h1>This car is a {color} {name} {model}</h1>
        </>
    )
    }


export default Car;
