/**
 * Created by aftab on 12/11/2015.
 */
/* Global variables */
var paused = true;
var canvas = document.getElementById('mycanvas');
var context = canvas.getContext('2d');
var discs = [
    {
        posX : 50,
        posY : 100,
        radius : 25,
        incrementX : 5,
        incrementY : 5,
        fillColor : "green"
    }
    ,
    {
        posX : 400,
        posY : 20,
        radius : 50,
        incrementX : 1,
        incrementY : 1,
        fillColor : "yellow"
    },

    {
        posX : 20,
        posY : 20,
        radius : 20,
        incrementX : 10,
        incrementY : 15,
        fillColor : "red"
    }
];

animateButton.onclick = function(e)
{
    if(paused == true)
    {
        animateButton.value = "Pause";
        requestAnimationFrame(animate);
        paused = false;
    }
    else if(paused == false)/* animation is running */
    {
        paused = true;
        animationButton.value = "Animate"
    }
}

function animate()
{
    if(!paused)
    {
        context.clearRect(0,0,canvas.width, canvas.height);
        draw();
        requestAnimationFrame(animate);
    }
}

function draw()
{
    for(var i = 0;i<discs.length;i++)
    {
        var disc = discs[i];

        context.save();
        context.beginPath();
        context.arc(disc.posX,disc.posY,25,0,Math.PI*2, false)
        context.fillStyle = disc.fillColor;
        context.fill();
        context.restore();

        if((disc.posX+disc.radius == canvas.width) || (disc.posX+disc.radius == 25))
            disc.incrementX = -disc.incrementX;

        if((disc.posY+disc.radius == canvas.height) || (disc.posY+disc.radius == 25))
            disc.incrementY = -disc.incrementY;

        disc.posX += disc.incrementX;
        disc.posY += disc.incrementY;
    }
}