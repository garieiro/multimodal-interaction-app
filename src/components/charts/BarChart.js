import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const BarChart = ({ data }) => {
  const svgRef = useRef()

  useEffect(() => {
    const width = 928
    const height = 500
    const marginTop = 30
    const marginRight = 0
    const marginBottom = 30
    const marginLeft = 40
    const barPadding = 0.1

    // Cria a escala com a largura das barras dinâmica
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.type))
      .range([marginLeft, width - marginRight])
      .padding(barPadding)

    // Cria a escala linear para o eixo y
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .nice()
      .range([height - marginBottom, marginTop])

    // Seleciona o elemento SVG e define seus atributos
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;')

    // Adiciona as barras ao gráfico
    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.type))
      .attr('y', (d) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - marginBottom - y(d.count))
      .attr('fill', 'steelblue')

    // Adiciona o eixo x ao gráfico
    svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x))
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .selectAll('.tick text')
          .attr('dy', '0.5em')
          .attr('text-anchor', 'middle')
          .style('text-anchor', 'middle')
      )

    // Adiciona o eixo y ao gráfico
    svg
      .append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(null, 's'))
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .append('text')
          .attr('x', -marginLeft)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text('↑ Count')
      )
  }, [data])

  return <svg ref={svgRef}></svg>
}

export default BarChart
