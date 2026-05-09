import {useContext} from "react";
import { CounterContext } from "../App";

export default function CounterButton() {
    const {setCount} = useContext(CounterContext)
  return (
    <div>
      <button onClick={() => setCount((a) => a + 1)}> + </button>
    </div>
  );
}
