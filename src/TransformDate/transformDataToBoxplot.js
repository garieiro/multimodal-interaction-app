const transformDataToBoxplot = (data) => {
  const eventLabels = new Set()
  Object.values(data).forEach((events) => {
    events.forEach((event) => {
      eventLabels.add(event.Type)
    })
  })

  const results = Array.from(eventLabels).map((label) => ({
    label,
    values: [],
  }))

  Object.values(data).forEach((events) => {
    events.forEach((event) => {
      const labelIndex = results.findIndex(
        (result) => result.label === event.Type
      )
      const startTime = new Date(event.Start).getTime()
      const endTime = new Date(event.End).getTime()
      const duration = (endTime - startTime) / 1000
      results[labelIndex].values.push(duration)
    })
  })

  return results
}

export default transformDataToBoxplot
