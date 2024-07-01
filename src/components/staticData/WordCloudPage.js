import React, { useEffect, useState } from 'react'
import { fetchStaticCountWordsFromAPI } from '../../api/StaticData'
import WordCloud from '../charts/WordCloud'
import DonutChart from '../charts/PieChart'
import PieChart from '../charts/PieChart'
import MultiLevelPieChart from '../charts/PieChart'

const WordCloudPage = () => {
  const [wordCloudData, setWordCloudData] = useState([])

  useEffect(() => {
    const fetchWordCloudData = async () => {
      try {
        const fetchedData = await fetchStaticCountWordsFromAPI()
        setWordCloudData(fetchedData)
      } catch (error) {
        console.error('Error fetching word cloud data:', error)
      }
    }

    fetchWordCloudData()
  }, [])

  const data = {
    children: [
      {
        semantic: 'AFFIRM',
        type: 'ERROR',
        value: 6,
      },
    ],
  }

  const data1 = {
    children: [
      {
        children: [
          {
            name: 'I AM GLAD YOU LIKED MY SUGGESTION, I WILL PLAY THE SONG THEN',
            value: 6,
          },
        ],
        name: 'Response Generator',
        type: 'OUTPUT',
      },
      {
        children: [
          {
            name: 'I AM GLAD YOU LIKED MY SUGGESTION, I WILL PLAY THE SONG THEN',
            value: 4,
          },
          {
            name: ' Ola I AM GLAD YOU LIKED MY SUGGESTION, I WILL PLAY THE SONG THEN',
            value: 2,
          },
        ],
        name: 'Response Render',
        type: 'OUTPUT',
      },
    ],
  }

  return <MultiLevelPieChart data={data1} />
}

export default WordCloudPage
