const ConvertDataForScatterPlot = (time) => {
  const convertedData = []

  for (const eventType in time) {
    const durations = time[eventType]
    const averageDuration =
      durations.reduce((acc, curr) => acc + curr, 0) / durations.length

    // Atribuir a mesma coordenada x para todos os pontos de um tipo de evento
    const xCoordinate = eventType

    // Usar a média das durações como coordenada y
    const yCoordinate = averageDuration

    // Adicionar o ponto ao array convertido
    convertedData.push({ x: xCoordinate, y: yCoordinate })
  }
  return convertedData
}

export default ConvertDataForScatterPlot
