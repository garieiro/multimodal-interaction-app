import React, { useEffect, useState } from 'react'
import { fetchStaticAllTypesFromAPI } from '../../../api/StaticData'
import StackedBarChart from '../../charts/StackedBarChart'

const StaticStackedBar = () => {
  const [stackedBar, setStackedBar] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const fetchStackedBar = async () => {
      try {
        const fetchStackedBarData = await fetchStaticAllTypesFromAPI()
        setStackedBar(fetchStackedBarData)
        setDataLoaded(true)
      } catch (error) {
        console.error('Error fetching types data:', error)
      }
    }

    fetchStackedBar().catch((error) =>
      console.error('Error fetching StackedBar data:', error)
    )
  }, [])

  return dataLoaded && <StackedBarChart data={stackedBar} />
}

export default StaticStackedBar
