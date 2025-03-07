import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const TimelineChart = ({ data, eventColor }) => {
  const svgRef = useRef()
  const tooltipRef = useRef()

  useEffect(() => {
    if (data && data.length > 0 && tooltipRef) {
      drawTimeline(data)
    }
  }, [data, tooltipRef])

  const drawTimeline = (data) => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const margin = { top: 20, right: 15, bottom: 30, left: 100 }
    const width = +svg.attr('width') - margin.left - margin.right
    const height = +svg.attr('height') - margin.top - margin.bottom

    const x = d3
      .scaleTime()
      .domain([
        d3.min(data, (d) => d3.min(d.times, (t) => new Date(t.starting_time))),
        d3.max(data, (d) => d3.max(d.times, (t) => new Date(t.ending_time))),
      ])
      .range([0, width])

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, height])
      .padding(0.1)

    const xAxis = svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${margin.left},${height + margin.top})`)
      .call(d3.axisBottom(x).ticks(10))

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(y))

    const eventsGroup = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .selectAll('g.event-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'event-group')
      .attr('transform', (d) => `translate(0, ${y(d.label)})`)

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

    eventsGroup
      .selectAll('rect')
      .data((d) => d.times)
      .enter()
      .append('rect')
      .attr('class', 'event-rect')
      .attr('x', (d) => x(new Date(d.starting_time)))
      .attr('y', 0)
      .attr('width', (d) =>
        Math.max(0, x(new Date(d.ending_time)) - x(new Date(d.starting_time)))
      )
      .attr('height', y.bandwidth())
      .attr('fill', (d, i) =>
        eventColor ? eventColor : d3.schemeCategory10[i % 10]
      )
      .on('mouseover', function (event, d) {
        console.log('Tooltip triggered')

        const startTime = new Date(d.starting_time)
        const endTime = new Date(d.ending_time)
        const durationInMs = endTime - startTime

        const durationInSeconds = Math.floor(durationInMs / 1000)
        const hours = Math.floor(durationInSeconds / 3600)
        const minutes = Math.floor((durationInSeconds % 3600) / 60)
        const seconds = durationInSeconds % 60

        tooltip
          .html(
            `Start: ${startTime.toLocaleString()}<br/>End: ${endTime.toLocaleString()}<br/>Duration: ${hours}h ${minutes}m ${seconds}s`
          )
          .style('opacity', 1)
          .style('visibility', 'visible')
          .style('position', 'fixed')
          .style('left', '50px')
          .style('top', '50px')
          .style('z-index', '9999')
      })
      .on('mouseout', function () {
        tooltip.style('opacity', 0).style('visibility', 'hidden')
      })

      .on('mousemove', (event) => {
        tooltip
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 30}px`)
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0)
      })

    const zoomBehavior = d3
      .zoom()
      .scaleExtent([-10, 20])
      .on('zoom', (event) => {
        const newX = event.transform.rescaleX(x)

        xAxis.call(d3.axisBottom(newX).ticks(10))

        eventsGroup
          .selectAll('rect')
          .attr('x', (d) => newX(new Date(d.starting_time)))
          .attr('width', (d) =>
            Math.max(
              0,
              newX(new Date(d.ending_time)) - newX(new Date(d.starting_time))
            )
          )
      })

    const initialZoom = d3.zoomIdentity
      .scale(10)
      .translate(
        -x(d3.min(data, (d) => d3.min(d.times, (t) => t.starting_time))) * 2,
        0
      )

    svg.call(zoomBehavior).call(zoomBehavior.transform, initialZoom)
  }

  return (
    <>
      <svg ref={svgRef} width={1300} height={400}></svg>
      <div ref={tooltipRef} />
    </>
  )
}

export default TimelineChart
