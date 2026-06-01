/* 
Exercise 3: Type Casting

Task

Create a variable someValue of type any and cast it to a string. Then, use it as a string.
*/
import './App.css'

function App() {
  let someValue: any="Hello, Typescript!";
  let someText=someValue as string;

  return (
    <>
      <p>{someText}</p>
      <p>{someText.toUpperCase()}</p>
      <p>Lenght: {someText.length}</p>
    </>
  )
}

export default App
