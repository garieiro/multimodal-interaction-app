import React, { useEffect, useState } from 'react'
import { fetchSunBurstFromAPI } from '../../../api/StaticData'
import SunBurst from '../../charts/SunBurst'

const StaticSunBurst = ({
  onDataReceived,
  onWordDataReceived,
  onTimeLineDataReceived,
  onEventTypeColor,
  data,
  timeLabel,
  selectedDataset,
}) => {
  const [sunBurstData, setSunBurstData] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const fetchSunBurst = async () => {
      try {
        const fetchSunBurstData = await fetchSunBurstFromAPI(selectedDataset)
        setSunBurstData(fetchSunBurstData)
        setDataLoaded(true)
      } catch (error) {
        console.error('Failed to fetch SunBurst data:', error)
      }
    }
    fetchSunBurst().catch((error) =>
      console.error('Error fetching SunBurst data:', error)
    )
  }, [data, selectedDataset])

  return (
    dataLoaded && (
      <SunBurst
        data={sunBurstData}
        timeLabel={timeLabel}
        onDataReceived={onDataReceived}
        onWordDataReceived={onWordDataReceived}
        onTimeLineDataReceived={onTimeLineDataReceived}
        onEventTypeColor={onEventTypeColor}
      />
    )
  )
}

export default StaticSunBurst
