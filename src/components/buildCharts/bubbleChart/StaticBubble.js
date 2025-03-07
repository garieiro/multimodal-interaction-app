import React from 'react'
import transformDataToBubbleChart from '../../../TransformDate/transformDataToBubbleChart'
import BubbleChart from '../../charts/BubbleChart'

const StaticBubble = ({ data }) => {
  const transformedData = React.useMemo(
    () => transformDataToBubbleChart(data),
    [data]
  )
  console.log('Box:', transformedData)
  return <BubbleChart data={transformedData} />
}

export default StaticBubble
