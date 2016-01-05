/**
 * Created by aftab on 12/27/2015.
 */
var canvas = document.getElementById("mycanvas")
var context = canvas.getContext('2d')

var posX = 0;
var posY = 0;

context.rect(0,0,canvas.width,canvas.height)
context.stroke();


function windowToCanvas(x,y)
{
    var box = canvas.getBoundingClientRect();

    return{
        x : (x-box.left) * (canvas.width / box.width),
        y : (y-box.top) * (canvas.height / box.height)
    };
}

//function windowToCanvas(canvas, x, y) {
//    var bbox = canvas.getBoundingClientRect();
//    return { x: x - bbox.left * (canvas.width  / bbox.width),
//        y: y - bbox.top  * (canvas.height / bbox.height)
//    };
//}

canvas.onmousemove = function(e)
{
    //earlier one
    posX = e.clientX;
    posY = e.clientY;

    //get position
    var loc = windowToCanvas(e.clientX,e.clientY)
    posX = loc.x;
    posY = loc.y;

    //draw boundary rect
    context.clearRect(0,0,canvas.width,canvas.height);
    context.rect(0,0,canvas.width,canvas.height)
    context.stroke();

    //draw horizontal and vertical lines
    context.beginPath();

    context.moveTo(posX,0)
    context.lineTo(posX,canvas.height)
    context.moveTo(0,posY)
    context.lineTo(canvas.width,posY)
    context.stroke();

    //text
    context.font = "30px Arial";
    var mystring = posX.toString() + "," + posY.toString();
    context.fillText(mystring,10,50);

    e.preventDefault();
}
