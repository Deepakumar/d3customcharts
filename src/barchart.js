import * as d3 from 'd3'
import _ from 'underscore'

var city = "San Francisco";
var width = 800;
var height = 300;
var margin = {top:20,bottom:20,left:20,right:20};

function dataReady(data){
    //console.log(data);

    d3.select("svg")
    .attr("height",height)
    .attr("width",width);

    data.forEach(d => {
         var parseTime = d3.timeParse("%Y%m%d");
        var d3date = parseTime(d.date);
        d.date = new Date(d3date);
    });

    //Scales
    var xExtent = d3.extent(data,function(d){
        //console.log(d.date);
        return d.date;
    });
    //console.log("X Extent:" + xExtent);
    var xScale = d3.scaleTime().domain(xExtent).range([margin.left, width - margin.right]);

    var yExtent = d3.extent(data,d=>d[city]);
   //console.log("y Extent:" + yExtent);
    var yScale = d3.scaleLinear().domain(yExtent).range([height - margin.bottom, margin.top]);

    var heightScale = d3.scaleLinear().domain(yExtent)
    .range([0, height - margin.top - margin.bottom])

    //create the rectangles
    var svg = d3.select('svg');
    var rect = svg.selectAll('rect')
    .data(data).enter().append('rect')
    .attr('width',5)
    .attr("height",function(d){
        return heightScale(d[city]);
    })
    .attr('x',function(d,i){
        return xScale(d.date);
    })
    .attr('y',function(d){
        return yScale(d[city]);
    })
    .attr('fill', 'blue')
    .attr('stroke','white')

    //Define Axiis
    var xAxis = d3.axisBottom()
    .scale(xScale);
    var yAxis = d3.axisLeft()
    .scale(yScale);

    svg.append('g')
    .attr('transform','translate(' + [0,height-margin.bottom] + ')')
    .call(xAxis);

    svg.append('g')
    .attr('transform', 'translate(' + [margin.left, 0] + ')')
    .call(yAxis);
    

}

// Loading external data
d3.tsv('/data/rainfall.tsv', (error, dataset) => {
    dataReady(dataset);
  });