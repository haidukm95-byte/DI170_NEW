import { useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, addInputValue } from "../../redux/actions";
import { MINUS } from "../../redux/actions";

export default function Counter() { 
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch();
    const inputRef = useRef();
    return (
        <>
            <h2>Count: {count}</h2>
            <button onClick={() => dispatch(increment())}> + </button>
            <button onClick={() => dispatch({ type: MINUS })}> - </button>
            <div>
                <input ref={ inputRef} />
                <button onClick={()=>dispatch(addInputValue(inputRef.current.value))} >Add input value</button>
            </div>
        </>
    )
}