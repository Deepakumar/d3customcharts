import * as d3 from 'd3'
import _ from 'underscore'

var rectwidth = 50;
var height = 200;
var data = [100,250,175,200,20];

var svg = d3.select("body")
                    .append("svg");

                    svg.selectAll("rect")            
                    .data(data)
                    .enter().append('rect')
                    .attr('x',(d,i)=>i * rectwidth)
                    .attr('y',d=>height -d)
                    .attr('width',rectwidth - 10)
                    .attr('height',d=>d)
                    .attr("fill",'blue')
