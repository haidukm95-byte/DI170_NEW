import { useState, createContext, useRef } from "react";
import "./App.css";
import Counter from "./components/Counter";

/**
 * createContext => export - to use in diffrent components
 * wrap a component/s
 * value={{count, setCount}}
 * useContext ->
 */

export const CounterContext = createContext();
// export const UsersContext = createContext();

function App() {
  const [count, setCount] = useState(0);

  const valRef = useRef(11);
  // console.log("valRef=>", valRef);

  const h2Ref = useRef();
  const inputRef = useRef()

  let x = 10;
  // console.log("x=>", x);

  const handleClick = () => {
    // valRef.current++;
    // console.log("valRef=>", valRef);

    // x++;
    // console.log("x=>", x);

    // console.log(h2Ref);
    // h2Ref.current.style.backgroundColor = "yellow";

    console.log(inputRef.current.value);
    
  };

  return (
    <>
      <section id='center'>
        <h2 ref={h2Ref}>createContext + useContext / useRef / useReducer</h2>
        <button onClick={() => setCount(count + 1)}>Count {count}</button>
        {/* <CounterContext.Provider value={{ count, setCount, title: "My Counter" }}>
          <Counter />
        </CounterContext.Provider> */}
        {/* <h2>valRef= {valRef.current}</h2>
        <h2>x = {x}</h2>
        <button onClick={handleClick}>Chanage Ref</button>
        <div>
          <input ref={inputRef}/>
        </div> */}
      </section>
    </>
  );
}

export default App;

/**
 * App  => state
 *  |__ Counter
 *      |_CounterDisplay => count
 *      |_CounterButton => setCount
 */
