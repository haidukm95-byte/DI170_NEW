import React from "react"
import './App.css'
import './index.css'

export default function App() {
  const myelement = <h1>I Love JSX!</h1>;
  const sum = 5 + 5;
  return (
    <div>
      <p>Hello World!</p>
      {myelement}
      <h2>{`React is ${sum} times better with JSX`}</h2>
    </div>
  )
}


