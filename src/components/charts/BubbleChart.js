import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const BubbleChart = ({ data }) => {
  const svgRef = useRef(null)
  const wrapperRef = useRef(null)
  const tooltipRef = useRef(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    const renderChart = () => {
      svg.selectAll('*').remove()

      const { width, height } = wrapperRef.current.getBoundingClientRect()
      const diameter = Math.min(width, height)

      if (!data || data.length === 0 || diameter === 0) return

      const color = d3
        .scaleOrdinal()
        .range([
          '#1f77b4',
          '#ff7f0e',
          '#2ca02c',
          '#d62728',
          '#9467bd',
          '#8c564b',
        ])

      const bubble = d3.pack().size([diameter, diameter]).padding(1.5)

      svg
        .attr('width', diameter)
        .attr('height', diameter)
        .attr('class', 'bubble')

      const nodes = d3.hierarchy({ children: data }).sum(function (d) {
        return d.duration
      })

      const tooltip = d3
        .select(tooltipRef.current)
        .style('opacity', 0)
        .style('pointer-events', 'none')
        .style('background', 'rgba(0,0,0,0.9)')
        .style('border', '1px solid black')
        .style('padding', '5px')
        .style('border-radius', '4px')
        .style('font-size', '12px')
        .style('z-index', '10')

      const node = svg
        .selectAll('.node')
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function (d) {
          return !d.children
        })
        .append('g')
        .attr('class', 'node')
        .attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')'
        })
        .on('mouseover', function (event, d) {
          tooltip
            .html(
              `EventType: ${d.data.Name}<br/>Duration: ${d.data.duration} seconds`
            )
            .style('opacity', 1)
            .style('visibility', 'visible')
            .style('position', 'fixed')
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 30}px`)
        })
        .on('mousemove', function (event) {
          tooltip
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 30}px`)
        })
        .on('mouseout', function () {
          tooltip.style('opacity', 0)
        })

      node
        .append('circle')
        .attr('r', function (d) {
          return d.r
        })
        .style('fill', function (d, i) {
          return color(i)
        })

      node
        .append('text')
        .attr('dy', '.2em')
        .style('text-anchor', 'middle')
        .text(function (d) {
          return d.data.Name && typeof d.data.Name === 'string'
            ? d.data.Name.substring(0, d.r / 3)
            : ''
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', function (d) {
          return d.r / 5
        })
        .attr('fill', 'white')

      node
        .append('text')
        .attr('dy', '1.3em')
        .style('text-anchor', 'middle')
        .text(function (d) {
          return d.data.duration
        })
        .attr('font-family', 'Gill Sans, Gill Sans MT')
        .attr('font-size', function (d) {
          return d.r / 5
        })
        .attr('fill', 'white')

      const legendData = [...new Set(data.map((item) => item.eventType))]
      const legend = svg
        .append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(20,' + (diameter + 20) + ')')

      legend
        .selectAll('rect')
        .data(legendData)
        .enter()
        .append('rect')
        .attr('x', function (d, i) {
          return i * 120
        })
        .attr('y', 0)
        .attr('width', 10)
        .attr('height', 10)
        .style('fill', function (d) {
          return color(d)
        })

      legend
        .selectAll('text')
        .data(legendData)
        .enter()
        .append('text')
        .attr('x', function (d, i) {
          return 15 + i * 120
        })
        .attr('y', 10)
        .attr('dy', '.35em')
        .style('text-anchor', 'start')
        .text(function (d) {
          return d
        })
    }

    renderChart()

    window.addEventListener('resize', renderChart)
    return () => window.removeEventListener('resize', renderChart)
  }, [data])

  return (
    <div
      ref={wrapperRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <svg ref={svgRef} />
      <div ref={tooltipRef} />
    </div>
  )
}

export default BubbleChart
