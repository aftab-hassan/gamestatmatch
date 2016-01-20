/**
 * Created by aftab on 1/14/2016.
 */
var canvas = document.getElementById("mycanvas")
var context = canvas.getContext('2d')
var tickCount = 0;
var frameCount = 0;
var rafTracker;

function mycallbackfunction()
{
    console.log("inside mycallbackfunction, tickCount=="+tickCount+"mycache.length=="+mycache.length)
    if(frameCount == mycache.length)
    {
        cancelAnimationFrame(rafTracker);
        console.log("entered inside the cancelAnimationFrame loop with frameCount=="+frameCount+",mycache.length=="+mycache.length)
        //return;
        tickCount = 0;
        frameCount = 0;
    }

    var img = new Image();
    img.src = mycache[frameCount];
    context.drawImage(img,0,0);
    context.beginPath();
    context.arc(500 + frameCount*2 ,500, 12, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();

    tickCount++;
    //if(tickCount % 100 == 0)
    //{
        frameCount++;
    //}

    rafTracker = requestAnimationFrame(mycallbackfunction)
}

var imagepath;
for(var i=1;i<=79;i++)
{
    //imagepath = "./images/"+i+".jpg";
    if(i <=9)
        imagepath = "./zoompics/zoomvideo_0"+i+".png";
    else
        imagepath = "./zoompics/zoomvideo_"+i+".png";

    loadimage(imagepath)
    //loadimage("./images/5.jpg",mycallbackfunction)
    //loadimage("./images/1.jpg",mycallbackfunction)
    //loadimage("./images/2.jpg",mycallbackfunction)
    //loadimage("./images/3.jpg",mycallbackfunction)
    //loadimage("./images/4.jpg",mycallbackfunction)
}

var mycache = []
var counter = 0;

function loadimage(path)
{
    var img = new Image();
    img.src = path;
    img.onload = function()
    {
        mycache[counter++] = path;
        console.log("image "+path+" has been loaded,length=="+mycache.length)
        //console.log(mycache);

        if(mycache.length == 79)
        {
            mycache.sort();
            console.log(mycache);
            mycallbackfunction();
        }
    }
}

console.log("printing mycache...")
//console.log(mycache);