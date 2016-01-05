var canvas = document.getElementById('mycanvas')
var context = canvas.getContext('2d')
var animateButton = document.getElementById('animateButton')
var paused = true;
var prev = new Date();
var skyVelocity = 30;
var img = new Image();
var skyPositionLeft = 0;
var skyPositionRight = canvas.width;

function calculateFPS(current)
{
    var fps = 1000/(current-prev);
    prev = current;

    return fps;
}

function draw()
{
    if(paused == false)
    {
        //var skyOffsetThisFrame = skyVelocity/calculateFPS(new Date())
        //console.log(skyOffsetThisFrame);
        var skyOffsetThisFrame = 4;

        skyPositionLeft = skyPositionLeft-skyOffsetThisFrame;
        if(skyPositionLeft < -canvas.width)//correction when left becomes less than -canvas.width meaning right becomes less than 0
        {
            skyPositionLeft = 0;
            skyPositionRight = canvas.width;
        }
        context.drawImage(img,skyPositionLeft,0);

        skyPositionRight = skyPositionRight-skyOffsetThisFrame;
        context.drawImage(img,skyPositionRight,0);

        console.log("skyPositionLeft==",Math.round(skyPositionLeft),"skyPositionRight==",Math.round(skyPositionRight) );

        requestAnimationFrame(draw)
    }
}

img.src = '../../shared/images/sky2.png';
img.onload = function (e) {
    draw();
};

animateButton.onclick = function(e)
{
    if(paused == true)
    {
        paused = false;
        animateButton.value =  "Pause"
        requestAnimationFrame(draw);
    }
    else
    {
        paused = true;
        animateButton.value = "Animate"
    }
}