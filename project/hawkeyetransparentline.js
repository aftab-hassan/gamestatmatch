/**
 * Created by aftab on 1/5/2016.
 */
var canvas = document.getElementById('mycanvas')
var context = canvas.getContext("2d")

var startx = 620;
var starty = 300;
var endx = 564;
var endy = 85;
var posx = startx;
var posy = starty;

var previoustime = Date.now();
var balltracker;

/* Remember, it's 910 * 512 */
/*
 (325,81) (562,81)


 (199,327) (690,325)
 */

if(starty < endy)
    balltracker = requestAnimationFrame(balltrajectoryupdown)
else
    balltracker = requestAnimationFrame(balltrajectorydownup)

function balltrajectoryupdown()
{
    balltrajectory("updown")
}

function balltrajectorydownup()
{
    balltrajectory("downup")
}

function balltrajectory(direction)
{
    /* ending condition */
    if(direction == "updown")
    {
        if(posy >= endy)
        {
            cancelAnimationFrame(balltracker);
            return;
        }
    }
    else if(direction == "downup")
    {
        if(posy <= endy)
        {
            cancelAnimationFrame(balltracker);
            return;
        }
    }

    /* crital */
    /* ball */
    context.globalAlpha = 1;
    console.log("inside balltrajectory")
    context.clearRect(0,0,canvas.width,canvas.height);
    context.beginPath();
    context.fillStyle = "yellow"
    //console.log("posx=="+posx+" posy=="+posy)
    context.arc(posx,posy,8,0,2*Math.PI)
    context.fill();

    /* line streak */
    context.globalAlpha = 0.30;
    context.strokeStyle = '#FFFF9e'
    context.lineWidth = 15;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(startx,starty)
    context.lineTo(posx,posy+4)
    context.fill();
    //context.globalCompositeOperation = 'destination-atop';
    context.stroke();

    /* setting up ball position for next frame */
    var currenttime = Date.now();
    var timeforframe = currenttime - previoustime;
    previoustime = currenttime;
    var fps = 1000/timeforframe;

    var incx = (endx - startx)/fps;
    var incy = (endy - starty)/fps;
    //console.log("incx == "+incx + " incy=="+incy + "fps == "+fps)

    posx = posx + incx;
    posy = posy + incy;
    //console.log("direction=="+direction)
    //console.log("posx=="+posx+" posy=="+posy)

    if(direction == "updown")
        requestAnimationFrame(balltrajectoryupdown)
    else if(direction == "downup")
        requestAnimationFrame(balltrajectorydownup)
}