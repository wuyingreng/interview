

import EventDemo from './components/baseUse/EventDemo'
import EventOrder from './components/baseUse/EventOrder'
import './App.css'
import { ErrorBoundary } from './components/baseUse/ErrorBoundary'
import ErrorCom from './components/baseUse/ErrorCom'

function App() {
  return (
    <>
      <EventOrder />
      <br />
      <ErrorBoundary>
        <ErrorCom />
      </ErrorBoundary>
      <br />
      <EventDemo />

    </>
  )
}

export default App
