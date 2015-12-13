/**
 * Created by aftab on 12/12/2015.
 */
var canvas = document.getElementById('mycanvas');
var context = canvas.getContext('2d');

context.fillRect(0,0,100,100);
context.translate(-100,-100);
context.fillRect(200,200,100,100);