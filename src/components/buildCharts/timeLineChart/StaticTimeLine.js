import TimelineChart from '../../charts/TimeLineChart'
import React, { useEffect, useState } from 'react'
import { fetchStaticTimeLineFromAPI } from '../../../api/StaticData'
import { Button } from 'react-bootstrap'

const StaticTimeLine = ({
  onDataReceived,
  onWordDataReceived,
  data,
  onEventTypeColor,
  onExpDataReceived,
  onExpLabelReceived,
}) => {
  const [timesData, setTimesData] = useState([])
  const [initialData, setInitialData] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [eventColor, setEventColor] = useState({})
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const fetchTimeLine = async () => {
      try {
        let fetchTimeLineData = []
        if (data) {
          fetchTimeLineData = data
        } else {
          fetchTimeLineData = await fetchStaticTimeLineFromAPI()
          setInitialData(fetchTimeLineData)
        }
        setEventColor(onEventTypeColor)
        setTimesData(fetchTimeLineData)
        setDataLoaded(true)
      } catch (error) {
        console.error('Error fetching TimeLine data:', error)
      }
    }
    fetchTimeLine().catch((error) =>
      console.error('Error fetching TimeLine data:', error)
    )
  }, [data, onEventTypeColor])

  const handleLabelClick = async (label) => {
    const experienceIdMatch = label.match(/\d+/)
    const experienceId = experienceIdMatch ? experienceIdMatch[0] : null
    console.log('Label:', label)
    if (experienceId) {
      const fetchedData = await fetchStaticTimeLineFromAPI(experienceId)
      setTimesData(fetchedData)
      onExpLabelReceived(label)
      setDataLoaded(true)
      if (label) setShowButton(true)
    } else {
      console.error(
        'Erro: Não foi possível extrair o ID da experiência da label:',
        label
      )
    }
  }

  const resetToInitialData = () => {
    setTimesData(initialData)
    setEventColor('')
    setShowButton(false)
  }
  console.log('Show:', showButton)
  return (
    <div>
      {dataLoaded && (
        <TimelineChart
          data={timesData}
          eventColor={eventColor}
          handleLabelClick={handleLabelClick}
          onDataReceived={onDataReceived}
          onExpDataReceived={onExpDataReceived}
          onWordDataReceived={onWordDataReceived}
        />
      )}
      {showButton && (
        <Button
          onClick={resetToInitialData}
          className="btn btn-dark"
          style={{ marginTop: '20px', display: 'block', width: 'max-content' }}
        >
          Back
        </Button>
      )}
    </div>
  )
}

export default StaticTimeLine
