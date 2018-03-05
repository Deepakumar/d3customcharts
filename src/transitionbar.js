import * as d3 from 'd3'
import _ from 'underscore'

var rectwidth = 100;
var height = 300;
var data = [
    [100,250,175,200,120],
    [230,120,300,145,75,250],
    [240,250,100]
];

var t = d3.transition().duration(1000);
var colors = d3.scaleOrdinal(d3.schemeCategory10);
var svg = d3.select('svg');

function updateBars(data){
    var bars = svg.selectAll('react')
    .data(data,d=>d);

    //exit
    bars.exit().transition(t)
    .attr('y','height')
    .attr('height',0)
    .remove();

    //enter
    var enter = bars.enter().append('rect')
    .attr('width',rectwidth)
    .attr('stroke',"#fff")
    .attr('y',height);

    //enter + Update
    bars = enter.merge(bars)
    .attr('fill',d=>colors(d))
    .attr('x',(d,i)=> i *rectwidth)
    .transition(t)
    .attr('x',(d,i)=> i *rectwidth)
    .attr('y',d=>height -d)
    .attr('height',d=>d);
}

var index = 0;
setInterval(()=> {
    updateBars(data[index % 3]);
    index +=1;
},750);