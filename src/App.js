import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BubbleChartPage from './components/staticData/BubbleChartPage'
import MainPage from './components/mainPage/MainPage'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import SunburstChartPage from './components/staticData/SunburstChartPage'
import TypePage from './components/staticData/TypePage'
import EventTypePage from './components/staticData/EventTypePage'
import OverviewPage from './components/staticData/OverviewPage'
import WordCloudPage from './components/staticData/WordCloudPage'
import ExperiencePage from './components/staticData/ExperiencePage'

function App() {
  return (
    <Suspense fallback={<h1>Aguarda um pouco </h1>}>
      <Router>
        <div className="app-container">
          <NavBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/wordcloud" element={<WordCloudPage />} />
            <Route path="/types" element={<TypePage />} />
            <Route path="/eventTypes" element={<EventTypePage />} />
            <Route path="/trial" element={<BubbleChartPage />} />
            <Route path="/bubble" element={<BubbleChartPage />} />
            <Route path="/sunburst" element={<SunburstChartPage />} />
            <Route path="/experience/:id" element={<ExperiencePage />} />
          </Routes>
        </div>
      </Router>
    </Suspense>
  )
}

export default App
