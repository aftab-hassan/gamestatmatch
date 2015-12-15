/**
 * Created by aftab on 12/13/2015.
 */

var canvas = document.getElementById("mycanvas")
var context = canvas.getContext('2d');
var img = new Image();

img.src = "numbers.png"

img.onload = function(e)
{
    //draws the image, starting at 0,0; context.drawImage(img,dx,dy)
    //context.drawImage(img,0,0);

    //draws the image in the window 100,100,500,500; context.drawImage(img,dx,dy, dw, dh)
    context.drawImage(img,100,100,100,100);

    //takes the original image from 100,100,500,500 in the png and scales it to 0,0,1000,1000;
    //context.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh)
    //context.drawImage(img,0,0,500,500,0,0,1000,1000)
}
