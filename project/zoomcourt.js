/**
 * Created by aftab on 1/13/2016.
 */
var canvas = document.getElementById("mycanvas")
var context = canvas.getContext('2d')

var img = new Image();
img.src = "./court.jpg"
img.onload = function(e)
{
    console.log("loading image...")
}

var factor = 1;
/*var drawTracker = requestAnimationFrame(draw)
function draw()
{
    console.log("inside draw with factor == "+factor)
    context.drawImage(img,0,0,canvas.width,factor*canvas.height,0,0,canvas.width,canvas.height);

    if((factor - 0.1) > 0.1)
    {
        factor -= 0.1;
        requestAnimationFrame(draw)
    }
    else
        cancelAnimationFrame(drawTracker)
}*/

function draw()
{
    console.log("inside draw with factor == "+factor)
    context.drawImage(img,0,0,canvas.width,factor*canvas.height,0,0,canvas.width,canvas.height);

    if((factor - 0.1) > 0.11)
    {
        factor -= 0.1;
    }
    else
        clearInterval(drawTracker)
}
var drawTracker = setInterval(draw,200)