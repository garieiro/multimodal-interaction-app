const transformDataToBubbleChart = (data) => {
  const result = []

  Object.keys(data).forEach((key) => {
    data[key].forEach((event) => {
      if (event.Start && event.End) {
        const start = new Date(event.Start)
        const end = new Date(event.End)

        if (!isNaN(start) && !isNaN(end)) {
          const duration = (end - start) / 1000

          if (duration > 0) {
            result.push({
              Name: event.EventType,
              duration: duration,
              eventType: event.EventType,
            })
          }
        }
      }
    })
  })

  return result
}

export default transformDataToBubbleChart
