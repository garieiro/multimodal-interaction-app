const transformDataToErrorPieChart = (data) => {
  const outputCounts = {}

  for (const userId in data) {
    const events = data[userId]

    events.forEach((event) => {
      if (event.Type === 'ERROR') {
        const eventName = event.Semantic.RESULT
        const eventType = event.EventType

        if (!outputCounts[eventType]) {
          outputCounts[eventType] = {
            name: eventType,
            type: event.Type,
            children: [],
          }
        }

        const existingChild = outputCounts[eventType].children.find(
          (child) => child.name === eventName
        )

        if (existingChild) {
          existingChild.value += 1
        } else {
          outputCounts[eventType].children.push({
            name: eventName,
            value: 1,
          })
        }
      }
    })
  }

  return {
    children: Object.values(outputCounts),
  }
}

export default transformDataToErrorPieChart
