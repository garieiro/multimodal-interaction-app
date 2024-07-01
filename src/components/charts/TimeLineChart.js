import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const TimelineChart = ({
  data,
  handleLabelClick,
  onDataReceived,
  onWordDataReceived,
  onExpDataReceived,
  eventColor,
}) => {
  const svgRef = useRef()

  useEffect(() => {
    if (data) {
      drawTimeline(data)
    }
  }, [data, eventColor])

  const drawTimeline = (data) => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const margin = { top: 20, right: 15, bottom: 30, left: 100 }
    const width = +svg.attr('width') - margin.left - margin.right
    const height = +svg.attr('height') - margin.top - margin.bottom

    const x = d3
      .scaleTime()
      .domain([
        d3.min(data, (d) => d3.min(d.times, (t) => t.starting_time)),
        d3.max(data, (d) => d3.max(d.times, (t) => t.ending_time)),
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
      .call(d3.axisBottom(x).tickSizeOuter(0))

    const yAxis = svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(y).tickSize(0).tickPadding(6))

    const barsGroup = svg
      .append('g')
      .attr('class', 'bars-group')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Define a color scale
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

    const eventsGroup = barsGroup
      .selectAll('g')
      .data(data)
      .join('g')
      .attr('class', 'event-group')
      .selectAll('rect')
      .data((d) => d.times)
      .join('rect')
      .attr('class', 'event-rect')
      .attr('x', (d) => x(d.starting_time))
      .attr('y', (d) => y(data.find((p) => p.times.includes(d)).label))
      .attr('width', (d) => x(d.ending_time) - x(d.starting_time))
      .attr('height', y.bandwidth())
      .attr('fill', (d, i) => {
        if (eventColor.length > 0) {
          let color = '#636363'
          data.forEach((event) => {
            event.times.forEach((time) => {
              if (time === d && event.type === eventColor) {
                color = colorScale(i)
              }
            })
          })
          return color
        } else {
          return colorScale(i)
        }
      })

    yAxis.selectAll('text').remove()

    yAxis
      .selectAll('foreignObject')
      .data(data)
      .enter()
      .append('foreignObject')
      .attr('x', -margin.left)
      .attr('y', (d) => y(d.label))
      .attr('width', margin.left - 10)
      .attr('height', y.bandwidth())
      .append('xhtml:div')
      .html(
        (d) =>
          `<button class="btn btn-dark d-flex align-items-center justify-content-center" style="width:100%; height:${y.bandwidth()}px; padding-top:10px; padding-bottom:10px;">${d.label}</button>`
      )

      .on('click', (event, d) => {
        handleLabelClick(d.label)
        const expName = d.label
        const expIndex = parseInt(expName.match(/\d+/)[0]) - 1

        if (!isNaN(expIndex)) {
          fetch(`http://127.0.0.1:5000/events/expDurations?exp=${expIndex}`)
            .then((response) => response.json())
            .then((receivedData) => {
              onDataReceived(receivedData)
            })
            .catch((error) => {
              console.error('Erro ao fazer solicitação à API:', error)
            })

          fetch(`http://127.0.0.1:5000/events/words?exp=${expIndex}`)
            .then((response) => response.json())
            .then((wordsData) => {
              onWordDataReceived(wordsData)
            })
            .catch((error) => {
              console.error('Erro ao fagzer solicitação à API:', error)
            })

          fetch(`http://127.0.0.1:5000/events/exps`)
            .then((response) => response.json())
            .then((expData) => {
              onExpDataReceived(expData)
            })
            .catch((error) => {
              console.error('Erro ao fazer solicitação à API:', error)
            })
        }
      })

    const zoomBehavior = d3
      .zoom()
      .scaleExtent([1, 10])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .extent([
        [0, 0],
        [width, height],
      ])
      .on('zoom', (event) => {
        const newX = event.transform.rescaleX(x)
        xAxis.call(d3.axisBottom(newX).tickSizeOuter(0))

        eventsGroup
          .attr('x', (d) => newX(d.starting_time))
          .attr('width', (d) => newX(d.ending_time) - newX(d.starting_time))
      })

    svg.call(zoomBehavior)
  }

  return <svg ref={svgRef} width={1300} height={400}></svg>
}

export default TimelineChart
