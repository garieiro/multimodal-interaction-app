import React, { useEffect, useState } from 'react'
import { fetchCountForAllEventTypesFromAPI } from '../../api/StaticData'
import BarChart from '../charts/BarChart'

const EventTypePage = () => {
  const [staticEventType, setStaticEventType] = useState([])

  useEffect(() => {
    const fetchstaticEventType = async () => {
      try {
        const fetchedStaticDataTest = await fetchCountForAllEventTypesFromAPI()
        setStaticEventType(fetchedStaticDataTest)
      } catch (error) {}
    }

    fetchstaticEventType()
  }, [])

  return (
    <React.Fragment>
      <div className="pages-container">
        <div className="pages-text">
          <h1>Event Types Count</h1>
        </div>
        <BarChart data={staticEventType} />
      </div>
    </React.Fragment>
  )
}

export default EventTypePage
