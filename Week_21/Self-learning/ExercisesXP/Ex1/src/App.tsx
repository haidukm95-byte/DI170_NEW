/* 
Exercise 1: Intersection Types

Task

Define an intersection type PersonWithAddress that combines Person and Address types. 
Create a variable of this type with properties from both types.
The Person type should contain name and age, the Address type should contain street and city
*/

import './App.css'
import { user1 } from './components/Person';

function App() {

  return (
    <>
      <div>
        <h2>Users list:</h2>
        <div>
          <p>Name: {user1.name}</p>
          <p>Age: {user1.age}</p>
          <p>Street: {user1.street}</p>
          <p>City: {user1.city}</p>
        </div>
      </div>
    </>
  )
}

export default App
