import React, { useEffect, useState, useRef } from 'react' // Importar useRef
import '../styles.css'
import { useLocation } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import ChooseCharts from '../chooseCharts/ChooseCharts'
import Sidebar from '../Sidebar/Sidebar'

const OverviewPage = () => {
  const location = useLocation()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [visibleCharts, setVisibleCharts] = useState([])
  const [colSizes, setColSizes] = useState({ col1: 8, col2: 4 })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const receivedData = location.state?.receivedData || []
  const datasetName = location.state?.dataset || []
  const totalUsers = location.state?.totalUsers || []
  const selectedUsers = location.state?.selectedUsers || []
  const eventTypeNum = location.state?.eventTypeNum || []
  const typesNumber = location.state?.typesNumber || []
  console.log('Data:', receivedData)
  const firstChartsData = [
    {
      title: 'StackedBar',
      activeLabel: 'StackedBar',
      data: receivedData,
      showChart: true,
    },
    {
      title: 'OutputPie',
      activeLabel: 'OutputPie',
      data: receivedData,
      showChart: true,
    },
  ]

  const secondChartsData = [
    {
      title: 'SunBurst',
      activeLabel: 'SunBurst',
      data: receivedData,
      showChart: true,
    },
    {
      title: 'BoxPlot',
      activeLabel: 'BoxPlot',
      data: receivedData,
      showChart: true,
    },
    {
      title: 'WordCloud',
      activeLabel: 'WordCloud',
      data: receivedData,
      showChart: true,
    },
  ]

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    const handleMouseMove = (e) => {
      if (e.clientX <= 10) {
        setIsSidebarOpen(true)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (windowWidth < 900) {
      setVisibleCharts(secondChartsData.slice(0, 2))
      setColSizes({ col1: 6, col2: 6 })
    } else {
      setVisibleCharts(secondChartsData)
      setColSizes({ col1: 8, col2: 4 })
    }
  }, [windowWidth])

  return (
    <div className="content full-height">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        dataset={datasetName}
        totalUsers={totalUsers}
        selectedUsers={selectedUsers}
      />
      <Row className="half-height">
        {firstChartsData.map((chart, index) => {
          const cardClass =
            index === 0 ? 'first-card-style-1' : 'first-card-style-2'
          return (
            <Col
              key={index}
              className={`half-height ${cardClass}`}
              xs={index === 0 ? colSizes.col1 : colSizes.col2}
            >
              <ChooseCharts
                title={chart.title}
                activeLabel={chart.activeLabel}
                data={chart.data}
                showChart={chart.showChart}
                dataset={datasetName}
                totalUsers={totalUsers}
                selectedUsers={selectedUsers}
                eventTypeNum={eventTypeNum}
                typesNumber={typesNumber}
              />
            </Col>
          )
        })}
      </Row>
      <Row className="half-height">
        {visibleCharts.map((chart, index) => {
          const cardClass = `card-style-${index + 1}`
          return (
            <Col key={index} className={`half-height ${cardClass}`}>
              <ChooseCharts
                title={chart.title}
                activeLabel={chart.activeLabel}
                data={chart.data}
                showChart={chart.showChart}
                dataset={datasetName}
                totalUsers={totalUsers}
                selectedUsers={selectedUsers}
                eventTypeNum={eventTypeNum}
                typesNumber={typesNumber}
              />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default OverviewPage
