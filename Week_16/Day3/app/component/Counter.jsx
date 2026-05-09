import { useState, useEffect } from "react";

//useRef / createContext => useContext / useReducer

export default function Counter({ num }) {
    //let x = 0;
    const [x, setX] = useState(10);

    useEffect(() => { // IS USED FOR UPDATES SIDE EFFECTS (e.g. to raise alert when reaching some dedicated count)
        if (x == 30) { 
            alert('x is 30!');
            setX(0);
        }
        console.log('render x=>', x)

    },[x, num])
    const add = () => {
        setX((x) => x + 1)
        setX((x) => x + 1)
        setX((x)=> x + 1)
    };

    return (
        <div>
            <h2>Count - {x}</h2>
            <button onClick={()=> add()}> + </button>
        </div>
    )
}

