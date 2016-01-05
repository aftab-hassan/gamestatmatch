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

img.src = "countrypath.jpg"
img.onload = function()
{
    context.drawImage(img,0,0,canvas.width,canvas.height);
    context.drawImage(img,331,174,62,132,0,0,canvas.width,canvas.height);

    var loc = windowToCanvas(canvas, 331, 174);
    var locend = windowToCanvas(canvas, 62, 132);

    imgdata = context.getImageData(loc.x, loc.y, locend.x, locend.y);
    //context.putImageData(imgdata,0,0)
}

function windowToCanvas(canvas, x, y)
{
    var canvasRectangle = canvas.getBoundingClientRect();

    return {
        x: x - canvasRectangle.left,
        y: y - canvasRectangle.top
    };
}