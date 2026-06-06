import { useState } from "react";

type Action = "increment" | "decrement" | null;

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  const [action, setAction] = useState<Action>(null);

  const incr=():void=>{
    setCount((prev)=>prev+1);
    setAction('increment')
  };

  const decr=():void=>{
    setCount((prev)=>prev-1);
    setAction('decrement')
  };

const lastAction: Action=action

   return(
    <div>
        <h2>Count: {count}</h2>
        <button onClick={incr}> + </button>
        <button onClick={decr}> - </button>
        {lastAction && <p>Last action: {lastAction}</p>}
    </div>
   )
};

export default Counter;
