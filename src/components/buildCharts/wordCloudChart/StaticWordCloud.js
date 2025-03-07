import React from 'react'
import transformDataToWordcloud from '../../../TransformDate/transformDataToWordcloud'
import WordCloud from '../../charts/WordCloud'

const StaticWordCloud = ({ data }) => {
  const transformedData = React.useMemo(
    () => transformDataToWordcloud(data),
    [data]
  )

  return <WordCloud data={transformedData} />
}

export default StaticWordCloud
