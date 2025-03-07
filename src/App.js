import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from './components/mainPage/MainPage'
import './App.css'
import OverviewPage from './components/staticData/OverviewPage'

function App() {
  return (
    <Suspense fallback={<h1>Loading Some Data... </h1>}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/overview" element={<OverviewPage />} />
          </Routes>
        </div>
      </Router>
    </Suspense>
  )
}

export default App
