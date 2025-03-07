const transformDataToSankeyChart = (data) => {
  console.log('Received data:', data)

  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data: Data must be an object.')
  }

  const nodesSet = new Set()
  const links = []

  Object.keys(data).forEach((key) => {
    data[key].forEach((entry) => {
      const { Source, Target, Start, End } = entry

      nodesSet.add(Source)
      nodesSet.add(Target)

      const duration = (new Date(End) - new Date(Start)) / 1000

      links.push({
        source: Source,
        target: Target,
        value: duration,
      })
    })
  })

  const nodes = Array.from(nodesSet).map((name) => ({
    name,
    category: 'default',
  }))
  console.log({ nodes, links })
  return { nodes, links }
}

export default transformDataToSankeyChart
