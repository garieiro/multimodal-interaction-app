import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const PieChart = ({ data }) => {
  const chartRef = useRef()
  const tooltipRef = useRef()

  useEffect(() => {
    d3.select(chartRef.current).selectAll('*').remove()

    if (!data || data.length === 0) {
      return <div>No data available</div>
    }
    const width = 928
    const height = width
    const radius = width / 3

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('display', 'block')
      .style('margin', 'auto')
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)

    const partition = d3.partition().size([2 * Math.PI, radius])

    const root = d3.hierarchy(data).sum((d) => d.value)

    partition(root)

    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .innerRadius((d) => d.y0)
      .outerRadius((d) => d.y1)

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

    svg
      .selectAll('path')
      .data(root.descendants().slice(1))
      .enter()
      .append('path')
      .attr('d', arc)
      .style('stroke', '#fff')
      .style('fill', (d) => color(d.data.name))
      .on('mouseover', function (event, d) {
        let tooltipText = ''
        if (d.depth === 1) {
          if (d.data.type) {
            tooltipText += `Type: ${d.data.type}<br/>`
          }
          if (d.data.name) {
            tooltipText += `Event Type: ${d.data.name}<br/>`
          }
          if (d.value) {
            tooltipText += `Count: ${d.value}`
          }
        } else if (d.depth === 2) {
          if (d.data.name) {
            tooltipText += `Semantic: ${d.data.name}<br/>`
          }
          if (d.value) {
            tooltipText += `Count: ${d.value}`
          }
        }

        tooltip
          .html(tooltipText)
          .style('opacity', 1)
          .style('visibility', 'visible')
          .style('position', 'fixed')
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
  }, [data])

  return (
    <>
      <svg ref={chartRef} style={{ width: '100%', height: '100%' }} />
      <div ref={tooltipRef} />
    </>
  )
}

export default PieChart
