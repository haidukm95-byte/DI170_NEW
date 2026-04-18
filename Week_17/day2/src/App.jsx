import { useState, useEffect } from "react";
import "./App.css";
import Counter from "./components/Counter";

function App() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log("hi");
    // getUsers()
  }, []);

  // let users = [];

  // console.log(a);
  // console.log(b);

  const handleInput = (e) => {
    console.log(e.target.value);
  };

  const handleClick = (e) => {
    console.log(e);

    alert("hi from button click");
  };
  const getUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        // users = data;
        setUsers(data);
        // console.log(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h2>Events / ReRender / Side Effect / more...</h2>
      <div>
        <button onClick={() => setShow(!show)}>Show Counter</button>
      </div>
      <div>
        <input onChange={(e) => handleInput(e)} />
        <button onClick={(e) => handleClick(e)}>Click me!</button>
      </div>
      <div>
        <button onClick={getUsers}>Get Useres Data</button>
        {users.map((item) => {
          return (
            <div key={item.id}>
              Name: {item.name} {item.email}
            </div>
          );
        })}
      </div>
      {show ? <Counter /> : null}
    </>
  );
}

export default App;
