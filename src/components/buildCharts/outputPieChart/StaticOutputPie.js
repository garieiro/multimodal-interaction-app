import React from 'react'
import transformDataToOutputPieChart from '../../../TransformDate/transformDataToOutputPieChart'
import PieChart from '../../charts/PieChart'

const StaticOutputPie = ({ data }) => {
  const transformedData = React.useMemo(
    () => transformDataToOutputPieChart(data),
    [data]
  )

  if (transformedData.children.length === 0) {
    return <p>No data found</p>
  }

  return <PieChart data={transformedData} />
}

export default StaticOutputPie
