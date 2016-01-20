/**
 * Created by aftab on 1/14/2016.
 */
var canvas = document.getElementById("mycanvas")
var context = canvas.getContext('2d')

var img = new Image();
img.src = "./images/coin-sprite-animation.png"
img.onload = function()
{
    requestAnimationFrame(update)
}

function loop()
{
    update();
    draw();
    requestAnimationFrame(loop)
}

var tickcount = 0;
var framecount = 0;

function update()
{
    context.clearRect(0,0,canvas.width,canvas.height)
    tickcount++;

    if(tickcount%4 == 0)
        framecount++;

    if(framecount == 10)framecount=0;
}

function draw()
{
    //context.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh)
    context.drawImage(img,framecount*100,0,100,100,0,0,100,100)
}

console.log("this is actually my code")
loop();