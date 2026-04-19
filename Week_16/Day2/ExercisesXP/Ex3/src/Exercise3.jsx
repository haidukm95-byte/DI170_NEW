import { Component } from "react";

const style_header = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial"
};

class Exercise extends Component {
  render() {
      return (
        <div>
        <h1 style={style_header}>
          Hello World
        </h1>

        <p>This is a paragraph.</p>

        <a href="https://google.com">Click me</a>

        <form>
          <input type="text" placeholder="Your name" />
          <button type="submit">Submit</button>
        </form>

          <img src="https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png" alt="React Logo" style={{maxWidth: "40%", height: "auto"}}/>

        <ul>
          <li>Item one</li>
          <li>Item two</li>
          <li>Item three</li>
        </ul>
      </div>
    );
  }
}

export default Exercise;
