import React from 'react';
import './BuggyCounter.css';

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  }

  render() {
    if (this.state.counter === 5) {
      throw new Error('I crashed!');
    }
    return (
      <div className='counter-container'>
        <p onClick={this.handleClick}>{this.state.counter}</p>
      </div>
    );
  }
}

export default BuggyCounter;
