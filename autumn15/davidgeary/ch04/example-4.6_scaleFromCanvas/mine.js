/**
 * Created by aftab on 12/22/2015.
 */
var img = new Image();
var mybutton = document.getElementById("mybutton")
var canvas = document.getElementById('mycanvas')
var context = canvas.getContext('2d');

img.src = "../../shared/images/lonelybeach.png"

img.onload = function(e)
{
    //context.drawImage(img,100,100,500,500,0,0,500,500);
    context.drawImage(img,0,0,canvas.width,canvas.height)
}

mybutton.onclick = function(e)
{
    context.clearRect(0,0,canvas.width,canvas.height)

    var w = canvas.width;
    var h = canvas.height;
    var sw = 2 * w;
    var sh = 2 * h;
    console.log("startx==",-sw/2 + w/2,"starty==",-sh/2 + h/2,"endx == ",sw,"endy==",sh)
    context.drawImage(img,-sw/2 + w/2, -sh/2 + h/2, sw, sh)
}