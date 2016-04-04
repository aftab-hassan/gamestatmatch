/**
 * Created by aftab on 4/1/2016.
 */

//    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
//
//    ga('create', 'UA-23542009-21', 'auto');
//    ga('send', 'pageview');

/* Selection related UI related functions */
function updateSelection(selectionmade)
{
    /* player Selection */
    var playerSelection=document.getElementById("playerselect");
    var playerSelection = playerSelection[playerSelection.selectedIndex].value;

    /* first serve, second serve Selection */
    var serveSelection=document.getElementById("serveselect");
    var serveSelection = serveSelection[serveSelection.selectedIndex].value;

    /* court Position selection*/
    var courtPosition;

    if(selectionmade == "player")
    {
        document.getElementById('updateText').textContent = playerSelection + "'s serve";
    }

    else if(selectionmade == "servefirstsecond")
    {
        document.getElementById('updateText').textContent = playerSelection + "'s " + serveSelection + " serve";
    }

    else
    {
        if(hasWhiteSpace(selectionmade) == true)
        {
            console.log(playerSelection + "'s " + selectionmade.split(" ")[1] + " " + serveSelection + " serve" + " to the " + selectionmade.split(" ")[0] + " side")
            document.getElementById('updateText').textContent = playerSelection + "'s " + selectionmade.split(" ")[1] + " " + serveSelection + " serve" + " to the " + selectionmade.split(" ")[0] + " side";
        }

        else
        {
            console.log(playerSelection + "'s " + " " + selectionmade + " " + serveSelection)
            document.getElementById('updateText').textContent = playerSelection + "'s " + selectionmade + " " + serveSelection;
        }
    }
}

function visualizeServe()
{
    alert("came inside visualizeServe...")
    init();
}

/*************************************************************************************************************/
/* Three.js */
/* Three.js variables */
var angularSpeed = 0.2;
var lastTime = 0;
var SCREEN_WIDTH,SCREEN_HEIGHT,scene,camera,renderer,cube,light,container;
var lastTime = 0;
/* three.js helper functions */

/* initiates three.js functionality */
function init()
{
    /*
     * 1.set SCREEN_WIDTH and SCREEN_HEIGHT
     * 2.scene
     * 3.camera
     * 4.renderer
     * 5.object(say cube)
     * 6.object properties
     * 7.light
     * 8.weave together
     * */
    console.log("came inside the init function...")

    /* 1.set SCREEN_WIDTH and SCREEN_HEIGHT */
    SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;

    /* 2.scene*/
    scene = new THREE.Scene();

    /* 3.camera */
    camera = new THREE.PerspectiveCamera(45,SCREEN_WIDTH/SCREEN_HEIGHT,0.1,1000);
    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 40;
    camera.lookAt(scene.position);

    /* 4.renderer */
    renderer = new THREE.WebGLRenderer();

    /* 5.object */
    cube = new THREE.Mesh(new THREE.CubeGeometry(200,100,100) , new THREE.MeshNormalMaterial(
        {color:'lightblue',wireframe:'true',wireframeLineWidth:'10'}))

    /* 6.object properties */
    cube.rotation.z = 0.5;

    /* 7.light */
    light = new THREE.DirectionalLight('white',1);
    light.position.set(0,10,10).normalize();

    /* 8.weave together */
    document.body.appendChild(renderer.domElement);
    container = document.getElementById('ThreeJS')
    container.appendChild(renderer.domElement);
    scene.add(cube);
    renderer.render(scene,camera);

    //animate();
}

function init2()
{
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    /* (0, -400, 400) is what works */
    //camera.position.x = 0;
    //camera.position.y = -400;
    //camera.position.z = 400;
    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 40;
    camera.lookAt(scene.position);
    console.log("camera position == "+"("+camera.position.x+","+camera.position.y+","+camera.position.z+")")

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    cube = new THREE.Mesh(new THREE.CubeGeometry(200,100,100), new THREE.MeshNormalMaterial());
    cube.position.x = -100;
    cube.position.y = -200;
    cube.position.z = 300;
    console.log("cube position == "+"("+cube.position.x+","+cube.position.y+","+cube.position.z+")")

    document.body.appendChild(renderer.domElement);
    container = document.getElementById('ThreeJS')
    container.appendChild(renderer.domElement);
    scene.add(cube);
    renderer.render(scene,camera);

    animate();
}

function animate(){
    var time = (new Date()).getTime();
    var timeDiff = time - lastTime;
    var angularChange = angularSpeed * timeDiff * 2 * Math.PI / 1000;
    cube.rotation.y -= angularChange;
    lastTime = time;

    renderer.render(scene, camera);

    requestAnimationFrame(function(){
        animate();
    });
}

/* Helper functions */
function hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
}
