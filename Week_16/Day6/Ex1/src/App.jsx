import React from 'react'
import './App.css'
import Count from './components/BuggyCounter'
import ErrorBoundary from './components/Error'

function App() {

  return (
    <div id='main'>
      <div className='headline'>
        <p>
          Click on the numbers to increase the counters.<br/>
          The counter is programmed to throw error when it reaches 5. This simulates a JavaScript error in a component.
        </p>
      </div>
      <div className='counter-wrapper'>
        <p>
          These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.
        </p>
        <ErrorBoundary>
          <Count />
          <Count />
        </ErrorBoundary>
      </div>
      <hr />
      <div className='counter-wrapper'>
        <p>
          These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.
        </p>
        <ErrorBoundary>
          <Count />
        </ErrorBoundary>
        <ErrorBoundary>
          <Count />
        </ErrorBoundary>
      </div>
      <hr />
      <div className='counter-wrapper'>
        <p>
          This counter is not inside of boundary. So if crashes, all other components are deleted.
        </p>
        <Count />
        <Count />
      </div>
    </div>
  )
}

export default App
