/* 
Exercise 5: Generic Constraints

Create a generic function logLength that takes a parameter of type T constrained to types with a length property 
(like string or Array). The function should log the length.
*/

import './App.css'

function App() {

  function logLength<T extends { length: number }>(value: T): void {
    console.log(value.length);
  }

  logLength("hello");        // logs 5
  logLength([1, 2, 3]);      // logs 3
  logLength(["a", "b"]);     // logs 2

  return (
    <>

    </>
  )
}

export default App
