// global variables
var renderer;
var scene;
var camera;
var count = 50;
var animationTracker;
var container;

//floor
var floormesh=null;
var floorTexture,floorMaterial,floorGeometry,skyBoxGeometry,skyBoxMaterial,skyBox;

//spline
var splineGeometry;

//sphere
var sphere;
var light;

//court
var courtLine;
var courtGeometry;
var courtMaterial;

//frame rate
var prevFrame;
var currentFrame;

//gas trail
var tick = 0,
    clock,
    options, spawnerOptions, particleSystem;

//controls
var controls;
var over = 0;

//html elements
var courtselection = "Wimbledon";

//trajectory
//About structures and arrays in JSON
/*
 1.http://www.w3schools.com/json/json_syntax.asp

 2.var trajectories = [
 {}, ---> this is actually trajectories[0]
 {},
 {}]

 3.Inside [], it's all the same kind of format

 4.Inside {}, it's all different, it's like a structure(in C), or like an object

 5.trajectories[0] is that whole thing inside comprising of start,mid and end
 */
var trajectoryCount = -1;
var trajectories = [
    {
        "start":
        {
            x:-5,
            y:0,
            z:10
        },
        "mid" :
        {
            x:0,
            y:20,
            z:0
        },
        "end" :
        {
            x:5,
            y:0,
            z:-20
        },
        "velocity" : 2
    },
    {
        "start":
        {
            x:5,
            y:0,
            z:-20
        },
        "mid" :
        {
            x:0,
            y:20,
            z:0
        },
        "end" :
        {
            x:12,
            y:0,
            z:20
        },
        "velocity" : 2
    },
    {
        "start":
        {
            x:12,
            y:0,
            z:20
        },
        "mid" :
        {
            x:0,
            y:20,
            z:0
        },
        "end" :
        {
            x:10,
            y:5,
            z:-10
        },
        "velocity" : 3
    },
    {
        "start":
        {
            x:10,
            y:5,
            z:-10
        },
        "mid" :
        {
            x:0,
            y:20,
            z:0
        },
        "end" :
        {
            x:-15,
            y:0,
            z:15
        },
        "velocity" : 2
    },
    {
        "start":
        {
            x:-15,
            y:0,
            z:15
        },
        "mid" :
        {
            x:-10,
            y:25,
            z:0
        },
        "end" :
        {
            x:-15,
            y:0,
            z:-10
        },
        "velocity" : 1
    }
];

function drawCourt()
{
    courtGeometry = new THREE.Geometry();
    courtMaterial = new THREE.LineBasicMaterial({color: 'white'});

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

    courtLine = new THREE.Line( courtGeometry, courtMaterial, THREE.LinePieces);
    scene.add(courtLine);
}

function init() {
    console.log("came inside the init function...")

    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    SCREEN_WIDTH-=100;
    SCREEN_HEIGHT -= 250;

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, 0.1, 1000);

    // create a render, sets the background color and the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    // position and point the camera to the center of the scene
    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 40;
    camera.lookAt(scene.position);

    // add the output of the renderer to the html element
    document.body.appendChild(renderer.domElement);

    sphere = new THREE.Mesh(new THREE.SphereGeometry(0.8,31,31), new THREE.MeshLambertMaterial({
        color: 'yellow',
    }));

    light = new THREE.DirectionalLight('white', 1);
    light.position.set(0,10,10).normalize();

    //draw court lines
    drawCourt();

    // attach div element to variable to contain the renderer
    container = document.getElementById( 'ThreeJS' );

    // attach renderer to the container div
    container.appendChild( renderer.domElement );

    ////////////
    // EVENTS //
    ////////////

    // automatically resize renderer
    THREEx.WindowResize(renderer, camera);
    // toggle full-screen on given key press
    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

    //////////////
    // CONTROLS //
    //////////////

    // move mouse and: left   click to rotate,
    //                 middle click to zoom,
    //                 right  click to pan
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    //Aftab : Floor and sky were here
    drawFloorAndSky();

    ///////////////
    // GAS TRAIL //
    ///////////////
    // The GPU Particle system extends THREE.Object3D, and so you can use it
    // as you would any other scene graph component.  Particle positions will be
    // relative to the position of the particle system, but you will probably only need one
    // system for your whole scene
    particleSystem = new THREE.GPUParticleSystem({
        maxParticles: 2000
    });
    scene.add( particleSystem);


    // options passed during each spawned
    options = {
        position: new THREE.Vector3(),
        positionRandomness: .3,
        velocity: new THREE.Vector3(),
        velocityRandomness: .5,
        color: 0xaa88ff,
        colorRandomness: .2,
        turbulence: .5,
        lifetime: 2,
        size: 5,
        sizeRandomness: 1
    };

    spawnerOptions = {
        spawnRate: 15000,
        horizontalSpeed: 1.5,
        verticalSpeed: 1.33,
        timeScale: 1
    }

    //console.log("end of init function, court selection here =="+courtselection)
    renderer.render(scene,camera);

    myfunction();
}

function drawFloorAndSky()
{
    console.log("came inside drawFloorAndSky called by init function... court selection=="+courtselection)
    console.log("line after first debug in drawFloorAndSky...")

    ///////////
    // FLOOR //
    ///////////

    // note: 4x4 checkboard pattern scaled so that each square is 25 by 25 pixels.
    //var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
    if(courtselection == "Wimbledon")
    {
        floorTexture = new THREE.ImageUtils.loadTexture( '../images/grass256.jpg' );
        console.log("inside court texture Wimbledon...")
    }

    else if(courtselection == "French Open")/*go with 2 for now*/
    {
        floorTexture = new THREE.ImageUtils.loadTexture( '../images/claycourt2.png' );
        console.log("inside court texture FO...")
    }

    else if(courtselection == "Australian Open")/*go with 2 for now*/
    {
        floorTexture = new THREE.ImageUtils.loadTexture( '../images/australianopencourttexture.jpg' );
        console.log("inside court texture AO...")
    }

    else
        console.log("inside court texture NOTHING...")

    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 20, 20 );
    // DoubleSide: render texture on both sides of mesh
    floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    floorGeometry = new THREE.PlaneGeometry(110, 110, 1, 1);

    if(floormesh)
        scene.remove(floormesh);

    floormesh = new THREE.Mesh(floorGeometry, floorMaterial);
    floormesh.position.y = -0.5;
    floormesh.rotation.x = Math.PI / 2;
    scene.add(floormesh);
    console.log(floormesh)

    /////////
    // SKY //
    /////////

    // make sure the camera's "far" value is large enough so that it will render the skyBox!
    skyBoxGeometry = new THREE.CubeGeometry( 1000, 1000, 1000 );
    // BackSide: render faces from inside of the cube, instead of from outside (default).
    skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
    skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    scene.add(skyBox);
}

//save points in geometry.vertices
function getSplineData() {
    var curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3( trajectories[trajectoryCount].start.x, trajectories[trajectoryCount].start.y, trajectories[trajectoryCount].start.z ),
        new THREE.Vector3( trajectories[trajectoryCount].mid.x, trajectories[trajectoryCount].mid.y, trajectories[trajectoryCount].mid.z ),
        new THREE.Vector3( trajectories[trajectoryCount].mid.x, trajectories[trajectoryCount].mid.y, trajectories[trajectoryCount].mid.z ),
        new THREE.Vector3( trajectories[trajectoryCount].end.x, trajectories[trajectoryCount].end.y, trajectories[trajectoryCount].end.z )
    );

    splineGeometry = new THREE.Geometry();
    splineGeometry.vertices = curve.getPoints( 50 );
}

//scheduler loop
function animate() {
    //console.log("came inside the animate function...")
    controls.update();

    if(over == 0)
    {
        currentFrame =  new Date().getTime();
        var delta = currentFrame - prevFrame
        prevFrame = currentFrame;

        if(count == 50)
        {
            trajectoryCount++;

            if(trajectoryCount == trajectories.length)
            {
                over = 1;
//                    cancelAnimationFrame(animationTracker);
//                    return;
            }
            else
            {
                getSplineData();
                count = 0;
            }
        }

        if(over == 0)
        {
            //add court to the scene
            drawCourt();

            //add line to the scenes
            drawLine()

            //add sphere to the scene
            drawSphere();

            //add gas trail
            drawGasTrail();

            renderer.render(scene, camera);

            count += 1;

            //slow
            if(trajectories[trajectoryCount].velocity == 1)
            {
                animationTracker = setTimeout(animate,1000/30)
            }

            //normal
            else if(trajectories[trajectoryCount].velocity == 2)
            {
                animationTracker = requestAnimationFrame(animate);
            }

            //fast
            else if(trajectories[trajectoryCount].velocity == 3)
            {
                animationTracker = setTimeout(animate,1000/250)
            }
        }
    }

    if(over == 1)
    {
        renderer.render(scene,camera)
        requestAnimationFrame(animate)
    }
}

function drawSphere()
{
    sphere.position.x = splineGeometry.vertices[count].x;
    sphere.position.y = splineGeometry.vertices[count].y;
    sphere.position.z = splineGeometry.vertices[count].z;

    scene.add(sphere);

    if(count == 49)
    {
        console.log("count == "+count+"x=="+ splineGeometry.vertices[count].x+"y=="+ splineGeometry.vertices[count].y+"z=="+ splineGeometry.vertices[count].z);

        /* drawing the tempsphere */
        var tempsphere = new THREE.Mesh(new THREE.SphereGeometry(0.8,31,31), new THREE.MeshLambertMaterial({
            color: 'white',
        }));

        tempsphere.position.x = splineGeometry.vertices[count].x;
        tempsphere.position.y = splineGeometry.vertices[count].y;
        tempsphere.position.z = splineGeometry.vertices[count].z;

        scene.add(tempsphere);
    }

//        for(var i = 0;i<trajectoryCount;i++)
//        {
//            console.log("i == "+i);
//            var tempsphere = new THREE.Mesh(new THREE.SphereGeometry(0.8,31,31), new THREE.MeshLambertMaterial({
//                color: 'black',
//            }));
//
//            tempsphere.position.x = trajectories[i].end.x;
//            tempsphere.position.y = trajectories[i].end.y;
//            tempsphere.position.z = trajectories[i].end.z;
//
//            scene.add(tempsphere);
//        }

    scene.add(light);
}

function drawLine() {
    var lineGeometry = new THREE.Geometry();
    var lineMaterial = new THREE.LineBasicMaterial({
//            color: 0x0000ff
//            color : 0x00CC00
        color : 0xFFFF00
    });

    lineGeometry.vertices.push(
        splineGeometry.vertices[count],
        splineGeometry.vertices[count+1]
    );

    var line = new THREE.Line( lineGeometry, lineMaterial );
    scene.add( line );
}

function drawGasTrail()
{
    clock = new THREE.Clock(true);
    var delta = clock.getDelta() * spawnerOptions.timeScale;
    tick += delta;

    if (delta > 0) {
        options.position.x = splineGeometry.vertices[count].x;
        options.position.y = splineGeometry.vertices[count].y;
        options.position.z = splineGeometry.vertices[count].z;

        for(var i = 0;i<200;i++)
        {
            particleSystem.spawnParticle(options);
        }
    }

    particleSystem.update(tick);

    //console.log("tick=="+tick+"delta=="+delta)

    //renderer.render(scene, camera);
}

function myfunction()
{
    courtselection = "Wimbledon"
    console.log("clicked on '"+ courtselection + "'")

    over = 0;
    trajectoryCount = -1;
    count = 50;
    drawFloorAndSky();
    animate();
}

//// calls the init function when the window is done loading.
//window.onload = init;