import * as d3 from 'd3'
import _ from 'underscore'

var city = "San Francisco";
var width = 800;
var height = 300;
var margin = {top:20,bottom:20,left:20,right:20};

function dataReady(data){
    //console.log(data);

    data.forEach(d => {
        console.log(d);
        // d.date = d3.timeParse("Y%m%d")(d.date);
        // console.log(d.date);
        d.date = new Date(d.date);
        console.log(d.date);
        // ++d[city];
    });

    //Scales
    var xExtent = d3.extent(data,function(d){
        console.log(d.date);
        return d.date;
    });
    console.log("X Extent:" + xExtent);
    var xScale = d3.scaleTime().domain(xExtent).range(margin.left, width - margin.right);

    var yExtent = d3.extent(data,d=>d[city]);
    console.log("y Extent:" + yExtent);
    var yScale = d3.scaleLinear().domain(yExtent).range([height - margin.bottom, margin.top]);

    //create the rectangles
    var svg = d3.select('svg');
    var rect = svg.selectAll('rect')
    .data(data).enter().append('rect')
    .attr('width',5)
    .attr("height",function(d){
        return height;
    })
    .attr('x',function(d){
        console.log(xScale(d.date));
        return xScale(d.date);
    })
    .attr('y',function(d){
        return yScale(d[city]);
    });

}

// Loading external data
d3.tsv('/data/rainfall.tsv', (error, dataset) => {
    dataReady(dataset);
  });