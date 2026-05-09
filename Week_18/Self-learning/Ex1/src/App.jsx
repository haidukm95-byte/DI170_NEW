import { useState } from 'react'
import './App.css'
import { useSelector, useDispatch} from 'react-redux';
import { useRef } from 'react';
import Todo from './features/Todo';

function App() {

  return (
    <>
      <Todo/>
    </>
  )
}

export default App
