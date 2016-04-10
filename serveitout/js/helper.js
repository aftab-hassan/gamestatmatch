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

/* Global variables required for UI and other non-three.js functions */
var JSONobj;
var playerIndex,serveIndex,serveDirection,row;

/* Controllers */
/* file controller */
document.getElementById('myFile').addEventListener('change',readSingleFile,false)

/* Selection related UI related functions */
function updateSelection(selectionmade)
{
    /* player Selection */
    var playerSelection=document.getElementById("playerselect");
    playerIndex = playerSelection[playerSelection.selectedIndex].index;
    var playerSelection = playerSelection[playerSelection.selectedIndex].value;

    /* first serve, second serve, both serves Selection */
    var serveSelection=document.getElementById("serveselect");
    serveIndex = serveSelection[serveSelection.selectedIndex].index;
    var serveSelection = serveSelection[serveSelection.selectedIndex].value;

    /* court Position selection*/
    if(selectionmade == "player")
    {
        document.getElementById('updateText').textContent = playerSelection + "'s serve";
    }

    else if(selectionmade == "servefirstsecond")
    {
        document.getElementById('updateText').textContent = playerSelection + "'s " + serveSelection;
    }

    else
    {
        if(hasUnderscore(selectionmade) == true)
        {
            console.log("came inside this,selectionmade=="+selectionmade);
            serveDirection = selectionmade;

            var delimiter = "_";
            console.log(playerSelection + "'s " + selectionmade.split(delimiter)[1] + " " + serveSelection + " to the " + selectionmade.split(delimiter)[0] + " side")
            document.getElementById('updateText').textContent = playerSelection + "'s " + selectionmade.split(delimiter)[1] + " " + serveSelection + " to the " + selectionmade.split(delimiter)[0] + " side";
        }

        else
        {
            console.log(playerSelection + "'s " + " " + selectionmade + " " + serveSelection)
            document.getElementById('updateText').textContent = playerSelection + "'s " + selectionmade + " " + serveSelection;
        }
    }
}

/* function to read file */
function readSingleFile(evt) {
    console.log("came inside readSingleFile...");

    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function(e) {
            var contents = e.target.result;
            JSONobj = JSON.parse(contents);
            //console.log(JSONobj[0].ad_wide);
        }
        r.readAsText(f);
    } else {
        alert("Failed to load file");
    }
}

/* boolean check if a string 's' has white space in it */
function hasUnderscore(s) {
    return s.indexOf('_') >= 0;
}
/*************************************************************************************************************/
/* Three.js */
/* Three.js variables */
var angularSpeed = 0.2;
var lastTime = 0;
var SCREEN_WIDTH,SCREEN_HEIGHT,scene,camera,renderer,light,container,animationTracker;
var courtSelection;
var floormesh=null,floorTexture,floorMaterial,floorGeometry;//floor
var skyBoxGeometry,skyBoxMaterial,skyBox;//sky
var nEnd = 0,nMax,nStep = 120;

/* three.js helper functions */

/* initiates three.js functionality - this is just a wireframe, not used in code */
function workingInitTemplate()
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
    //console.log("came inside the workingInitTemplate function...")

    /* 1.set SCREEN_WIDTH and SCREEN_HEIGHT */
    SCREEN_WIDTH = window.innerWidth-110, SCREEN_HEIGHT = window.innerHeight;

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
    renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT)

    /* 5.object */
    cube = new THREE.Mesh(new THREE.CubeGeometry(20,10,10) , new THREE.MeshNormalMaterial(
        {color:'lightblue',wireframe:'true',wireframeLineWidth:'10'}))
    //var geometry = new THREE.BoxGeometry( 5, 5, 5 );
    //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //cube = new THREE.Mesh( geometry, material );

    /* 6.object properties */
    cube.rotation.z = 0.5;
    cube.rotation.y = 0.5;
    cube.position.y += 30;

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

function init()
{
    console.log("playerIndex=="+playerIndex+",serveIndex=="+serveIndex+",serveDirection=="+serveDirection);

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
    //console.log("came inside the init function...")

    /* 1.set SCREEN_WIDTH and SCREEN_HEIGHT */
    SCREEN_WIDTH = window.innerWidth-110, SCREEN_HEIGHT = window.innerHeight;

    /* 2.scene*/
    scene = new THREE.Scene();

    /* 3.camera */
    camera = new THREE.PerspectiveCamera(45,SCREEN_WIDTH/SCREEN_HEIGHT,0.1,1000);
    camera.position.x = 0;
    camera.position.y = 20;
    camera.position.z = 40;
    camera.lookAt(scene.position);

    /* 4.renderer */
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT)

    /* 5.object */
    //cube = new THREE.Mesh(new THREE.CubeGeometry(20,10,10) , new THREE.MeshNormalMaterial(
    //    {color:'lightblue',wireframe:'true',wireframeLineWidth:'10'}))

    /* 6.object properties */
    //cube.rotation.z = 0.5;
    //cube.rotation.y = 0.5;
    //cube.position.y += 30;

    /* 7.light */
    light = new THREE.DirectionalLight('white',1);
    //light.position.set(0,10,10).normalize();
    light.position.set(20,20,0).normalize();

    /* adding elements to scene */
    resizeWindowAndToggleOnM();
    drawCourt();
    drawFloorAndSky();

    /* serve types
    [1] "deuce_wide"    "deuce_middle"  "deuce_t"       "ad_wide"       "ad_middle"     "ad_t"          "err_net"
    [10] "err_wide"      "err_deep"      "err_wide_deep" "err_foot"      "err_unknown" */
    var row;
    if(serveIndex == 1)
        row = playerIndex + " Total";
    else if(serveIndex == 2)
        row = playerIndex + " 1";
    else if(serveIndex == 3)
        row = playerIndex + " 2";
    console.log("row=="+row);
    drawIncrementalTubeAndSphere(row,serveDirection);

    /* 8.weave together */
    container = document.getElementById('ThreeJS')
    container.appendChild(renderer.domElement);
    //scene.add(cube);
    renderer.render(scene,camera);
}

function resizeWindowAndToggleOnM()
{
    //////////////
    //// EVENTS //
    //////////////

    // automatically resize renderer
    THREEx.WindowResize(renderer, camera);
    // toggle full-screen on given key press
    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
}

/* test function to draw a line before I figured the problem was with camera.lookAt(scene.position)*/
function drawLine()
{
    var material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( 0, 10, 0 ),
        new THREE.Vector3( 0, -30, -10 )
    );

    var line = new THREE.Line( geometry, material );
    scene.add( line );
}

/* to drawCourt */
function drawCourt()
{
    //console.log("came inside the drawCourt function...");
    var courtGeometry = new THREE.Geometry();
    var courtMaterial = new THREE.LineBasicMaterial({color: 'white'});

    var a = new THREE.Vector3( -15, 0, 20 );
    var b = new THREE.Vector3( -15, 0, -20 );
    var c = new THREE.Vector3( -20, 0, 20 );
    var d = new THREE.Vector3( -20, 0, -20 );

    var e = new THREE.Vector3( 15, 0, 20 );
    var f = new THREE.Vector3( 15, 0, -20 );
    var g = new THREE.Vector3( 20, 0, 20 );
    var h = new THREE.Vector3( 20, 0, -20 );

    //left side
    courtGeometry.vertices.push(a);
    courtGeometry.vertices.push(b);
    courtGeometry.vertices.push(c);
    courtGeometry.vertices.push(d);

    //right side
    courtGeometry.vertices.push(e);
    courtGeometry.vertices.push(f);
    courtGeometry.vertices.push(g);
    courtGeometry.vertices.push(h);

    //far side baseline
    courtGeometry.vertices.push(d);
    courtGeometry.vertices.push(h);

    //near side baseline
    courtGeometry.vertices.push(c);
    courtGeometry.vertices.push(g);

//                //middle line horizontal
//                var i = new THREE.Vector3(-15,10,0)
//                var j = new THREE.Vector3(15,10,0)
//                courtGeometry.vertices.push(i);
//                courtGeometry.vertices.push(j);

    //far side service box
    var k = new THREE.Vector3(-15,0,-11)
    var l = new THREE.Vector3(15,0,-11)
    courtGeometry.vertices.push(k);
    courtGeometry.vertices.push(l);

    //near side service box
    var m = new THREE.Vector3(-15,0,11)
    var n = new THREE.Vector3(15,0,11)
    courtGeometry.vertices.push(m);
    courtGeometry.vertices.push(n);

    //middle line vertical
    var o = new THREE.Vector3(0,0,11)
    var p = new THREE.Vector3(0,0,-11)
    courtGeometry.vertices.push(o);
    courtGeometry.vertices.push(p);

    //far side mid tip
    var q = new THREE.Vector3(0,0,-20)
    var r = new THREE.Vector3(0,0,-19)
    courtGeometry.vertices.push(q);
    courtGeometry.vertices.push(r);

    //near side mid tip
    var s = new THREE.Vector3(0,0,20)
    var t = new THREE.Vector3(0,0,19)
    courtGeometry.vertices.push(s);
    courtGeometry.vertices.push(t);

    var courtLine = new THREE.Line( courtGeometry, courtMaterial, THREE.LinePieces);
    scene.add(courtLine);

    //center line - dashed
    var lineGeometry = new THREE.Geometry();
    var vertArray = lineGeometry.vertices;
    vertArray.push( new THREE.Vector3(-15, 0, 0), new THREE.Vector3(15, 0, 0) );
    lineGeometry.computeLineDistances();
    var lineMaterial = new THREE.LineDashedMaterial( { color: 'white', dashSize: 1, gapSize: 1 } );
    var line = new THREE.Line( lineGeometry, lineMaterial );
    scene.add(line);

    renderer.render(scene,camera);
}

function drawFloorAndSkyAnimate()
{
    requestAnimationFrame( drawFloorAndSkyAnimate );
    renderer.render(scene,camera);
    controls.update();
}

function drawFloorAndSky()
{
    //////////////
    // CONTROLS //
    //////////////
    // move mouse and: left   click to rotate,
    //                 middle click to zoom,
    //                 right  click to pan
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    ///////////
    // FLOOR //
    ///////////
    // note: 4x4 checkboard pattern scaled so that each square is 25 by 25 pixels.
    //var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
    floorTexture = new THREE.ImageUtils.loadTexture( '../images/grass256.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 20, 20 );
    // DoubleSide: render texture on both sides of mesh
    floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    floorGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    /////////
    // SKY //
    /////////
    // recommend either a skybox or fog effect (can't use both at the same time)
    // without one of these, the scene's background color is determined by webpage background
    // make sure the camera's "far" value is large enough so that it will render the skyBox!
    skyBoxGeometry = new THREE.CubeGeometry( 1000, 1000, 1000 );
    // BackSide: render faces from inside of the cube, instead of from outside (default).
    skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
    skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    scene.add(skyBox);

    /* keeping it going */
    requestAnimationFrame( drawFloorAndSkyAnimate );
    renderer.render(scene,camera);
    controls.update();
}

function visualizeServe()
{
    alert("came inside visualizeServe...")

}

function getTubeData(XCoordinateStart,XCoordinateEnd)
{
    console.log("came inside getTubeData...");

    var XCoordinate = (Math.random()*(XCoordinateEnd-XCoordinateStart))+XCoordinateStart;
    var YCoordinate = (Math.random()*(20-15))+15;
    var ZCoordinate = ((Math.random() * 10) + 1)*-1

    var numPoints = 100;
    var start;
    if(XCoordinateStart >= 0 && XCoordinateStart <= 15)
        start = new THREE.Vector3(-15, 0, 80);
    else if(XCoordinateStart >= -15 && XCoordinateStart <= 0)
        start = new THREE.Vector3(15, 0, 80);
    var middle = new THREE.Vector3(0, YCoordinate, 20);
    var end = new THREE.Vector3(XCoordinate, 0, ZCoordinate);

    var curveQuad = new THREE.QuadraticBezierCurve3(start, middle, end);
    var tube = new THREE.TubeGeometry(curveQuad, numPoints, 0.5, 1, false);

    var points = [];
    for(var i = 0;i<tube.vertices.length;i++)
    {
        if(tube.vertices[i].z <= 25)
            points.push(new THREE.Vector3(tube.vertices[i].x,tube.vertices[i].y,tube.vertices[i].z));
    }
    //points = tube.vertices;
    //console.log("printing tube vertices...")
    //for(var i = 0;i<tube.vertices.length;i++)
    //{
    //    console.log("vertices["+i+"]==("+tube.vertices[i].x+","+tube.vertices[i].y+","+tube.vertices[i].z+")")
    //}

    console.log("returned points...");
    return points;
}

/* (Math.random() * 10) + 1,, */
function drawIncrementalTubeAndSphere(row,serveDirection)
{
    console.log("serveDirection=="+serveDirection)
    var numServes;
    var XCoordinateStart,XCoordinateEnd;
    for(var i = 0; i < JSONobj.length; i++)
    {
        if(JSONobj[i].row == row)
        {
            numServes = JSONobj[i][serveDirection];
            break;
        }
    }
    console.log("numServes ==" + numServes);

    /* setting XCoordinate based on  serveDirection */
    switch (serveDirection) {
        case 'ad_wide':
            XCoordinateStart = -15;
            XCoordinateEnd = -10;
            break;
        case 'ad_middle':
            XCoordinateStart = -10;
            XCoordinateEnd = -3;
            break;
        case 'ad_t':
            XCoordinateStart = -3;
            XCoordinateEnd = 0;
            break;
        case 'deuce_t':
            XCoordinateStart = 0;
            XCoordinateEnd = 3;
            break;
        case 'deuce_middle':
            XCoordinateStart = 3;
            XCoordinateEnd = 10;
            break;
        case 'deuce_wide':
            XCoordinateStart = 10;
            XCoordinateEnd = 15;
            break;
    }

    //if required, add serveDepth later
    //switch (serveDepth) {
    //    case 'deuce_wide':
    //        XCoordinateStart = -15;
    //        XCoordinateEnd = -12;
    //        break;
    //    case 'ad_wide':
    //        XCoordinateStart = 12;
    //        XCoordinateEnd = 15;
    //        break;
    //}


    //gets the points required by the serve's TubeGeometry
    for(var i =0;i<numServes;i++)
    {
        var points = getTubeData(XCoordinateStart,XCoordinateEnd);

        // path
        var path = new THREE.CatmullRomCurve3( points );

        // params
        var pathSegments = 512;
        var tubeRadius = 0.2;
        var radiusSegments = 8;
        var closed = false;

        // geometry
        var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );

        // to buffer goemetry
        geometry = new THREE.BufferGeometry().fromGeometry( geometry );
        nMax = geometry.attributes.position.count;

        // material
        var material = new THREE.MeshPhongMaterial( {
            opacity: 0.4,
            transparent: true,
            color: 0x00ffff,
            side: THREE.DoubleSide
        } );

        // ambient
        scene.add( new THREE.AmbientLight( 0xffffff, 0.4 ) );

        // light
        var light = new THREE.PointLight( 0xffffff, 0.5 );
        light.position.set( 20, 20, 0 );
        camera.add( light );

        // mesh
        var mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        //animateIncrementalServe();
        displaySphere(points);
    }
}

function animateIncrementalServe() {

    animationTracker = requestAnimationFrame( animateIncrementalServe );
//        nEnd = ( nEnd + nStep ) % nMax;
    nEnd = ( nEnd + nStep );

    if(nEnd > nMax)
    {
        cancelAnimationFrame(animationTracker);
        return;
    }

    mesh.geometry.setDrawRange( 0, nEnd );
    //console.log("nEnd=="+nEnd+"nMax=="+nMax);
    renderer.render( scene, camera );
}

function displaySphere(points)
{
    //console.log("came inside displaySphere");

    for(var i = 0;i<points.length;i++)
    {
        if(i%3 == 0)
        {
            sphere = new THREE.Mesh(new THREE.SphereGeometry(0.2,31,31), new THREE.MeshLambertMaterial({
                color: 'yellow',
                opacity: 0.6,
                transparent: true,
            }));

            sphere.position.x = points[i].x;
            sphere.position.y = points[i].y;
            sphere.position.z = points[i].z;

            scene.add(sphere);
        }
    }
    renderer.render(scene, camera);
}