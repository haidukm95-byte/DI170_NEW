import { useState } from 'react'
import './App.css'
import Counter from './features/counter/Counter'
import { useSelector, useDispatch} from 'react-redux';
import { useRef } from 'react';
import { addTask } from './redux/actions';

function App() {
  const tasks = useSelector(state => state.counter.tasks)
  console.log("tasks=>", tasks)
  const taskRef = useRef()
  
  const dispatch=useDispatch()

  const addNewTask = () => { 
    const value = taskRef.current.value
    dispatch(addTask(value))
  }
  return (
    <>
      <h2>React + Redux</h2>
      <Counter />
      <div>
        <input ref={ taskRef} placeholder='add task...' />
        <button onClick={addNewTask}>add task</button>
      </div>
      { 
        tasks && tasks.map(item => { 
          return <div>
            {item.name}
            <button> V </button>
            <button> X </button>
          </div>
        })
      }
    </>
  )
}

export default App
