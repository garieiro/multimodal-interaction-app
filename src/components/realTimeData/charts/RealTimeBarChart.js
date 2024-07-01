import React, { useEffect } from 'react'
import * as d3 from 'd3'

const RealTimeBarChart = ({ data }) => {
  useEffect(() => {
    drawChart()
  }, [data])

  const drawChart = () => {
    const svg = d3.select('#real-time-chart')

    // Limpa o SVG antes de desenhar o novo gráfico
    svg.selectAll('*').remove()

    const width = 800
    const height = 300
    const margin = { top: 30, right: 30, bottom: 30, left: 40 }

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top])

    svg
      .append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => y(0) - y(d.value))
      .attr('width', x.bandwidth())

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'middle')
      .attr('dx', '0.5em')

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
  }

  return <svg id="real-time-chart" width="800" height="300"></svg>
}

export default RealTimeBarChart
