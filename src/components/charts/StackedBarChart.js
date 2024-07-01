import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const StackedBarChart = ({ data }) => {
  const ref = useRef()

  useEffect(() => {
    const generateChart = (data) => {
      // Specify the chart’s dimensions.
      const width = 928
      const height = 500
      const marginTop = 10
      const marginRight = 10
      const marginBottom = 20
      const marginLeft = 40

      const groupedData = d3.group(data, (d) => d.name)

      const series = d3
        .stack()
        .keys(d3.union(data.map((d) => d.type)))
        .value(([, D], key) => (D.get(key) || { count: 0 }).count)(
        d3.index(
          data,
          (d) => d.name,
          (d) => d.type
        )
      )

      const x = d3
        .scaleBand()
        .domain([...groupedData.keys()])
        .range([marginLeft, width - marginRight])
        .padding(0.1)

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1]))])
        .rangeRound([height - marginBottom, marginTop])

      const color = d3
        .scaleOrdinal()
        .domain(series.map((d) => d.key))
        .range(d3.schemeSpectral[series.length])
        .unknown('#ccc')

      const svg = d3
        .create('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('style', 'max-width: 100%; height: auto;')

      svg
        .append('g')
        .selectAll('g')
        .data(series)
        .join('g')
        .attr('fill', (d) => color(d.key))
        .selectAll('rect')
        .data((d) => d)
        .join('rect')
        .attr('x', (d) => x(d.data[0]))
        .attr('y', (d) => y(d[1]))
        .attr('height', (d) => y(d[0]) - y(d[1]))
        .attr('width', x.bandwidth())
        .append('title')
        .text((d) => {
          const name = d.data[0]
          const types = d.data[1]

          let type
          types.forEach((value, key) => {
            if (value.count === d[1] - d[0] && !type) {
              type = key
              types.delete(key)
            }
          })

          return `Experience: ${name}\nType: ${type}\nCount: ${d[1] - d[0]} Events`
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

      return svg.node()
    }

    if (data && data.length > 0) {
      d3.select(ref.current).selectAll('*').remove()
      const svg = generateChart(data)
      ref.current.appendChild(svg)
    }
  }, [data])

  return <div ref={ref}></div>
}

export default StackedBarChart
