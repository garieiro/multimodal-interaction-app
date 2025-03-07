import React from 'react'
import transformDataStackedBar from '../../../TransformDate/transformDataToStackedBar'
import StackedBarChart from '../../charts/StackedBarChart'

const StaticStackedBar = ({ data }) => {
  const transformedData = React.useMemo(
    () => transformDataStackedBar(data),
    [data]
  )
  return <StackedBarChart data={transformedData} />
}

export default StaticStackedBar
