import React, { useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import StaticSunBurst from '../buildCharts/sunBurstChart/StaticSunBurst'
import BoxPlot from '../charts/BoxPlot'
import StaticBoxPlot from '../buildCharts/boxPlotChart/StaticBoxPlot'
import WordCloud from '../charts/WordCloud'
import StaticWordCloud from '../buildCharts/wordCloudChart/StaticWordCloud'
import StaticStackedBar from '../buildCharts/stackedBarChart/StaticStackedBar'
import StaticTimeLine from '../buildCharts/timeLineChart/StaticTimeLine'
import StaticPie from '../buildCharts/pieChart/StaticPie'
import StaticPie1 from '../buildCharts/pieChart/StaticPie1'

const ChooseCharts = ({
  title,
  activeLabel,
  showChart,
  showTimeline,
  boxPlotData,
  wordCloudData,
  timeLineData,
  sunburstData,
  sunburstLabel,
  eventTypeColor,
  onDataReceived,
  onWordDataReceived,
  onTimeLineDataReceived,
  onEventTypeColor,
  onSunburstDataReceived,
  onSunburstLabelReceived,
}) => {
  const [activeChart, setActiveChart] = useState(activeLabel)
  const [chartTitle, setChartTitle] = useState(title)

  const handleSelect = (eventKey) => {
    setActiveChart(eventKey)
    setChartTitle(eventKey)
  }

  const renderActiveChart = () => {
    switch (activeChart) {
      case 'SunBurst':
        return sunburstLabel ? (
          <StaticSunBurst
            timeLabel={sunburstLabel}
            data={sunburstData}
            onDataReceived={onDataReceived}
            onWordDataReceived={onWordDataReceived}
            onTimeLineDataReceived={onTimeLineDataReceived}
            onEventTypeColor={onEventTypeColor}
          />
        ) : (
          <StaticSunBurst
            onDataReceived={onDataReceived}
            onWordDataReceived={onWordDataReceived}
            onTimeLineDataReceived={onTimeLineDataReceived}
            onEventTypeColor={onEventTypeColor}
          />
        )
      case 'BoxPlot':
        return boxPlotData.length > 0 ? (
          <BoxPlot data={boxPlotData} />
        ) : (
          <StaticBoxPlot />
        )
      case 'WordCloud':
        return wordCloudData.length > 0 ? (
          <WordCloud data={wordCloudData} />
        ) : (
          <StaticWordCloud />
        )
      case 'StackedBar':
        return <StaticStackedBar />
      case 'TimeLine':
        return timeLineData.length > 0 ? (
          <StaticTimeLine
            data={timeLineData}
            onDataReceived={onDataReceived}
            onWordDataReceived={onWordDataReceived}
            onExpLabelReceived={onSunburstLabelReceived}
            onExpDataReceived={onSunburstDataReceived}
            onEventTypeColor={eventTypeColor}
          />
        ) : (
          <StaticTimeLine
            onEventTypeColor={eventTypeColor}
            onDataReceived={onDataReceived}
            onExpLabelReceived={onSunburstLabelReceived}
            onExpDataReceived={onSunburstDataReceived}
            onWordDataReceived={onWordDataReceived}
          />
        )
      case 'PieChart1':
        return <StaticPie />
      case 'PieChart2':
        return <StaticPie1 />
      default:
        return null
    }
  }

  return (
    <div>
      <Navbar expand="lg" className={'custom-navbar'}>
        <Container fluid>
          <Navbar.Brand href="#home">{chartTitle}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav className="ms-auto">
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Choose a Chart"
                onSelect={handleSelect}
              >
                {showChart && (
                  <>
                    <NavDropdown.Item eventKey="SunBurst">
                      SunBurst
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="BoxPlot">
                      Box Plot
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="WordCloud">
                      Word Cloud
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="StackedBar">
                      Stacked Bar
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="PieChart1">
                      Pie Chart 1
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="PieChart2">
                      Pie Chart 2
                    </NavDropdown.Item>
                  </>
                )}
                {showTimeline && (
                  <NavDropdown.Item eventKey="TimeLine">
                    TimeLine
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="chart-container">{renderActiveChart()}</div>
    </div>
  )
}

export default ChooseCharts
