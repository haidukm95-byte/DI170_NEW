import { useState } from 'react'
import Phone from './Components/Phone'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Phone/>
    </>
  )
}

export default App
