import React, { useEffect } from 'react'
import * as d3 from 'd3'
import { sankey as d3Sankey, sankeyLeft, sankeyLinkHorizontal } from 'd3-sankey'

const SankeyChart = ({ data }) => {
  useEffect(() => {
    const width = 928
    const height = 600
    const format = d3.format(',.0f')

    const svg = d3
      .select('#sankey-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;')

    const sankey = d3Sankey()
      .nodeId((d) => d.name)
      .nodeAlign(sankeyLeft)
      .nodeWidth(15)
      .nodePadding(10)
      .extent([
        [1, 5],
        [width - 1, height - 5],
      ])

    const { nodes, links } = sankey({
      nodes: data.nodes.map((d) => Object.assign({}, d)),
      links: data.links.map((d) => Object.assign({}, d)),
    })

    const color = d3.scaleOrdinal(d3.schemeCategory10)

    const rect = svg
      .append('g')
      .attr('stroke', '#000')
      .selectAll('rect')
      .data(nodes)
      .enter()
      .append('rect')
      .attr('x', (d) => d.x0)
      .attr('y', (d) => d.y0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('width', (d) => d.x1 - d.x0)
      .attr('fill', (d) => color(d.category))

    rect.append('title').text((d) => `${d.name}\n${format(d.value)} TWh`)

    const link = svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke-opacity', 0.5)
      .selectAll('path')
      .data(links)
      .enter()
      .append('g')
      .style('mix-blend-mode', 'multiply')

    link
      .append('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', '#000')
      .attr('stroke-width', (d) => Math.max(1, d.width))

    link
      .append('title')
      .text(
        (d) => `${d.source.name} → ${d.target.name}\n${format(d.value)} TWh`
      )

    svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('x', (d) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
      .attr('y', (d) => (d.y1 + d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d) => (d.x0 < width / 2 ? 'start' : 'end'))
      .text((d) => d.name)
  }, [data])

  return <div id="sankey-chart"></div>
}

export default SankeyChart
