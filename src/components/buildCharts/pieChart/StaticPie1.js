import React, { useEffect, useState } from 'react'
import PieChart1 from '../../charts/PieChart1'
import { fetchStaticPies2FromAPI } from '../../../api/StaticData'

const StaticPie1 = () => {
  const [pieData, setPieData] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const fetchWordCloud = async () => {
      try {
        const fetchedPieData = await fetchStaticPies2FromAPI()
        setPieData(fetchedPieData)
        setDataLoaded(true)
      } catch (error) {
        console.error('Error fetching PieChart data:', error)
      }
    }

    fetchWordCloud().catch((error) =>
      console.error('Error fetching PieChart data:', error)
    )
  }, [])

  return dataLoaded && <PieChart1 data={pieData} />
}

export default StaticPie1
