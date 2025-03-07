import React from 'react'
import SunBurst from '../../charts/SunBurst'
import transformDataToSunburst from '../../../TransformDate/transformDataToSunburst'

const StaticSunBurst = ({ data }) => {
  const transformedData = React.useMemo(
    () => transformDataToSunburst(data),
    [data]
  )

  return <SunBurst data={transformedData} />
}

export default StaticSunBurst
