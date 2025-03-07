import React from 'react'
import TimeLineChart from '../../charts/TimeLineChart'
import transformDataToTimeLine from '../../../TransformDate/transformDataToTimeLine'

const StaticTimeLine = ({ data }) => {
  const transformedData = React.useMemo(
    () => transformDataToTimeLine(data),
    [data]
  )

  return <TimeLineChart data={transformedData} />
}

export default StaticTimeLine
