import React, { useEffect, useState } from 'react'
import { fetchStaticPiesFromAPI } from '../../../api/StaticData'
import PieChart from '../../charts/PieChart'

const StaticPie = () => {
  const [pieData, setPieData] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const fetchWordCloud = async () => {
      try {
        const fetchedPieData = await fetchStaticPiesFromAPI()
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

  return dataLoaded && <PieChart data={pieData} />
}

export default StaticPie
