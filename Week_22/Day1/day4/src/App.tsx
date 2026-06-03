import './App.css'
import Heading from './components/Heading'
import Section from './components/Section'
import List from './List'

import { useState, useRef, useEffect, useEffectEvent, createContext, useContext, type ChangeEvent, type ChangeEventHandler, type MouseEvent, type KeyboardEvent } from 'react';
type User={
  id: number;
  name: string;
  email?: string;
}
type Auth = {
  token: string;
  userid: string;
}

export const AuthContext=createContext<Auth | null>(null)

function App() {
  const [count, setCount] = useState<number>(0); //generic type is optional here
  const [users, setUsers] = useState<User[]>([{id: 1, name: 'aaa', email: 'aaa@gmail.com',}]);

  const inputRef=useRef<HTMLInputElement>(null);
  const strRef=useRef<string>('abcdefgh');

  const test=useEffectEvent(()=>{

  })

  useEffect(()=>{
    test()
  }, [])

  const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.value);
  }

  const handleChangeHandler: ChangeEventHandler<HTMLInputElement>=(e)=>{
    console.log(e.target.value);
  }

  const handleClick=(e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>)=>{
    console.log(e.target)
  }

  return (
    <>
      <input ref={inputRef} onChange={(e)=>handleChange(e)}/>
      <button onClick={(e)=>handleClick(e)}>CLICK</button>
      <section id="center">
        <h2>Typescript+React</h2>
        <Heading title={"My Title"} subtitle={"My subtitle"} body={"my body"}/>
      </section>
      <Section admin={"John"}>
        Simple JSX component
        <h2>one more element</h2>
      </Section>
      <List items={['a','b','c']}/>
      
    </>
  )
}

export default App
