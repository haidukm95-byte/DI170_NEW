import { useState } from "react";
import './Phone.css'

//brand, model, color, year


function Phone() { 
    const [brand, setBrand] = useState("Samsung");
    const [model, setModel] = useState("Galaxy S20");
    const [color, setColor] = useState("black");
    const [year, setYear] = useState("2020");

    const changeColor = () => {
        setColor("blue");
    }

    return (
        <div>
            <h1>My phone is {brand}</h1>
            <br/>
            <h2>It is a {color} {model} from {year}</h2>
            <button id='change-color' type="button" onClick={changeColor}>Change color!</button>
        </div>
    )
}

export default Phone;