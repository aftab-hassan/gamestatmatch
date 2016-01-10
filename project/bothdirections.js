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

var startx;
var starty;
var endx;
var endy;

//driver
var balltracker;

for(var i=0;i<2;i++)
{
    if(i == 0)
    {
        console.log("starting balltracker 1")
        startx = 325;
        starty = 81;
        endx = 690;
        endy = 325;
        balltracker = requestAnimationFrame(balltrajectoryupdown)
        console.log("finished balltracker 1");
    }
    else if(i == 1)
    {
        //console.log("starting balltracker 2")
        //startx = 690;
        //starty = 325;
        //endx = 525;
        //endy = 90;
        //balltracker = requestAnimationFrame(balltrajectorydownup)
        //console.log("finished balltracker 2");
    }
}

function balltrajectoryupdown()
{
    console.log("inside balltrajectoryupdown")
    balltrajectory("updown")
}

function balltrajectorydownup()
{
    console.log("inside balltrajectorydownup")
    balltrajectory("downup");
}

function balltrajectory(direction)
{
    console.log("running... direction=="+direction.toString())
    console.log(posX + " " + posY)

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
    //console.log("fps=="+fps)
    incx = (endx - startx)/fps;
    incy = (endy - starty)/fps;

    //console.log("incx=="+incx+"incy=="+incy)
    //console.log("\n")

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
    if(direction == "updown")
    {
        if( posX < endx && posY < endy )
        {
            balltracker = requestAnimationFrame(balltrajectoryupdown)
            context.arc(posX, posY,8, 0, 2*Math.PI)
            context.fill();

        }

        else
        {
            //cancelAnimationFrame
            posX = posY = -1;
            trajectoryoneover = 1;
            cancelAnimationFrame(balltracker)
        }
    }
    else
    {
        if( posX >= endx && posY >= endy )
        {
            balltracker = requestAnimationFrame(balltrajectorydownup)
            context.arc(posX, posY,8, 0, 2*Math.PI)
            context.fill();

        }

        else
        {
            //cancelAnimationFrame
            posX = posY = -1;
            trajectoryoneover = 1;
            cancelAnimationFrame(balltracker)
        }
    }

}

//for (var i = 0; i < 2; i++)
//{
//    console.log("inside for loop : i=="+i)
//
//    if(i == 0)
//    {
//        startx = 325;
//        starty = 81;
//        endx = 690;
//        endy = 325;
//
//        balltracker = setInterval(balltrajectory,60)
//        console.log("finished balltracker "+i);
//    }
//
//    else if(i==1)
//    {
//        //startx = 690;
//        //starty = 325;
//        //endx = 200;
//        //endy = 100;
//    }
//}
