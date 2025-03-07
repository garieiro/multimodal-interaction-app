const convertToMilliseconds = (timeString) => {
  return new Date(timeString).getTime()
}

const getOrdinalLabel = (num) => {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const v = num % 100
  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
}

const transformDataToTimeLine = (data) => {
  const transformedData = []

  Object.entries(data).forEach(([expId, eventList]) => {
    const ordinalLabel = getOrdinalLabel(expId) + ' exp'

    const times = eventList.map((event) => ({
      starting_time: convertToMilliseconds(event.Start),
      ending_time: convertToMilliseconds(event.End),
    }))

    transformedData.push({
      label: ordinalLabel,
      times: times,
    })
  })
  console.log('TimeLine:', transformedData)
  return transformedData
}

export default transformDataToTimeLine
