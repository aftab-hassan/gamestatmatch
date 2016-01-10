/**
 * Created by aftab on 1/5/2016.
 */
var canvas = document.getElementById("mycanvas")
var context = canvas.getContext('2d')

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

var startxarray = [325,690,450,220];
var startyarray = [81,325,100,300];
var endxarray = [690,450,220,500];
var endyarray = [325,100,300,110];
var counter = 0;

//driver
var balltracker;

//trav
var posX = startxarray[0];
var posY = startyarray[0];

/* these variables are required to calculate incx and incy */
var startx = startxarray[0]
var endx = endxarray[0]
var starty = startyarray[0]
var endy = endyarray[0]

if(startyarray[0] < endyarray[0])
    balltracker = requestAnimationFrame(balltrajectoryupdown)
else
    balltracker = requestAnimationFrame(balltrajectorydownup)

/* This is the function that is called by 'raf' */
function balltrajectoryupdown()
{
    console.log("inside balltrajectoryupdown")
    balltracker = balltrajectory("updown");
}

/* This is the function that is called by 'raf' */
function balltrajectorydownup()
{
    console.log("inside balltrajectorydownup")
    balltracker = balltrajectory("downup");
}

function balltrajectory(direction)
{
    console.log("running... direction=="+direction.toString())
    console.log(posX + " " + posY)
    console.log("startx=="+startx+"endx=="+endx+"starty=="+starty+"endy=="+endy)

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

    /* actual drawing of the ball - crital */
    context.clearRect(0,0,canvas.width,canvas.height);
    context.beginPath();
    context.fillStyle = "yellow"
    context.arc(posX, posY,8, 0, 2*Math.PI)
    context.fill();

    //applicable for both "updown" and "downup"
    posX = posX + incx;
    posY = posY + incy;

    //ending the ball trajectory
    if(direction == "updown")
    {
        /* > required due to rounding, ideally = should be enough */
        if( posY >= endy )
        {
            //next shot
            counter++;

            if(counter == startxarray.length)
                cancelAnimationFrame(balltracker)
            else
            {
                startx = startxarray[counter]
                endx = endxarray[counter]
                starty = startyarray[counter]
                endy = endyarray[counter]
                posX = startx;
                posY = starty;

                if(startyarray[counter] < endyarray[counter])
                    balltracker = requestAnimationFrame(balltrajectoryupdown)
                else
                    balltracker = requestAnimationFrame(balltrajectorydownup)
            }
        }

        /* nothing changes, just keep going for this shot */
        else
            balltracker = requestAnimationFrame(balltrajectoryupdown)
    }
    else if(direction == "downup")
    {
        /* > required due to rounding, ideally = should be enough */
        if(  posY <= endy )
        {
            //this shot over
            counter++;

            if(counter == startxarray.length)
                cancelAnimationFrame(balltracker)
            else
            {
                startx = startxarray[counter]
                endx = endxarray[counter]
                starty = startyarray[counter]
                endy = endyarray[counter]
                posX = startx;
                posY = starty;

                if(startyarray[counter] < endyarray[counter])
                    balltracker = requestAnimationFrame(balltrajectoryupdown)
                else
                    balltracker = requestAnimationFrame(balltrajectorydownup)
            }
        }

        /* nothing changes, just keep going for this shot */
        else
            balltracker = requestAnimationFrame(balltrajectorydownup)
    }
}