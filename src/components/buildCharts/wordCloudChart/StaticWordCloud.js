import React, { useEffect, useState } from 'react'
import { fetchStaticCountWordsFromAPI } from '../../../api/StaticData'
import WordCloud from '../../charts/WordCloud'

const StaticWordCloud = ({ data }) => {
  const [wordCloudData, setWordCloudData] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const fetchWordCloud = async () => {
      try {
        let fetchedWordCloudData = []
        if (data) {
          fetchedWordCloudData = data
        } else {
          fetchedWordCloudData = await fetchStaticCountWordsFromAPI()
        }
        setWordCloudData(fetchedWordCloudData)
        setDataLoaded(true)
      } catch (error) {
        console.error('Error fetching WordCloud data:', error)
      }
    }

    fetchWordCloud().catch((error) =>
      console.error('Error fetching WordCloud data:', error)
    )
  }, [data])

  return dataLoaded && <WordCloud data={wordCloudData} />
}

export default StaticWordCloud
