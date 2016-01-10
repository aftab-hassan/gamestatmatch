/**
 * Created by aftab on 1/5/2016.
 */
var canvas = document.getElementById("mycanvas")
var context = canvas.getContext('2d')

var posX = -1;
var posY = -1;
var previoustime = Date.now();
var timeinterval = 0;
var fps = 0;
var incx = 0;
var incy = 0;

/* Remember, it's 910 * 512 */
/*
 (325,81) (562,81)


 (199,327) (690,325)
 */
//canvas.onmousemove = function(e)
//{
//    context.clearRect(0,0,canvas.width,canvas.height)
//    var position = e.clientX + " " + e.clientY;
//
//    context.font = "30px Arial"
//    context.fillText(position,100,100)
//}

var starttime = Date.now();
var ball1tracker = setInterval(ball1,60)
var ball2tracker = 0;

function ball1()
{
    var startx = 325;
    var starty = 81;
    var endx = 690;
    var endy = 325;



    //endx-startx should be the distance covered across the entire duration
    //duration = x frames
    //so basically in x frames, endx-startx should be the distance covered

    //frame rate = frames per second, or frames per 1000 ms
    //between two frames, duration = say 2ms
    //so number of frames = 1000/2 = 500 frames per second

    var currenttime = Date.now()
    timeinterval = currenttime - previoustime;
    previoustime = currenttime;

    fps = 1000/timeinterval;
    //fps /= 10
    //fps *= 10
    console.log("fps=="+fps)
    incx = (endx - startx)/fps;
    incy = (endy - starty)/fps;

    console.log("incx=="+incx+"incy=="+incy)
    console.log("\n")

    context.clearRect(0,0,canvas.width,canvas.height);
    context.beginPath();
    context.fillStyle = "yellow"

    if(posX == -1 && posY == -1)
    {
        posX = startx;
        posY = starty;
    }
    else
    {
        posX = posX + incx;
        posY = posY + incy;
    }

    //ending the ball trajectory
    //if(posX < startx || posX > endx || posY < starty || posY > endy )
    if(posX > endx || posY > endy )
    {
        clearInterval(ball1tracker)
        posX = posY = -1;
        var endtime = Date.now();
        console.log("starttime=="+starttime+"endtime=="+endtime+"diff=="+(endtime-starttime))
        ball2tracker = setInterval(ball2,100)
    }

    else
    {
        context.arc(posX, posY,8, 0, 2*Math.PI)
        context.fill();
    }
}

function ball2()
{
    var startx = 690;
    var starty = 325;
    var endx = 500;
    var endy = 50;

    //endx-startx should be the distance covered across the entire duration
    //duration = x frames
    //so basically in x frames, endx-startx should be the distance covered

    //frame rate = frames per second, or frames per 1000 ms
    //between two frames, duration = say 2ms
    //so number of frames = 1000/2 = 500 frames per second

    var currenttime = Date.now()
    timeinterval = currenttime - previoustime;
    previoustime = currenttime;

    fps = 1000/timeinterval;
    incx = (startx - endx)/fps;
    incy = (starty - endy)/fps;

    context.clearRect(0,0,canvas.width,canvas.height);
    context.beginPath();
    context.fillStyle = "yellow"

    if(posX == -1 && posY == -1)
    {
        posX = startx;
        posY = starty;
    }
    else
    {
        posX = posX - incx;
        posY = posY - incy;
    }

    //ending the ball trajectory
    if(posX < endx || posX > startx || posY > starty || posY < endy )
    {
        clearInterval(ball2tracker)
    }

    else
    {
        context.arc(posX, posY, 8, 0, 2*Math.PI)
        context.fill();
    }
}