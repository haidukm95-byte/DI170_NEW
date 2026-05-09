import {useContext} from "react";
import CounterDisplay from "./CounterDisplay";
import CounterButton from "./CounterButton";

import { CounterContext } from "../App";

export default function Counter() {
  //   const { count, setCount } = props;
  const {title} = useContext(CounterContext)
  return (
    <div>
        <h2>{title}</h2>
      <CounterDisplay />
      <CounterButton />
    </div>
  );
}
