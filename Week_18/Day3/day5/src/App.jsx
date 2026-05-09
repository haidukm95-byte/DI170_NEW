import { useState, useReducer, useRef } from "react";
import "./App.css";

/**
 *
 * const [state, dispatch] = useReducer(reducerFunction, initialState)
 */
const initialState = {
  count: 10,
  a: 5,
};

const counterReducer = (state, action) => {
  console.log("action=>", action);
  if (action.type === "increment") return { ...state, count: state.count + 1 };
  else if (action.type === "decrement")
    return { ...state, count: state.count - 1 };
  else if (action.type === "addInputValue")
    return { ...state, count: state.count + Number(action.payload.num)+ Number(action.payload.num2)};
  return state;
};

function App() {
  const [count, setCount] = useState(0);
  const [countState, dispatch] = useReducer(counterReducer, initialState);

  const numRef = useRef();
  const num2Ref = useRef();

  return (
    <>
      <div>
        <h2>createContext + useContext / useRef / useReducer</h2>
        <button onClick={() => setCount(count + 1)}>Count {count}</button>
      </div>
      <div>
        <h2>Count Reducer = {countState.count}</h2>
        <button onClick={() => dispatch({ type: "increment" })}> + </button>
        <button onClick={() => dispatch({ type: "decrement" })}> - </button>
        <div>
          <input ref={numRef} />
          <input ref={num2Ref} />
          <button
            onClick={() =>
              dispatch({
                type: "addInputValue",
                payload: {
                  num: numRef.current.value,
                  num2: num2Ref.current.value,
                },
              })
            }
          >
            Add the input Value
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
