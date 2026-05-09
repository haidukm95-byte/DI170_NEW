import {useContext} from "react";
import { CounterContext } from "../App";


export default function CounterDisplay() {
    const {count} = useContext(CounterContext)
  return (
    <div>
      <h2>Count = {count}</h2>
    </div>
  );
}
