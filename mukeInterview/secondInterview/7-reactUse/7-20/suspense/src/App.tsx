import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const Home = lazy(() => import('./components/advancedUse'));

import './App.css'

function App() {
  return (
    <Router>
      <Suspense fallback={<div>home Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
