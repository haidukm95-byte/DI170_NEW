/* 
Exercise 2: Type Guards with Union Types
Task

Create a function describeValue that accepts number | string. Use type guards to return a description 
based on the input type:

    "This is a number" for numbers.
    "This is a string" for strings.

*/
import { useState, useRef } from 'react';
import './App.css'

function describeValue(value: number | string): string {
    if (typeof value==="number") return 'This is a number';
    return 'This is a string';
}

function App() {
  const inputRef=useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState<string | null>(null);

  const handleClick=()=>{
    const raw=inputRef.current?.value ?? '';
    const parsed=Number(raw);
    const value = isNaN(parsed) ? raw : parsed;
    setDescription(describeValue(value))
  }
  return (
    <div>
      <input ref={inputRef} type='text' placeholder='Enter your value here...'/>
      <button onClick={handleClick}>Describe your value!</button>
      {description && <p>{description}</p>}
    </div>
  )
}

export default App
