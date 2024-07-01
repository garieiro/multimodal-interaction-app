import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import d3Cloud from 'd3-cloud'

const WordCloud = ({ data }) => {
  const svgRef = useRef()

  useEffect(() => {
    d3.select(svgRef.current).selectAll('*').remove()
    const words = data.map((word) => ({ text: word.text, size: word.value }))

    const containerWidth = 450
    const containerHeight = 450

    const fontFamily = 'sans-serif'
    const fontScale = 15
    const fill = '#000'

    const cloud = d3Cloud()
      .size([containerWidth, containerHeight])
      .words(words)
      .padding(5)
      .rotate(() => 0)
      .font(fontFamily)
      .fontSize((d) => Math.sqrt(d.size) * fontScale)
      .random(() => 0.5)
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
        .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
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
    }
  }, [data])

  return <svg ref={svgRef}></svg>
}

export default WordCloud
