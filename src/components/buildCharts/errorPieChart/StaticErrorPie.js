import React from 'react'
import transformDataToErrorPieChart from '../../../TransformDate/transformDataToErrorPieChart'
import PieChart from '../../charts/PieChart'

const StaticErrorPie = ({ data }) => {
  const transformedData = React.useMemo(
    () => transformDataToErrorPieChart(data),
    [data]
  )

  if (transformedData.children.length === 0) {
    return <p>There are no errors available to show</p>
  }

  return <PieChart data={transformedData} />
}

export default StaticErrorPie
