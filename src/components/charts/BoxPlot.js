import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const BoxPlot = ({ data }) => {
  const svgRef = useRef()

  useEffect(() => {
    d3.select(svgRef.current).selectAll('*').remove()

    if (!data || data.length === 0) {
      return
    }

    const margin = { top: 10, right: 30, bottom: 50, left: 40 }
    const height = 450 - margin.top - margin.bottom

    const boxWidth = 70
    const minBoxSpacing = 30
    const totalWidth = (boxWidth + minBoxSpacing) * data.length

    const minValues = data.map((dataset) => d3.min(dataset.values))
    const maxValues = data.map((dataset) => d3.max(dataset.values))
    const minAll = d3.min(minValues) - 2
    const maxAll = d3.max(maxValues) + 2

    const y = d3.scaleLinear().domain([minAll, maxAll]).range([height, 0])

    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr(
        'viewBox',
        `0 0 ${totalWidth + margin.left + margin.right} ${height + margin.top + margin.bottom}`
      )
      .style('font', '10px sans-serif')

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const datasetWidth = totalWidth / data.length

    data.forEach((dataset, index) => {
      const data_sorted = dataset.values.sort(d3.ascending)
      const q1 = d3.quantile(data_sorted, 0.25)
      const median = d3.quantile(data_sorted, 0.5)
      const q3 = d3.quantile(data_sorted, 0.75)
      const interQuantileRange = q3 - q1

      const min = Math.max(0, q1 - interQuantileRange * 1.5)
      const max = Math.min(maxAll, q3 + interQuantileRange * 1.5)
      const x = index * datasetWidth + datasetWidth / 2

      g.append('line')
        .attr('x1', x)
        .attr('x2', x)
        .attr('y1', y(min))
        .attr('y2', y(max))
        .attr('stroke', 'black')

      g.append('rect')
        .attr('x', x - boxWidth / 2)
        .attr('y', y(q3))
        .attr('height', y(q1) - y(q3))
        .attr('width', boxWidth)
        .attr('stroke', 'black')
        .style('fill', '#69b3a2')

      g.selectAll('line.toto')
        .data([min, median, max])
        .enter()
        .append('line')
        .attr('x1', x - boxWidth / 2)
        .attr('x2', x + boxWidth / 2)
        .attr('y1', (d) => y(d))
        .attr('y2', (d) => y(d))
        .attr('stroke', 'black')
    })

    // Eixo Y
    g.append('g').attr('class', 'y-axis').call(d3.axisLeft(y))

    // Eixo X
    const xAxis = d3.axisBottom(
      d3
        .scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, totalWidth])
        .padding(0.1)
    )
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)

    // Mudar a cor da label do eixo X
    g.selectAll('.x-axis text').style('fill', 'burlywood')
  }, [data])

  return <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
}

export default BoxPlot
