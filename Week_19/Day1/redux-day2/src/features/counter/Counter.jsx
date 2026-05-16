import { useRef}  from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment,  decrement, addValue, substractValue} from './counterSlice'

export default function Counter() {
    const count = useSelector((state) => state.counterReducer.count)
    const test = useSelector((state) => state.counterReducer.test)

    const dispatch = useDispatch();
    const inputRef = useRef();

    const delayBy5Sec = () => { 
        setTimeout(() => { 
            dispatch(increment());
        }, 5*1000)
    }
}
    return (
        <div>
            <button onClick={()=>delayBy5Sec()}>Add After 5 Sec</button>
            <h2>Count = {count}{" "}</h2>
            <button onClick={() => dispatch(increment())}> + </button>
            <button onClick={() => dispatch(decrement())}> - </button>
            <div>
                <input ref={ inputRef} /><br/>
                <button onClick={() => dispatch(addValue(Number(inputRef.current.value)))}>Add input value</button><br/>
                <button onClick={()=>dispatch(substractValue(Number(inputRef.current.value)))}>Substract input value</button>
            </div>
        </div>
    )