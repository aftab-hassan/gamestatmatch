/**
 * Created by aftab on 12/26/2015.
 */
var canvas = document.getElementById("mycanvas")
var context = canvas.getContext('2d')

var myleft = 0;
var mytop = 0;
var myright = 0;
var mybottom = 0;
var concatenatedstring = "";

var dragging = 0;

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
}

canvas.onmousemove = function (e)
{
    myright = e.clientX;
    mybottom = e.clientY;

    concatenatedstring = myleft.toString() + "," + mytop.toString() + "," + myright.toString() + "," + mybottom.toString();
    console.log(concatenatedstring)

    if(dragging == 1)
    {
        context.clearRect(0,0,canvas.width,canvas.height);
        context.strokeRect(myleft,mytop,myright-myleft,mybottom-mytop);
    }

    //have to add the drawRectangle thing here
}