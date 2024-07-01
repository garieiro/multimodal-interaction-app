import React, { useState } from 'react'

const ExperiencePage = () => {
  const [sankeyData, setSankeyData] = useState([])

  if (sankeyData.length === 0) {
    return null
  }

  return <h1>Ola</h1>
}

export default ExperiencePage
