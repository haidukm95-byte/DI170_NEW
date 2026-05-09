import { useState, useEffect} from 'react'
import './App.css'
import Counter from '../component/Counter'

function App() {
  const [num, setNum] = useState(21)

  return (
    <div>
      <h2>Review on: UseState / UseEffect</h2>
      <Counter num={num} />
      <button onClick={()=>setNum(num+1)}> add to num</button>
    </div>
  )
}

export default App
