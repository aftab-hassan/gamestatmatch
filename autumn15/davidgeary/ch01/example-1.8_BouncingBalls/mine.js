/**
 * Created by aftab on 12/27/2015.
 */
var canvas = document.getElementById("mycanvas")
var context = canvas.getContext('2d')

var circles = [];

for(var i = 0;i<100;i++)
{
    circles[i] = {
        posX : 100,
        posY : 100,
        incX : 3 * Math.random(),
        incY : 4 * Math.random(),
        radius : 50 * Math.random()
    }
}

/* This call repea*/
setInterval(controller,1000/60)

function controller()
{
    context.clearRect(0,0,canvas.width,canvas.height);

    circles.forEach(function (circle) {
        context.beginPath();
        context.arc(circle.posX,circle.posY,circle.radius,0,Math.PI*2, false)
        changeXY(circle,circle.incX,circle.incY)
        context.strokeStyle = "green"
        context.stroke();
    })
}

function changeXY(circle, incX, incY)
{
    /*Remember, It's not >= canvas.width or >= canvas.height , == is fine
    * Remember, It's not <= 0, == is fine*/
    if(circle.posX + circle.radius + circle.incX > canvas.width || circle.posX - circle.radius + circle.incX < 0)
        circle.incX = -circle.incX

    if(circle.posY + circle.radius + circle.incY > canvas.height || circle.posY - circle.radius + circle.incY < 0)
        circle.incY = -circle.incY

    circle.posX += circle.incX;
    circle.posY += circle.incY;
}