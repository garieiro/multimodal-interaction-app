import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import d3Cloud from 'd3-cloud'

const WordCloud = ({ data }) => {
  const svgRef = useRef()
  const containerRef = useRef()
  const tooltipRef = useRef()

  useEffect(() => {
    const renderCloud = (containerWidth, containerHeight) => {
      d3.select(svgRef.current).selectAll('*').remove()

      const words = data.map((word) => ({
        text: word.text,
        size: word.value,
      }))

      const fontFamily = 'sans-serif'
      const fontScale = 10
      const fill = '#000'
      const maxFontSize = 100

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

      const cloud = d3Cloud()
        .size([containerWidth, containerHeight])
        .words(words)
        .padding(5)
        .rotate(() => 0)
        .font(fontFamily)
        .fontSize((d) => Math.min(d.size, maxFontSize))
        .on('end', draw)

      cloud.start()

      function draw(words) {
        const svg = d3.select(svgRef.current)

        svg
          .attr('viewBox', [0, 0, containerWidth, containerHeight])
          .attr('width', containerWidth)
          .attr('height', containerHeight)
          .attr('font-family', fontFamily)
          .attr('text-anchor', 'middle')
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .attr('font-size', (d) => d.size)
          .attr('fill', fill)
          .attr(
            'transform',
            (d) =>
              `translate(${d.x + containerWidth / 2},${d.y + containerHeight / 2})`
          )
          .text((d) => d.text)
          .on('mouseover', function (event, d) {
            tooltip
              .html(`${d.text}: ${d.size} occurrences`)
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
      }
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        renderCloud(width, height)
      }
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      renderCloud(width, height)
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [data])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
      <div ref={tooltipRef} />
    </div>
  )
}

export default WordCloud
