import React from 'react'
import StaticData from './components/staticData/StaticData'
import './App.css'
import RealTimeData from './components/realTimeData/RealTimeData'

function App() {
  return (
    <div>
      <StaticData />
      <RealTimeData/>
    </div>
  )
}

export default App
