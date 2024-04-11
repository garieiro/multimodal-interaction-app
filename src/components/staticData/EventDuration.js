const EventDuration = (dataArray) => {
  const eventDurations = {}

  dataArray.forEach((eventsArray) => {
    eventsArray.forEach((event) => {
      const eventType = event.EventType
      const startTimestamp = new Date(event.Start)
      const endTimestamp = new Date(event.End)
      const duration = endTimestamp - startTimestamp

      if (eventType in eventDurations) {
        eventDurations[eventType].push(duration)
      } else {
        eventDurations[eventType] = [duration]
      }
    })
  })
  return eventDurations
}

export default EventDuration
