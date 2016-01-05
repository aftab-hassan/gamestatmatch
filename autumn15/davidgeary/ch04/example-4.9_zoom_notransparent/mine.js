/**
 * Created by aftab on 12/26/2015.
 */
var canvas = document.getElementById("mycanvas")
var context = canvas.getContext('2d')

//position coordinates
var myleft = 0;
var mytop = 0;
var myright = 0;
var mybottom = 0;
var concatenatedstring = "";

//flag
var dragging = 0;

//image
var img = new Image();
var imgdata;

//press down
canvas.onmousedown = function (e)
{
    myleft = e.clientX;
    mytop = e.clientY;

    concatenatedstring = myleft.toString() + "," + mytop.toString() + "," + myright.toString() + "," + mybottom.toString();
    console.log(concatenatedstring);

    dragging = 1;
}

//release
canvas.onmouseup = function (e)
{
    concatenatedstring = myleft.toString() + "," + mytop.toString() + "," + myright.toString() + "," + mybottom.toString();
    console.log(concatenatedstring)

    dragging = 0;

    //scale and draw
    console.log("scaling",myleft,mytop,myright-myleft,mybottom-mytop)
    context.drawImage(img,myleft,mytop,myright-myleft,mybottom-mytop,0,0,canvas.width,canvas.height);
}

canvas.onmousemove = function (e)
{
    myright = e.clientX;
    mybottom = e.clientY;

    concatenatedstring = myleft.toString() + "," + mytop.toString() + "," + myright.toString() + "," + mybottom.toString();

    if(dragging == 1)
    {
        console.log(concatenatedstring)
        redraw();

        //context.clearRect(0,0,canvas.width,canvas.height);
        //imgdata = context.getImageData(myleft,mytop,myright-myleft,mybottom-mytop)
        //context.putImageData(imgdata,myleft,mytop);
        context.strokeRect(myleft,mytop,myright-myleft,mybottom-mytop);
    }

    //have to add the drawRectangle thing here
}

img.src = "countrypath.jpg"
img.onload = function()
{
    context.drawImage(img,0,0,canvas.width,canvas.height);
}

function redraw()
{
    context.drawImage(img,0,0,canvas.width,canvas.height);
}