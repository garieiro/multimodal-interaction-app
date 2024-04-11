const ConvertDataForScatterPlotRealTime = (eventDurations) => {
  const convertedData = [];

  // Converte o objeto em um array de objetos
  const eventArray = Object.entries(eventDurations);

  // Itera sobre cada par chave-valor no array
  eventArray.forEach(([eventType, averageDuration]) => {
    // Adiciona o ponto ao array convertido
    convertedData.push({ x: eventType, y: averageDuration });
  });
  return convertedData;
};

export default ConvertDataForScatterPlotRealTime;
