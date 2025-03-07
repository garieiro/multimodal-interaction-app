import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const StackedBarChart = ({ data }) => {
  const svgRef = useRef()
  const tooltipRef = useRef()

  useEffect(() => {
    let width
    if (data.length > 12) {
      width = 1500
    } else {
      width = 800
    }
    const height = 350
    const marginTop = 10
    const marginRight = 10
    const marginBottom = 20
    const marginLeft = 40

    const nestedData = d3.groups(data, (d) => d.name)
    const types = Array.from(new Set(data.map((d) => d.type)))

    const tooltip = d3
      .select(tooltipRef.current)
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('background', 'rgba(0,0,0,0.9)')
      .style('border', '1px solid black')
      .style('padding', '5px')
      .style('border-radius', '4px')
      .style('font-size', '12px')
      .style('z-index', '10')

    const series = d3
      .stack()
      .keys(types)
      .value(([, D], key) => D.find((d) => d.type === key)?.count || 0)(
      nestedData
    )

    const x = d3
      .scaleBand()
      .domain(nestedData.map(([name]) => name))
      .range([marginLeft, width - marginRight])
      .padding(0.05)

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1]))])
      .rangeRound([height - marginBottom, marginTop])

    const color = d3
      .scaleOrdinal()
      .domain(types)
      .range(d3.schemeCategory10)
      .unknown('#ccc')

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('style', 'height: auto;')

    svg.selectAll('*').remove()

    svg
      .append('g')
      .selectAll('g')
      .data(series)
      .join('g')
      .attr('fill', (d) => color(d.key))
      .selectAll('rect')
      .data((D) => D.map((d) => ({ ...d, key: D.key })))
      .join('rect')
      .attr('x', (d) => x(d.data[0]))
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth())
      .on('mouseover', function (event, d) {
        const name = d.data[0]
        const type = d.key
        const count = d[1] - d[0]

        tooltip
          .html(`Name: ${name}<br/>Type: ${type}<br/>Count: ${count}`)
          .style('opacity', 1)
          .style('visibility', 'visible')
          .style('position', 'fixed')
          .style('left', '50px')
          .style('top', '50px')
          .style('z-index', '9999')
      })
      .on('mousemove', (event) => {
        d3.select(tooltipRef.current)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 30}px`)
      })
      .on('mouseout', () => {
        d3.select(tooltipRef.current).style('opacity', 0)
      })

    svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .call((g) => g.selectAll('.domain').remove())

    svg
      .append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(null, 's'))
      .call((g) => g.selectAll('.domain').remove())
  }, [data])

  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <svg ref={svgRef} />
      <div ref={tooltipRef} />
    </div>
  )
}

export default StackedBarChart
