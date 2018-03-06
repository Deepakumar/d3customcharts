import * as d3 from 'd3'
import _ from 'underscore'
import lodash from 'lodash'

const rectWidth = 50;
    const height = 300;
    const data = [
      [100, 250, 175, 200, 120],
      [230, 120, 300, 145, 75, 250],
      [240, 250, 100]
    ];
    
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const svg = d3.select('svg')
    .attr("width",400)
    .attr("height",400)
    
    function updateBars(data) {
      let bars = svg.selectAll('rect')
        .data(data, d => d); // key function

        console.dir(bars);

      // exit
      bars.exit().remove();

      // enter
      const enter = bars.enter().append('rect')
        .attr('width', rectWidth)
        .attr('stroke', '#fff')
        .attr('fill','blue')
        .attr('transform','translate([200],0])')

      // enter + update
      bars = enter.merge(bars)
        .attr('x', (d, i) => i * rectWidth)
	      .attr('y', d => height)
        .attr('fill', d => colors(d))
      	.transition()
	      .attr('y', d => height - d)
      	.attr('height', d => d);
    }

    updateBars(data[0]);

    let index = 2;
    setInterval(() => {
      updateBars(data[index % 3]);
      index += 1;
    }, 2000);