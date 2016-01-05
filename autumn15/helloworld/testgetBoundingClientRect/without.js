/**
 * Created by aftab on 12/30/2015.
 */
var canvas = document.getElementById("mycanvas")
var context = canvas.getContext('2d')

function windowToCanvas(x,y)
{
    var box = canvas.getBoundingClientRect();

    return{
        x : (x-box.left) * (canvas.width / box.width),
        y : (y-box.top) * (canvas.height / box.height)
    };
}

context.font = "30px Arial";

var posX = 50;
var posY = 50;

var loc = windowToCanvas(50,50)
var posX = loc.x;
var posY = loc.y;
context.fillText("Hello World!",posX,posY)