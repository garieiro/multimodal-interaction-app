import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const BoxPlot = ({ data }) => {
  const svgRef = useRef()
  console.log('BoxPlot', data)
  useEffect(() => {
    d3.select(svgRef.current).selectAll('*').remove()

    if (!data || data.length === 0) {
      return <div>No data available</div>
    }

    const margin = { top: 10, right: 30, bottom: 50, left: 40 }
    const width = 450 - margin.left - margin.right
    const height = 450 - margin.top - margin.bottom

    const boxWidth = 70
    const minBoxSpacing = 30
    const totalWidth = (boxWidth + minBoxSpacing) * data.length

    const minValues = data.map((dataset) => d3.min(dataset.values))
    const maxValues = data.map((dataset) => d3.max(dataset.values))
    const minAll = d3.min(minValues)
    const maxAll = d3.max(maxValues)

    const y = d3.scaleLinear().domain([minAll, maxAll]).range([height, 0])

    const svg = d3
      .select(svgRef.current)
      .attr('width', totalWidth + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const datasetWidth = totalWidth / data.length

    data.forEach((dataset, index) => {
      const data_sorted = dataset.values.sort(d3.ascending)
      const q1 = d3.quantile(data_sorted, 0.25)
      const median = d3.quantile(data_sorted, 0.5)
      const q3 = d3.quantile(data_sorted, 0.75)
      const interQuantileRange = q3 - q1
      const min = Math.min(maxAll, q3 + interQuantileRange * 1.5)
      const max = Math.max(minAll, q1 - interQuantileRange * 1.5)
      const x = index * datasetWidth + datasetWidth / 2

      svg
        .append('line')
        .attr('x1', x)
        .attr('x2', x)
        .attr('y1', y(min))
        .attr('y2', y(max))
        .attr('stroke', 'black')

      svg
        .append('rect')
        .attr('x', x - boxWidth / 2)
        .attr('y', y(q3))
        .attr('height', y(q1) - y(q3))
        .attr('width', boxWidth)
        .attr('stroke', 'black')
        .style('fill', '#69b3a2')

      svg
        .selectAll('line.toto')
        .data([min, median, max])
        .enter()
        .append('line')
        .attr('x1', x - boxWidth / 2)
        .attr('x2', x + boxWidth / 2)
        .attr('y1', (d) => y(d))
        .attr('y2', (d) => y(d))
        .attr('stroke', 'black')

      svg
        .append('text')
        .attr('x', x)
        .attr('y', height + margin.bottom / 2)
        .attr('text-anchor', 'middle')
        .text(dataset.label)
        .style('font-size', '12px')
        .attr('fill', 'black')
    })

    svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(y))
  }, [data])

  return <svg ref={svgRef}></svg>
}

export default BoxPlot
