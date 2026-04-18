import "./App.css";
// import Hello from "./Hello";
import User from "./components/User";
// uuid

const users = [
  { id: 1, name: "John", email: "jjj@gmail.com" },
  { id: 2, name: "Anne", email: "aaa@gmail.com" },
  { id: 3, name: "Dan", email: "ddd@gmail.com" },
];

function App() {
  return (
    <>
      <div>
        {users.map((item, idx) => {
          return <User name={item.name} email={item.email} key={idx} />;
        })}
        {/* <Hello title="Title 1" subtitle="sub 1"/>
        <Hello title="Title 2" subtitle="sub 2"/>
        <Hello title="Title 3"/> */}
      </div>
    </>
  );
}

export default App;
