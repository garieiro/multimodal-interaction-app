import React, { useEffect, useState } from 'react';
import fetchStaticDataFromAPI from '../../api/StaticData';
import CountEvents from './CountEvents';
import EventDuration from './EventDuration';
import StaticBarChart from './charts/StaticBarChart';
import ScatterPlot from './charts/ScatterPlot';
import ConvertDataForScatterPlot from './utils/ConvertDataForScatterPlot';
import ConvertDataForLineChart from './utils/ConvertDataForLineChart';
import TimelineChart from './charts/TimeLineChart';

const StaticData = () => {
  const [staticData, setStaticData] = useState([]);

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const fetchedStaticData = await fetchStaticDataFromAPI();
        setStaticData(fetchedStaticData);
      } catch (error) {
        console.error('Error fetching Static Data:', error);
      }
    };

    fetchStaticData();
  }, []);

  const eventDataCounts = CountEvents(staticData);
  const eventDurations = EventDuration(staticData);
  const scatterPlotData = ConvertDataForScatterPlot(eventDurations);
  const eventStaticDataForChart = Object.entries(eventDataCounts).map(([eventType, count]) => ({
    name: eventType,
    value: count,
  }));

  // Converta os dados para o formato necessário para o LineChart
  const test = ConvertDataForLineChart(staticData)
  console.log("ola:",test)
  return (
    <React.Fragment>
      <div>
        <h1>Static Bar Chart</h1>
        <StaticBarChart data={eventStaticDataForChart} />
        <h1>Static Scatter Chart</h1>
        <ScatterPlot data={scatterPlotData} />
      </div>
    </React.Fragment>
  );
};

export default StaticData;
