import { useState } from 'react';
import './Event.css'

function Event() { 
    const clickMe = () => {
        alert("I was clicked");
    };
    const handleKeyDown = (e) => {
        if (e.key !== 'Enter') return;
        alert(`The Enter key was pressed, your input is: ${e.target.value}`);
    };
    const [isToggleOn, setIsToggleOn] = useState(true);
    const handleToggle = () => {
        const next = !isToggleOn;
        setIsToggleOn(next);
        if (next === true) alert("Exercise 9 is on");
        if (next === false) alert("Exercise 9 is off");
    };
    return (
        <>
            <div className='event-window'>
                <button id='event-window-button' type='button' onClick={clickMe}>Click Me!</button>
                <br />
                <input id='event-window-input' type='text' placeholder='Press the ENTER key!' onKeyDown={handleKeyDown}></input>
                <br />
                <button id='event-window-onoff' type="button" onClick={handleToggle}>{isToggleOn ? 'OFF' : 'ON'}</button>
            </div>
        </>
    )
}

export default Event;