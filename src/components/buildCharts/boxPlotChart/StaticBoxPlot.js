import React from 'react'
import BoxPlot from '../../charts/BoxPlot'
import transformDataToBoxplot from '../../../TransformDate/transformDataToBoxplot'

const StaticBoxPlot = ({ data }) => {
  const transformedData = React.useMemo(
    () => transformDataToBoxplot(data),
    [data]
  )
  console.log('Box:', transformedData)
  return <BoxPlot data={transformedData} />
}

export default StaticBoxPlot
