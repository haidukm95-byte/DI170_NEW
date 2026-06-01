/* 
Exercise 7: Type Assertions and Generic Constraints

Task

Create a generic function formatInput that takes a parameter of type T constrained to have a toString() method. 
Use type assertions to ensure the parameter is treated as a string for formatting. The function should format 
the input as a string.
*/

import './App.css'
import { useRef, useState } from 'react';

function App() {
  const inputRef=useRef<HTMLInputElement>(null);
  const [format, setFormat] = useState<string | null>(null);

  function formatInput<T extends {toString(): string}>(value: T): string{
    return value.toString()
  }

  const handleClick=()=>{
    const raw=inputRef.current?.value ?? '';
    const parsed=Number(raw);
    const value = isNaN(parsed) ? raw : parsed;
    setFormat(formatInput(value))
  }

  return (
    <div>
      <input ref={inputRef} type='text' placeholder='Enter your input here...'/>
      <button onClick={handleClick}>Format as a string</button>
      {format?.toUpperCase() && <p>{format.toUpperCase()}</p>}
    </div>
  )
}

export default App
