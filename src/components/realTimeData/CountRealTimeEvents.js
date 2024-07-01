const CountRealTimeEvents = (receivedData, currentEventCounts) => {
  // Verifica se os dados recebidos são um objeto
  if (typeof receivedData === 'object' && receivedData.data) {
    const event = JSON.parse(receivedData.data) // Converte a string JSON para objeto JavaScript
    const eventType = event.EventType

    // Verifica se o tipo de evento já existe no contador atual
    if (eventType in currentEventCounts) {
      // Incrementa o contador do tipo de evento
      currentEventCounts[eventType]++
    } else {
      // Se o tipo de evento ainda não existir no contador, inicializa-o com 1
      currentEventCounts[eventType] = 1
    }
  }
  return currentEventCounts
}

export default CountRealTimeEvents
