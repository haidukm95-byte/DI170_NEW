import './App.css'
import Car from './Components/Car';

const carinfo = {name: "Ford", model: "Mustang"};

function App() {
  return <Car name={carinfo.name} model={carinfo.model}/>
}

export default App
