import React from 'react'
import SankeyChart from '../../charts/SankeyChart'
import transformDataToSankeyChart from '../../../TransformDate/transformDataToSankeyChart'

const StaticSankey = ({ data }) => {
  const transformedData = React.useMemo(
    () => transformDataToSankeyChart(data),
    [data]
  )
  return <SankeyChart data={transformedData} />
}

export default StaticSankey
