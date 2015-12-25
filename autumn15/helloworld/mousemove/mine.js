/**
 * Created by aftab on 12/23/2015.
 */

function myclickfunction(event)
{
    console.log(event.clientX, " ", event.clientY)
}

function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("demo").innerHTML = coords;
}