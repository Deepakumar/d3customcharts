import * as d3 from 'd3'
import _ from 'underscore'

var width = 800;
var height = 400;

const colors = d3.scaleOrdinal(d3.schemeCategory10);
    const data = [1, 1, 2, 14, 11, 3, 5, 8, 13, 21];
    const pies = d3.pie()(data);
    //console.log(pies);

    const arc = d3.arc()
    	.innerRadius(0)
    	.outerRadius(150)
    	.startAngle(d => d.startAngle)
        .endAngle(d => d.endAngle);
        console.log(arc);
    
    const svg = d3.select('svg')
    	.append('g')
    	.attr('transform', 'translate(200,200)');
    
    svg.selectAll('path')
    	.data(pies).enter().append('path')
    	.attr('d', function(d) { return arc(d) })
    	.attr('fill', (d, i) => colors(d.value))
        .attr('stroke', '#fff');
        

        d3.select('svg')
        .attr('height',height)
        .attr('width',width)