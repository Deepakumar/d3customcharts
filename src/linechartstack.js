import * as d3 from 'd3'
import _ from 'underscore'
import lodash from 'lodash'

var city = "San Francisco";
var width = 800;
var height = 800;
var margin = {top:20,bottom:20,left:20,right:20};

function dataReady(data){
    //console.log(data);

    d3.select("svg")
    .attr("height",height)
    .attr("width",width);

    data = data.slice(0,50);

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
    var yScale = d3.scaleLinear().domain(yExtent).range([height/2 - margin.bottom, margin.top]);


    //create the line
    var line = d3.line()
    .x(function(d){return xScale(d.date)})
    .y(function(d){return yScale(d[city])})
    .curve(d3.curveCatmullRom)

    var line1 = d3.line()
    .x(function(d){return xScale(d.date)})
    .y(function(d){return yScale(d[city])})
    .curve(d3.curveCatmullRom)


    var svg = d3.select('svg');
    svg.append('path')
    .attr('d',line(data))
    .attr('fill','none')
    .attr('stroke','blue')

    var svg = d3.select('svg');
    svg.append('path')
    .attr('d',line1(data))
    .attr('fill','none')
    .attr('stroke','blue')
    .attr('transform','translate(0,350)');
   

    //Define Axiis
    var xAxis = d3.axisBottom()
    .scale(xScale);
    var yAxis = d3.axisLeft()
    .scale(yScale);
    var yAxis1 = d3.axisLeft()
    .scale(yScale);

    svg.append('g')
    .attr('transform','translate(' + [0,height-margin.bottom] + ')')
    .call(xAxis);

    svg.append('g')
    .attr('transform', 'translate(' + [margin.left, 0] + ')')
    .call(yAxis);

    svg.append('g')
    .attr('transform', 'translate(' + [margin.left, 360] + ')')
    .call(yAxis);
    

}

// Loading external data
d3.tsv('/data/rainfall.tsv', (error, dataset) => {
    dataReady(dataset);
  });