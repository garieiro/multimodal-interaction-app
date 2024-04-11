// Função para contar o número de eventos em cada array 
const CountEvents = (dataArray) => {
    const eventCounts = {};

    dataArray.forEach((events) => {
      events.forEach((event) => {
        const eventType = event.EventType;
        if (eventType in eventCounts) {
          eventCounts[eventType]++;
        } else {
          eventCounts[eventType] = 1;
        }
      });
    });

    return eventCounts;
  };

export default CountEvents