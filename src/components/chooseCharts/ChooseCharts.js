import React, { useState, useEffect } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'
import StaticSunBurst from '../buildCharts/sunBurstChart/StaticSunBurst'
import StaticStackedBar from '../buildCharts/stackedBarChart/StaticStackedBar'
import StaticTimeLine from '../buildCharts/timeLineChart/StaticTimeLine'
import StaticBoxPlot from '../buildCharts/boxPlotChart/StaticBoxPlot'
import StaticWordCloud from '../buildCharts/wordCloudChart/StaticWordCloud'
import Information from '../information/Information'
import StaticOutputPie from '../buildCharts/outputPieChart/StaticOutputPie'
import StaticErrorPie from '../buildCharts/errorPieChart/StaticErrorPie'
import StaticBubble from '../buildCharts/bubbleChart/StaticBubble'
import StaticSankey from '../buildCharts/sankeyChart/StaticSankey'

const ChooseCharts = ({
  title,
  data,
  activeLabel,
  showChart,
  dataset,
  totalUsers,
  selectedUsers,
  eventTypeNum,
  typesNumber,
}) => {
  const [activeChart, setActiveChart] = useState(activeLabel)
  const [chartTitle, setChartTitle] = useState(title)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    if (!data) {
      setChartTitle('No chart to show')
    } else {
      setChartTitle(activeChart)
    }
  }, [activeChart, data])

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState)
  }

  const handleSelect = (eventKey) => {
    setActiveChart(eventKey)
  }

  const renderActiveChart = () => {
    switch (activeChart) {
      case 'SunBurst':
        return data ? <StaticSunBurst data={data} /> : <p>No data available</p>
      case 'BoxPlot':
        return data ? <StaticBoxPlot data={data} /> : <p>No data available</p>
      case 'WordCloud':
        return data ? <StaticWordCloud data={data} /> : <p>No data available</p>
      case 'StackedBar':
        return data ? (
          <StaticStackedBar data={data} />
        ) : (
          <p>No data available</p>
        )
      case 'TimeLine':
        return data ? <StaticTimeLine data={data} /> : <p>No data available</p>
      case 'OutputPie':
        return data ? <StaticOutputPie data={data} /> : <p>No data available</p>
      case 'ErrorPie':
        return data ? <StaticErrorPie data={data} /> : <p>No data available</p>
      case 'Bubble':
        return data ? <StaticBubble data={data} /> : <p>No data available</p>
      case 'Sankey':
        return data ? <StaticSankey data={data} /> : <p>No data available</p>
      case 'Information':
        return data ? (
          <Information
            dataset={dataset}
            totalUsers={totalUsers}
            selectedUsers={selectedUsers}
            eventTypeNum={eventTypeNum}
            typesNumber={typesNumber}
          />
        ) : (
          <p>No data available</p>
        )
      default:
        return null
    }
  }

  return (
    <Card
      className="card-chart"
      style={{
        height: '100%',
        backgroundColor: '#27293d',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardHeader
        style={{
          alignItems: 'center',
        }}
      >
        <CardTitle
          style={{
            color: 'burlywood',
            margin: 0,
          }}
        >
          {chartTitle}
        </CardTitle>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle>Choose a Chart</DropdownToggle>
          {showChart && (
            <DropdownMenu>
              <DropdownItem onClick={() => handleSelect('SunBurst')}>
                SunBurst
              </DropdownItem>
              <DropdownItem onClick={() => handleSelect('TimeLine')}>
                TimeLine
              </DropdownItem>
              <DropdownItem onClick={() => handleSelect('BoxPlot')}>
                BoxPlot
              </DropdownItem>
              <DropdownItem onClick={() => handleSelect('WordCloud')}>
                WordCloud
              </DropdownItem>
              <DropdownItem onClick={() => handleSelect('StackedBar')}>
                Stacked Bar
              </DropdownItem>
              <DropdownItem onClick={() => handleSelect('OutputPie')}>
                Output Pie
              </DropdownItem>
              <DropdownItem onClick={() => handleSelect('ErrorPie')}>
                Error Pie
              </DropdownItem>
              <DropdownItem onClick={() => handleSelect('Bubble')}>
                Bubble
              </DropdownItem>
              <DropdownItem onClick={() => handleSelect('Sankey')}>
                Sankey
              </DropdownItem>
              <DropdownItem onClick={() => handleSelect('Information')}>
                Information
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </CardHeader>
      <CardBody
        style={{
          color: 'burlywood',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          overflow: 'hidden',
        }}
      >
        {renderActiveChart()}
      </CardBody>
    </Card>
  )
}

export default ChooseCharts
