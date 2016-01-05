/**
 * Created by aftab on 12/27/2015.
 */
var canvas = document.getElementById("mycanvas")
var context = canvas.getContext('2d')

//var circles = [];
//
//for(var i = 0;i<100;i++)
//{
//    circles[i] = {
//        posX : 100,
//        posY : 0,
//        incX : 3 * Math.random(),
//        incY : 4 * Math.random(),
//        radius : 50 * Math.random()
//    }
//}
//
//setInterval(function()
//{
//
//
//},1000/60)

var circles = [10,20,30,40,50]
var i = 0;
circles.forEach(function()
{
    var circle = circles[i++];
    console.log(circle)
}
)