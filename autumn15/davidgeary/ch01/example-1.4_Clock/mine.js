
/**
 * Created by aftab on 12/27/2015.
 */
var canvas = document.getElementById("mycanvas")
var context =canvas.getContext('2d')

var centerX = 250;
var centerY = 250;

context.beginPath();
context.arc(centerX,centerY,200,0,2*Math.PI)
context.stroke();

draw()

function draw()
{
    /* getting current time */
    var d = new Date();
    var hour = d.getHours();
    if(hour > 12)
        hour -= 12;
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();


}