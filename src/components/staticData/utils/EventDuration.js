const EventDuration = (dataArray) => {
  const eventDurations = []

  // Iterar sobre cada conjunto de eventos
  dataArray.forEach((eventsArray) => {
    if (!Array.isArray(eventsArray) || eventsArray.length === 0) {
      throw new Error('Event array is empty or not an array')
    }

    // Iterar sobre cada evento no conjunto
    eventsArray.forEach((event) => {
      const eventType = event.EventType
      const startTimestamp = new Date(event.Start)
      const endTimestamp = new Date(event.End)
      const duration = endTimestamp - startTimestamp

      const eventWithDuration = {
        eventType: eventType,
        duration: duration,
      }

      eventDurations.push(eventWithDuration)
    })
  })

  return eventDurations
}

export default EventDuration
