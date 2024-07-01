import React, { useEffect, useState } from 'react'
import { fetchCountForAllTypesFromAPI } from '../../api/StaticData'
import BarChart from '../charts/BarChart'

const TypePage = () => {
  const [staticType, setStaticType] = useState([])

  useEffect(() => {
    const fetchStaticType = async () => {
      try {
        const fetchedStaticDataTest = await fetchCountForAllTypesFromAPI()
        setStaticType(fetchedStaticDataTest)
      } catch (error) {}
    }

    fetchStaticType()
  }, [])

  return (
    <React.Fragment>
      <div className="pages-container">
        <div className="pages-text">
          <h1>Types Count</h1>
        </div>
        <BarChart data={staticType} />
      </div>
    </React.Fragment>
  )
}

export default TypePage
