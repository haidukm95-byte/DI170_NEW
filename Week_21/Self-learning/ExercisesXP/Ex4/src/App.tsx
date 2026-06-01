/* 
Exercise 4: Type Assertions with Union Types

Task

Create a function getFirstElement that takes an array of number | string and uses type assertions to return 
the first element as a string. Test with arrays of mixed types.
*/
import './App.css'

function App() {

  const arr1: (number | string)[]=[232, 'abc', 3434, 'dfsfs', 'ewrfw', 1324];
  const arr2: (number | string)[]=['adsfsd', 'sd', 256465, 5645];

  const getFirstElement=(arr: (number | string)[])=>{
    return String(arr[0])
  }

  return (
    <>
      <p>{getFirstElement(arr1)}</p>
      <p>Length: {getFirstElement(arr1).length}</p>
      <p>{getFirstElement(arr2)}</p>
      <p>Lenght: {getFirstElement(arr2).length}</p>
    </>
  )
}

export default App
