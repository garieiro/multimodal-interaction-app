import React, { useEffect, useState } from 'react'
import { fetchStaticAllFilesFromAPI } from '../../api/StaticData'

const ReadDataset = () => {
  const [datasetData, setDatasetData] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const fetchWordCloud = async () => {
      try {
        const fetchedDatasetFile = await fetchStaticAllFilesFromAPI()
        console.log('Files:', fetchedDatasetFile)
        setDatasetData(fetchedDatasetFile)
        setDataLoaded(true)
      } catch (error) {
        console.error('Error fetching All files:', error)
      }
    }

    fetchWordCloud().catch((error) =>
      console.error('Error fetching All files:', error)
    )
  }, [])

  return { dataLoaded, datasetData }
}

export default ReadDataset
