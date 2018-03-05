import * as d3 from 'd3'
import _ from 'underscore'

var i = 50;

d3.select("body").transition(10000000).style("color","red");

d3.select(".text1")
.style("color","green")
.transition(1000)
.style("color","red");

d3.select(".text2")
.transition(1000)
.delay(750)
.on("start", function() { d3.select(this).style("color", "green"); })
.style("color", "red");

d3.select(".text3")
.transition(1000)
.styleTween("color",function(){
    return d3.interpolate("green","red");
});