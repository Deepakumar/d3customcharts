import * as d3 from 'd3'
import _ from 'underscore'

var rectwidth = 50;
var height = 300;
var data =[10,40,60,200,40];

var svg=d3.select('svg');

var enter = svg.selectAll("rect")
.data(data)
.enter().append("rect")
.attr("x",(d,i)=> i * rectwidth)
.attr("y",d=> 0)
.attr("width",rectwidth - 5 )
.attr("height",d=> d)
.attr("fill",function(d,i){
    if(d >= 200){
        return "red";
    }else {
        return "blue";
    }
})
.attr("stroke","#fff")

console.log(enter);
console.log(enter.nodes());
console.log(enter.data())