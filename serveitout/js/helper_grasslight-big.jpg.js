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

/* boolean check if a string 's' has white space in it */
function hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
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
var points = [],mesh,nEnd = 0,nMax,nStep = 120;

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
    console.log("came inside the init function...")

    /* 1.set SCREEN_WIDTH and SCREEN_HEIGHT */
    SCREEN_WIDTH = window.innerWidth-110, SCREEN_HEIGHT = window.innerHeight;

    /* 2.scene*/
    scene = new THREE.Scene();

    /* 3.camera */
    camera = new THREE.PerspectiveCamera(45,SCREEN_WIDTH/SCREEN_HEIGHT,0.1,1000);
    camera.position.x = 0;
    camera.position.y = 40;
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
    drawIncrementalTube();
    displaySphere();

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
    console.log("came inside the drawCourt function...");
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
    //floorTexture = new THREE.ImageUtils.loadTexture( '../images/grass256.jpg' );
    //floorTexture = new THREE.ImageUtils.loadTexture( '../images/grass256.jpg' );
    //floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    //floorTexture.repeat.set( 20, 20 );
    //// DoubleSide: render texture on both sides of mesh
    //floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    //floorGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    //floor = new THREE.Mesh(floorGeometry, floorMaterial);
    //floor.position.y = -0.5;
    //floor.rotation.x = Math.PI / 2;
    //scene.add(floor);

    // ground
    var loader = new THREE.TextureLoader();
    var floorTexture = loader.load( "grasslight-big.jpg" );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 20, 20 );
    floorTexture.anisotropy = 16;
    var floorMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: floorTexture } );
    var floor = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1000, 1000 ), floorMaterial );
    floor.position.y = - 0.5;
    floor.rotation.x = - Math.PI / 2;
    floor.receiveShadow = true;
    scene.add( floor );

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

function getTubeData()
{
    var numPoints = 100;
    var start = new THREE.Vector3(-15, 0, 80);
    var middle = new THREE.Vector3(0, 15, 20);
    var end = new THREE.Vector3(5, 0, -5);

    var curveQuad = new THREE.QuadraticBezierCurve3(start, middle, end);
    var tube = new THREE.TubeGeometry(curveQuad, numPoints, 0.5, 1, false);

    for(var i = 0;i<tube.vertices.length;i++)
    {
        if(tube.vertices[i].z <= 25)
            points.push(new THREE.Vector3(tube.vertices[i].x,tube.vertices[i].y,tube.vertices[i].z));
    }
    //points = tube.vertices;
    console.log("printing tube vertices...")
    for(var i = 0;i<tube.vertices.length;i++)
    {
        console.log("vertices["+i+"]==("+tube.vertices[i].x+","+tube.vertices[i].y+","+tube.vertices[i].z+")")
    }
}

function drawIncrementalTube()
{
    //gets the points required by the serve's TubeGeometry
    getTubeData();

    // path
    var path = new THREE.CatmullRomCurve3( points );

    // params
    var pathSegments = 512;
    var tubeRadius = 0.1;
    var radiusSegments = 8;
    var closed = false;

    // geometry
    var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );

    // to buffer goemetry
    geometry = new THREE.BufferGeometry().fromGeometry( geometry );
    nMax = geometry.attributes.position.count;

    // material
    var material = new THREE.MeshPhongMaterial( {
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
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    animateIncrementalServe();
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
    console.log("nEnd=="+nEnd+"nMax=="+nMax);
    renderer.render( scene, camera );
}

function displaySphere()
{
    console.log("came inside displaySphere");

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