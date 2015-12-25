/**
 * Created by aftab on 12/23/2015.
 */

var myP = document.getElementById("myP")

/* If you hover over the 'Id' */
function myonmousemovefunction()
{
    console.log("myonmousemovefunction")
}

/* If you mouse press down 'Id' */
function myonmousedownfunction()
{
    console.log("myonmousedownfunction")
}

/* If you mouse release over 'Id' */
function myonmouseupfunction()
{
    console.log("myonmouseupfunction")
}

/* If you were over the 'Id' before, and now move out of that area */
function myonmouseoutfunction()
{
    console.log("myonmouseoutfunction")
}

/* If you move your mouse over that area */
/* Difference from myonmousemovefunction is that, in myonmousemovefunction, everytime the cursor moves, the
 * function is triggered, whereas, here, it's triggered only the first time, the mouse cursor comes inside the area.
  * Within the 'area', you can keep on 'mousemove', and still the myonmouseoverfunction function is not triggered */
function myonmouseoverfunction()
{
    console.log("myonmouseoverfunction")
}

function myonmousewheelfunction()
{
    console.log("myonmousewheelfunction")
}