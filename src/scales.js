import * as d3 from 'd3'
import _ from 'underscore'


var rectwidth = 50;
var height = 300;

function dataReady(data){

  var max = d3.max(data,d =>d.Population);
  var min = d3.min(data,d =>d.Population);
  var extent = d3.extent(data, d=> d.Population);
  console.log(extent);

  //try difrent scales, changes the ranges, see what happens
  var yScale = d3.scaleLinear().domain(extent)
  .range([height,0]);

  //try passing in tick valuess
  var yAxis = d3.axisLeft().scale(yScale).ticks(20, "s").tickPadding(10);


  d3.select("svg")
  .attr("width",600)
  .attr("height",600)
  .append("g")
  .attr('transform','translate(80,60)')
  .call(yAxis);

  d3.select("svg").selectAll(".tick").selectAll("text").attr("fill",function(d,i){
    if (d > 50000){
      return "red"
    }
    else {
      return "blue";
    }
  });


}











// Loading external data
d3.csv('/data/population.csv', (error, dataset) => {
    dataReady(dataset);
  });

