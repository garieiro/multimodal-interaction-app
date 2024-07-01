import React, { useState } from 'react'
import '../styles.css'
import ChooseCharts from '../chooseCharts/ChooseCharts'
import ChooseDataset from '../chooseDataset/ChooseDataset'

const OverviewPage = () => {
  const [boxPlotData, setBoxPlotData] = useState({})
  const [wordCloudData, setWordCloudData] = useState({})
  const [timeLineData, setTimeLineData] = useState({})
  const [sunburstData, setSunburstData] = useState({})
  const [sunburstLabel, setSunburstLabel] = useState({})
  const [eventTypeColor, setEventTypeColor] = useState({})

  const handleDataReceived = (data) => {
    console.log('Dados recebidos:', data)
    setBoxPlotData(data)
  }

  const handleWordDataReceived = (data) => {
    setWordCloudData(data)
  }

  const handleTimeLineDataReceived = (data) => {
    setTimeLineData(data)
  }

  const handleEventTypeColor = (data) => {
    setEventTypeColor(data)
  }

  const handleSunburstDataReceived = (data) => {
    setSunburstData(data)
  }

  const handleSunburstLabelReceived = (data) => {
    setSunburstLabel(data)
  }

  return (
    <div className="container-fluid" style={{ paddingTop: '20px' }}>
      <div className="row">
        <div className="col-md-8">
          <div
            className="first-div"
            style={{
              padding: '30px',
              marginBottom: '20px',
              background: '#4D5859',
            }}
          >
            <ChooseCharts
              title={'TimeLine'}
              activeLabel={'TimeLine'}
              showTimeline
              boxPlotData={boxPlotData}
              wordCloudData={wordCloudData}
              timeLineData={timeLineData}
              sunburstData={sunburstData}
              sunburstLabel={sunburstLabel}
              eventTypeColor={eventTypeColor}
              onDataReceived={handleDataReceived}
              onWordDataReceived={handleWordDataReceived}
              onTimeLineDataReceived={handleTimeLineDataReceived}
              onEventTypeColor={handleEventTypeColor}
              onSunburstDataReceived={handleSunburstDataReceived}
              onSunburstLabelReceived={handleSunburstLabelReceived}
            />
          </div>
        </div>
        <div
          className="col-md-4"
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <div className="flex-column">
            <div className="d-flex justify-content-between">
              <div
                className="first-div"
                style={{
                  width: '100%',
                  height: '100px',
                  padding: '30px',
                  marginInline: '10px',
                  marginBottom: '20px',
                  background: '#4D5859',
                }}
              >
                <ChooseDataset title={'Your dataset is: '} />
              </div>
            </div>
            <div
              className="first-div"
              style={{
                width: '100%',
                background: '#4D5859',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                height: '380px',
                marginTop: '20px',
              }}
            >
              <h2>
                Pensar o que poderei colocar aqui! Talvez informação dos
                participantes!
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <div className="col-md-4">
          <div
            className="first-div"
            style={{
              padding: '30px',
              marginBottom: '20px',
              background: '#4D5859',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <ChooseCharts
              title={'SunBurst'}
              activeLabel={'SunBurst'}
              showChart
              boxPlotData={boxPlotData}
              wordCloudData={wordCloudData}
              timeLineData={timeLineData}
              sunburstData={sunburstData}
              sunburstLabel={sunburstLabel}
              eventTypeColor={eventTypeColor}
              onDataReceived={handleDataReceived}
              onWordDataReceived={handleWordDataReceived}
              onTimeLineDataReceived={handleTimeLineDataReceived}
              onEventTypeColor={handleEventTypeColor}
              onSunburstDataReceived={handleSunburstDataReceived}
              onSunburstLabelReceived={handleSunburstLabelReceived}
            />
          </div>
        </div>
        <div className="col-md-4" style={{ height: '640px' }}>
          <div
            className="first-div"
            style={{
              padding: '30px',
              marginBottom: '20px',
              background: '#4D5859',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <ChooseCharts
              title={'BoxPlot'}
              activeLabel={'BoxPlot'}
              showChart
              boxPlotData={boxPlotData}
              wordCloudData={wordCloudData}
              timeLineData={timeLineData}
              sunburstData={sunburstData}
              sunburstLabel={sunburstLabel}
              eventTypeColor={eventTypeColor}
              onDataReceived={handleDataReceived}
              onWordDataReceived={handleWordDataReceived}
              onTimeLineDataReceived={handleTimeLineDataReceived}
              onEventTypeColor={handleEventTypeColor}
              onSunburstDataReceived={handleSunburstDataReceived}
              onSunburstLabelReceived={handleSunburstLabelReceived}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="first-div"
            style={{
              padding: '30px',
              marginBottom: '20px',
              background: '#4D5859',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <ChooseCharts
              title={'WordCloud'}
              activeLabel={'WordCloud'}
              showChart
              boxPlotData={boxPlotData}
              wordCloudData={wordCloudData}
              timeLineData={timeLineData}
              sunburstData={sunburstData}
              sunburstLabel={sunburstLabel}
              eventTypeColor={eventTypeColor}
              onDataReceived={handleDataReceived}
              onWordDataReceived={handleWordDataReceived}
              onTimeLineDataReceived={handleTimeLineDataReceived}
              onEventTypeColor={handleEventTypeColor}
              onSunburstDataReceived={handleSunburstDataReceived}
              onSunburstLabelReceived={handleSunburstLabelReceived}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverviewPage
