import React, { useEffect, useState } from 'react';
import RealTimeBarChart from './charts/RealTimeBarChart';
import KafkaDataReceiver from '../../api/OnlineData';
import CountRealTimeEvents from './CountRealTimeEvents';
import EventDurationRealTime from './EventDurationRealTime';
import RealTimeScatterPlot from './charts/RealTimeScatterPlot';
import ConvertDataForScatterPlotRealTime from './ConvertDataForScatterPlotRealTime';
import LineChart from './charts/LineChart'; // Importe o novo componente

const RealTimeData = () => {
  const [realTimeData, setRealTimeData] = useState([]);
  const [eventDurations, setEventDurations] = useState([]);
  const [eventTimeline, setEventTimeline] = useState([]); // Adicione o estado para os dados do gráfico de linha

  useEffect(() => {
    const eventCounts = {}; // Inicializa os contadores de eventos
    const eventDuration = {}; // Inicializa os contadores de duração de evento 
    const timelineData = []; // Inicializa os dados para o gráfico de linha

    const onDataReceived = (receivedData) => {
      // Atualiza o estado dos contadores de eventos com base nos dados recebidos
      const updatedEventCounts = CountRealTimeEvents(receivedData, eventCounts);

      // Atualiza os contadores de duração de eventos com base nos dados recebidos
      const updatedEventDurations = EventDurationRealTime(receivedData, eventDuration);
      const newDuration = ConvertDataForScatterPlotRealTime(updatedEventDurations);
      
      // Atualiza os dados da linha do tempo
      timelineData.push({
        time: new Date(),
        ...updatedEventCounts,
      });

      // Converte os dados atualizados em um formato adequado para os gráficos
      const newData = Object.entries(updatedEventCounts).map(([eventType, count]) => ({
        name: eventType,
        value: count,
      }));

      // Atualiza o estado com os novos dados dos gráficos
      setRealTimeData(newData);
      setEventDurations(newDuration);
      setEventTimeline(timelineData);
    };

    // Inicia a recepção de dados em tempo real
    KafkaDataReceiver(onDataReceived);
  }, []); // O useEffect é executado apenas na montagem do componente
  console.log('Existes: ', realTimeData)
  return (
    <div>
      <h1>Real-Time Bar Chart</h1>
      <RealTimeBarChart data={realTimeData} />
      <h1>Real-Time Scatter Chart</h1>
      <RealTimeScatterPlot data={eventDurations} />
      <h1>Event Timeline</h1>
      <LineChart data={eventTimeline} />
    </div>
  );
};

export default RealTimeData;
