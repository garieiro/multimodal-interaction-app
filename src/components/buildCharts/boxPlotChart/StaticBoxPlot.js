import React, { useEffect, useState } from 'react'
import BoxPlot from '../../charts/BoxPlot'
import { fetchBoxPlotFromAPI } from '../../../api/StaticData'

const StaticBoxPlot = ({ data }) => {
  const [boxPlotData, setBoxPlotData] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const fetchWordCloud = async () => {
      try {
        let fetchedBoxPlotData = []
        if (data) {
          console.log('DataBox:', data)
          fetchedBoxPlotData = data
        } else {
          fetchedBoxPlotData = await fetchBoxPlotFromAPI()
          console.log('DataBox:', fetchedBoxPlotData)
        }
        setBoxPlotData(fetchedBoxPlotData)
        setDataLoaded(true)
      } catch (error) {
        console.error('Error fetching BoxPlot data:', error)
      }
    }

    fetchWordCloud().catch((error) =>
      console.error('Error fetching BoxPlot data:', error)
    )
  }, [data])

  return dataLoaded && <BoxPlot data={boxPlotData} />
}

export default StaticBoxPlot
