import * as d3 from 'd3'
import _ from 'underscore'

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



    var widthXY = 400, heightXY = 600;
    var xlist = _.pluck(data,"sprint");
    var ylist = _.pluck(data,"points");

    var dataXY = [10, 15, 20, 25, 30];
    var svg = d3.select("#root")
                .append("svg")
                .attr("width", widthXY)
                .attr("height", 1200);

    var xscaleXY = d3.scaleLinear()
                   .domain([0, d3.max(xlist)])
                   .range([0, widthXY - 100]);

    var yscaleXY = d3.scaleLinear()
                   .domain([0, d3.max(ylist)])
                   .range([heightXY/2, 0]);

    var x_axisXY = d3.axisBottom()
                   .scale(xscaleXY);

    var y_axisXY = d3.axisLeft()
                   .scale(yscaleXY);

    svg.append("g")
       .attr("transform", "translate(50, 10)")
       .call(y_axisXY);

       svg.append("g")
       .attr("transform", "translate(50,-200)").attr("y1",heightXY)
       .call(y_axisXY);

    var xAxisTranslateXY = heightXY/2 + 10;

    svg.append("g")
            .attr("transform", "translate(50, " + xAxisTranslateXY  +")")
            .call(x_axisXY)
  

// Loading external data
d3.csv('/data/sample.csv', (error, dataset) => {
  dataset.forEach((data) => {
    console.log(data)
  })
})
