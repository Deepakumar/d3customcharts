import * as d3 from 'd3'
import _ from 'underscore'

var data = [
    {date:new Date(2007,3,24), value:9},
    {date:new Date(2007,3,25),value:9},
    {date:new Date(2007,3,26),value:6},
    {date:new Date(2007,3,27),value:6},
    {date:new Date(2007,3,28),value:3},
    {date:new Date(2007,3,29),value:3}
];

var width = 800;
var height = 300;
var margin = {top:20,bottom:20,left:20,right:20};

//Extent
var xExtent = d3.extent(data,function(d){
    return d.date;
});
var xScale = d3.scaleTime().domain(xExtent).range([margin.left, width - margin.right]);

var yExtent = d3.extent(data,function(d){
    return d.value;
});
var yScale = d3.scaleLinear().domain(yExtent).range([height - margin.bottom, margin.top]);

var line = d3.line()
.x((d)=> { return xScale(d.date)})
.y((d)=> { return yScale(d.value)});

var svg = d3.select('svg')
.append('path')
.attr('d',line(data))
.style('fill','none')
.style('stroke','black')

d3.select("svg")
.attr("height",800)
.attr("width",800)