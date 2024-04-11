const ConvertDataForLineChart = (dataArray) => {
    const convertedData = [];
  
    dataArray.forEach((eventsArray) => {
        if (eventsArray.length >= 2 && eventsArray[0] && eventsArray[0].Start) {
            const startTimestamp = new Date(eventsArray[0].Start);
            const endTimestamp = new Date(eventsArray[eventsArray.length - 1].End);
            const eventType = eventsArray[0].EventType; // Assume que todos os eventos no array têm o mesmo tipo
    
            convertedData.push({ x1: startTimestamp, x2: endTimestamp, y: eventType });
        }
    });
    console.log(convertedData)
    return convertedData;
};

export default ConvertDataForLineChart;