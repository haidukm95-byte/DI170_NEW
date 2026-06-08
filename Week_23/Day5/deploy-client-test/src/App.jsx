import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const URL = import.meta.env.VITE_API_SERVER_URL;
console.log(URL);

function App() {
  const [name, setName] = useState("");
  const [header, setHeader] = useState("Welcome");

  // useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch(`${URL}/me/${name}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.msg);
        setHeader(data.msg);
      });
  };

  return (
    <>
      <input onChange={(e) => setName(e.target.value)} />
      <h1>{header}</h1>
      <button onClick={() => fetchData()}>Click</button>
    </>
  );
}

export default App;
