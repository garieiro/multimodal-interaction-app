import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const PieChart = ({ data }) => {
  useEffect(() => {
    drawChart()
  }, [])

  const drawChart = () => {
    d3.select('#chart-container').selectAll('*').remove()

    const width = 400
    const height = 400
    const radius = Math.min(width, height) / 2 - 50

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const svg = d3
      .select('#chart-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
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

    svg
      .selectAll('path')
      .data(root.descendants().slice(1))
      .enter()
      .append('path')
      .attr('d', arc)
      .style('stroke', '#fff')
      .style('fill', (d) => color(d.data.name))
      .append('title')
      .text((d) => {
        let tooltipText = ''
        if (d.depth === 1) {
          if (d.data.type) {
            tooltipText += `Type: ${d.data.type}\n`
          }
          if (d.data.name) {
            tooltipText += `Event Type: ${d.data.name}\n`
          }
          if (d.value) {
            tooltipText += `Count: ${d.value}`
          }
        } else if (d.depth === 2) {
          if (d.data.name) {
            tooltipText += `Semantic: ${d.data.name}\n`
          }
          if (d.value) {
            tooltipText += `Count: ${d.value}`
          }
        }
        return tooltipText
      })

    /* const legendRectSize = 18
     const legendSpacing = 4

     const uniqueLegendData = root
       .descendants()
       .slice(1)
       .filter(
         (d, i, self) =>
           i ===
           self.findIndex(
             (t) => t.data.name === d.data.name && t.data.type === d.data.type
           )
       )

     const legend = svg
       .append('g')
       .selectAll('.legend')
       .data(uniqueLegendData)
       .enter()
       .append('g')
       .attr('class', 'legend')
       .attr('transform', (d, i) => {
         const height = legendRectSize + legendSpacing
         const offset = (height * color.domain().length) / 2
         const horz = radius + 40
         const vert = i * height - offset
         return `translate(${horz},${vert})`
       })

      legend
       .append('rect')
       .attr('width', legendRectSize)
       .attr('height', legendRectSize)
       .style('fill', (d) => color(d.data.name))
       .style('stroke', (d) => color(d.data.name))

     legend
       .append('text')
       .attr('x', legendRectSize + legendSpacing)
       .attr('y', legendRectSize - legendSpacing)
       .text((d) => {
         let semantic = d.data.name
         if (d.depth === 2) {
           if (semantic.length > 10) {
             semantic = semantic.substring(0, 10) + '...'
           }
         } else {
           semantic = `${semantic} (${d.data.type})`
         }
         return semantic
       })*/
  }

  return <div id="chart-container"></div>
}

export default PieChart
