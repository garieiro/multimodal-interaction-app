import React, { useEffect, useState } from 'react'
import TimelineChart from '../charts/TimeLineChart'

const SunburstChartPage = () => {
  const [staticData, setStaticData] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  const data = [
    { '1st trial': 8.0 },
    { '2nd trial': 6.0 },
    { '3rd trial': 6.0 },
    { '3rd trial': 6.0 },
    { '3rd trial': 6.0 },
    { '3rd trial': 6.0 },
  ]

  return (
    <React.Fragment>
      <div className="pages-container">
        <div className="pages-text">
          <h1>Sunburst Chart</h1>
          {dataLoaded && <TimelineChart data={data} />}
        </div>
      </div>
    </React.Fragment>
  )
}

export default SunburstChartPage
