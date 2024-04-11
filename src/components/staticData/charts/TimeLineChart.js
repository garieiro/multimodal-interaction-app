import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TimelineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return console.log("No data");

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const parseTime = d3.timeParse('%Y-%m-%d %H:%M:%S.%L');

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleBand().range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    // Mapeia os dados para extrair os valores de 'Start' e 'End' e converter para objetos de data
    const timeData = data.map(d => ({
      start: parseTime(d.Start),
      end: parseTime(d.End)
    }));

    // Define o domínio dos eixos X e Y
    x.domain([
      d3.min(timeData, d => d.start),
      d3.max(timeData, d => d.end)
    ]);
    y.domain(timeData.map((d, i) => i)).padding(0.1);

    // Adiciona os eixos X e Y ao SVG
    svg.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${height})`).call(xAxis);
    svg.append('g').attr('class', 'y-axis').call(yAxis);

    // Adiciona os retângulos representando os intervalos de tempo
    svg.selectAll('.bar')
      .data(timeData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.start))
      .attr('y', (d, i) => y(i))
      .attr('width', d => x(d.end) - x(d.start))
      .attr('height', y.bandwidth())
      .attr('fill', 'steelblue');
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default TimelineChart;
