import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const RealTimeScatterPlot = ({ data }) => {
  const svgRef = useRef()

  useEffect(() => {
    if (!data) return

    // Ordenar os dados pelo eixo y em ordem crescente
    const sortedData = data.slice().sort((a, b) => a.y - b.y)

    // Configuração do SVG e margens
    const margin = { top: 40, right: 40, bottom: 40, left: 40 }
    const width = 600
    const height = 300
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Definição do SVG com margens
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    // Escalas com margens
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.x))
      .range([margin.left, innerWidth + margin.left])
      .padding(0.1)

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(sortedData, (d) => d.y)])
      .range([innerHeight + margin.top, margin.top])

    // Desenho dos pontos
    svg
      .selectAll('circle')
      .data(sortedData)
      .join('circle')
      .attr('cx', (d) => xScale(d.x) + xScale.bandwidth() / 2)
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 5)
      .attr('fill', 'steelblue')

    // Adição dos eixos
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale).ticks(5)

    svg
      .append('g')
      .attr('transform', `translate(0, ${innerHeight + margin.top})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-45)')

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
  }, [data])

  return <svg ref={svgRef}></svg>
}

export default RealTimeScatterPlot
