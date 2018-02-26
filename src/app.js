import * as d3 from 'd3'
import _ from 'underscore'

console.log("ddddddddddddddd");
console.log(_.now());

// Selecting and appending elements
d3.select('#root')
  .append('h5')
  .append('text')
  .text(`D3 version: ${d3.version}`);

  var data = [
    {
       "points": 30,
       "sprint": 1
   },
   {
    "points": 15,
    "sprint": 2
  },
  {
    "points": 20,
    "sprint": 3
},
{
  "points": 17,
  "sprint": 4
}
    ]



    var width = 400;
    var height = 200;
    //Create SVG Element
    var svg = d3.select("#root")
    .append("svg")
    .attr("width",width)
    .attr("height",height);

    var ylist = _.pluck(data,"points"),xlist = _.pluck(data,"sprint");
    console.log(ylist);
    console.log(xlist);

    var yscale = d3.scaleLinear().domain(d3.min(ylist),d3.max(ylist)).range([0,width-100]), xscale =  d3.scaleLinear().domain(d3.min(xlist),d3.max(xlist)).range([0,height-100]);

    //var y_asis = d3.axisLeft().scale(yscale);
    var x_asis = d3.axisBottom().scale(xscale);

    var xAxisTranslate = height/2 + 10;



    svg.append("g").attr("transform", "translate(50, " + xAxisTranslate  +")").call(x_asis);
    //svg.append("g").call(y_asis);
  

// Loading external data
d3.csv('/data/sample.csv', (error, dataset) => {
  dataset.forEach((data) => {
    console.log(data)
  })
})
