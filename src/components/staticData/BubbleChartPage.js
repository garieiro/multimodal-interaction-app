import React, { useEffect, useState } from 'react'
import BubbleChart from '../charts/BubbleChart'
import EventDuration from './utils/EventDuration'
import { fetchAllStaticDataFromAPI } from '../../api/StaticData'
import PieChart from '../charts/PieChart'

const BubbleChartPage = () => {
  const [staticData, setStaticData] = useState([])
  //const [pieData, setPieData] = useState({ errors: {}, semantic: {} })

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const fetchedStaticData = await fetchAllStaticDataFromAPI()
        setStaticData(fetchedStaticData)
      } catch (error) {}
    }

    fetchStaticData()
  }, [])

  const pieData = {
    errors: {
      error1: 10,
      error2: 20,
      error3: 5,
    },
    semantic: {
      semantic1: 15,
      semantic2: 25,
      semantic3: 8,
    },
  }

  const eventDurations = EventDuration(staticData)

  return (
    <React.Fragment>
      <div className="pages-container">
        <div className="pages-text">
          <h1>Bubble Chart</h1>
          <BubbleChart data={eventDurations} />
        </div>
        <div className="pages-text">
          <h1>Pie Chart</h1>
          <PieChart data={pieData} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default BubbleChartPage
