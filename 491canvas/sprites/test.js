/**
 * Created by aftab on 1/14/2016.
 */
var canvas = document.getElementById("mycanvas")
var context = canvas.getContext('2d')

var img = new Image();
img.src = "./coin-sprite-animation.png"
var loaded = 0;
img.onload = function()
{
    console.log("image has been loaded")
    loaded = 1;

}

while(true)
{
    if(loaded == 1)
    {
        //for(var i = 0;i<10;i++)
//{
        //console.log("iteration"+i)
        context.clearRect(0,0,canvas.width,canvas.height)
        //context.drawImage(img,i*100,0,(i+1)*100,100,0,0,100,100)
        context.drawImage(img,0,0)
        break;
//}
    }
}