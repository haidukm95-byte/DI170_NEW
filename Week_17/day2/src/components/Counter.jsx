import { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [countObj, setCountObj] = useState({ count: 1 });

  useEffect(()=>{
    return () => alert('please do not remove me !!!!')
  },[])

  const increment = () => {
    setCount((a) => a + 1);
    setCount((prev) => prev + 1);
    setCount((count) => count + 1);
  };

  const incrementCountObj =() => {
    // const newObj = {...countObj}
    // newObj.count++
    // console.log(countObj);
    // setCountObj(newObj)
    setCountObj({...countObj, count: countObj.count + 1})
  }
   return (
    <>
      <div>
        <h2>Counter: {count}</h2>
        <button onClick={increment}> + </button>
        <button onClick={() => setCount(count - 1)}> - </button>
      </div>
      <div>
        <h2>CounterObj: {countObj.count}</h2>
        <button onClick={incrementCountObj}> + </button>
      </div>
    </>
  );
}
