const EventDurationRealTime = (receivedData, eventDurations) => {
  // Verifica se os dados recebidos são um objeto
  if (typeof receivedData === 'object' && receivedData.data) {
    const event = JSON.parse(receivedData.data) // Converte a string JSON para objeto JavaScript
    const eventType = event.EventType
    const startTimestamp = new Date(event.Start)
    const endTimestamp = new Date(event.End)
    const duration = endTimestamp - startTimestamp

    // Verifica se o tipo de evento já existe nas durações de evento
    if (eventType in eventDurations) {
      // Adiciona a duração ao array de durações do evento
      eventDurations[eventType] += duration
    } else {
      // Se o tipo de evento ainda não existir nas durações, inicializa-o com um array contendo a duração
      eventDurations[eventType] = duration
    }
  }
  return eventDurations
}

export default EventDurationRealTime
