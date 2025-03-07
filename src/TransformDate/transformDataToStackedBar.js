const transformDataStackedBar = (data) => {
  const result = []

  Object.keys(data).forEach((user) => {
    const events = data[user]

    const typeCounts = {}

    events.forEach((event) => {
      const eventType = event.Type

      if (typeCounts[eventType]) {
        typeCounts[eventType]++
      } else {
        typeCounts[eventType] = 1
      }
    })

    Object.keys(typeCounts).forEach((type) => {
      result.push({
        name: user,
        type: type,
        count: typeCounts[type],
      })
    })
  })

  return result
}

export default transformDataStackedBar
