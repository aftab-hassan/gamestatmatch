/**
 * Created by aftab on 1/12/2016.
 */
var canvas = document.getElementById("mycanvas")
var context = canvas.getContext('2d')

var img = new Image();
img.src = "numbers.png"

img.onload = function(e)
{
    context.drawImage(img,0,0)
}
