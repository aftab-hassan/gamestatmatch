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
var playerIndex=-1,playerSelection; //Safin, Stepanek
var serveIndex=-1,serveSelection; //First serve, Second serve
var serveDirection;//ad_wide, ad_middle, ad_t, deuce_t, deuce_middle, deuce_wide
var row;//1 Total, 1 1, 1 2, 2 Total, 2 1, 2 2
var numServes;

/* Controllers */
/* file controller */
document.getElementById('myFile').addEventListener('change',readSingleFile,false)

/* Selection related UI related functions */
function updateSelection(selectionmade)
{
    /* playerSelection - Safin Stepanek */
    if(selectionmade == "playerSelection")
    {
        playerSelection=document.getElementById("playerselect");
        playerIndex = playerSelection[playerSelection.selectedIndex].index;
        playerSelection = playerSelection[playerSelection.selectedIndex].value;
        addTextHelper(0,playerSelection,-5,28,0,false,2,0.1);
        console.log("playerSelection == "+playerSelection);
    }

    /* serveSelection - First serve, Second serve */
    else if(selectionmade == "serveSelection")
    {
        /* first serve, second serve, both serves Selection */
        serveSelection=document.getElementById("serveselect");
        serveIndex = serveSelection[serveSelection.selectedIndex].index;
        serveSelection = serveSelection[serveSelection.selectedIndex].value;
        console.log("serveSelection == "+serveSelection);
    }

    /* court Position selection*/
    else
    {
        /* ad_wide, ad_middle, ad_t, deuce_t, deuce_middle, deuce_wide */
        //if(hasUnderscore(selectionmade) == true)
        //{
            //console.log("came inside this,selectionmade=="+selectionmade);
            serveDirection = selectionmade;

            //var delimiter = "_";
            ////console.log(playerSelection + "'s " + selectionmade.split(delimiter)[1] + " " + serveSelection + " to the " + selectionmade.split(delimiter)[0] + " side")
            //document.getElementById('updateText').textContent = playerSelection + "'s " + selectionmade.split(delimiter)[1] + " " + serveSelection + " to the " + selectionmade.split(delimiter)[0] + " side";
        //}

        /* wide, middle, t */
        //else
        //{
            //console.log(playerSelection + "'s " + " " + selectionmade + " " + serveSelection)
            //document.getElementById('updateText').textContent = playerSelection + "'s " + selectionmade + " " + serveSelection;
        //}
        console.log("serveDirection == "+serveDirection);
    }

    /* The following if check ensures that I try to find the 'row' from the JSON file, only after the
    * player and serve have been seleected from drop down list */
    if(playerIndex != -1 && serveIndex != -1)
    {
        /* 1 Total, 1 1, 1 2, 2 Total, 2 1, 2 2 */
        if(serveIndex == 1)
            row = playerIndex + " Total";
        else if(serveIndex == 2)
            row = playerIndex + " 1";
        else if(serveIndex == 3)
            row = playerIndex + " 2";
        console.log("playerSelection=="+playerSelection+",serveSelection=="+serveSelection+",row=="+row);
    }
}

/* function to read file */
function readSingleFile(evt)
{
    //console.log("came inside readSingleFile...");

    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];

    if (f)
    {
        var r = new FileReader();
        r.onload = function(e)
        {
            var contents = e.target.result;
            JSONobj = JSON.parse(contents);
            //console.log(JSONobj[0].ad_wide);
            //console.log(JSONobj[0].match_id);

            /* populating drop down list - "match_id":"20041107-M-Paris_Masters-F-Marat_Safin-Radek_Stepanek", */
            var dropdownListID = document.getElementById("playerselect");
            var defaultOption = new Option("Select player","Select player");
            var player1 = new Option(JSONobj[0].match_id.split("-")[4],JSONobj[0].match_id.split("-")[4]);
            var player2 = new Option(JSONobj[0].match_id.split("-")[5],JSONobj[0].match_id.split("-")[5]);
            dropdownListID.options[0] = defaultOption;
            dropdownListID.options[1] = player1;
            dropdownListID.options[2] = player2;
        }
        r.readAsText(f);
    }
    else
    {
        alert("Failed to load file");
    }
}

/* setting variable called 'serveTabClickCount' in browser storage */
function setCount(value)
{
    // Storing the data:
    localStorage.setItem("serveTabClickCount",value);
}

function getCount()
{
    // Receiving the data:
    return localStorage.getItem("serveTabClickCount");
}

/* to scroll through top of page */
window.scrollTo(0,0);

/* on closing the page */
window.onbeforeunload = function() {
    //console.log("came inside window.onbeforeunload,value=="+getCount())
    localStorage.removeItem("serveTabClickCount");
    //console.log("came inside window.onbeforeunload,value=="+getCount())
    return '';
};

/* boolean check if a string 's' has white space in it */
function hasUnderscore(s) {
    return s.indexOf('_') >= 0;
}
/*************************************************************************************************************/
/* Three.js */
/* Three.js variables */
var angularSpeed = 0.2;
var lastTime = 0;
var SCREEN_WIDTH,SCREEN_HEIGHT,scene,camera,renderer,light,container,animationTracker,controls;
var courtSelection;
var floormesh=null,floorTexture,floorMaterial,floorGeometry;//floor
var skyBoxGeometry,skyBoxMaterial,skyBox;//sky
var nEnd = 0,nMax,nStep = 120;
var mesh;
var textMeshArray = [];
//var textAnimationCount = 0;

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
    SCREEN_WIDTH = window.innerWidth-110, SCREEN_HEIGHT = window.innerHeight-100;

    /* 2.scene*/
    scene = new THREE.Scene();

    /* 3.camera */
    camera = new THREE.PerspectiveCamera(45,SCREEN_WIDTH/SCREEN_HEIGHT,0.1,1000);
    //camera.position.x = 0;
    //camera.position.y = 30;
    //camera.position.z = 40;

    camera.position.x = 0;
    camera.position.y = 10;
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
    //console.log("init function called...");
    //console.log("globalClickCount=="+getCount());

    //console.log("playerIndex=="+playerIndex+",serveIndex=="+serveIndex+",serveDirection=="+serveDirection);
    //console.log("localStorage variable=="+getCount());
    if(getCount() == null)
    {
        /* set the variable for localStorage */
        setCount(1);
        //console.log("localStorage variable has been set, value=="+getCount());

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
        //console.log("came inside the config setting part of init function...")

        /* 1.set SCREEN_WIDTH and SCREEN_HEIGHT */
        SCREEN_WIDTH = window.innerWidth-110, SCREEN_HEIGHT = window.innerHeight;

        /* 2.scene*/
        scene = new THREE.Scene();

        /* 3.camera */
        camera = new THREE.PerspectiveCamera(45,SCREEN_WIDTH/SCREEN_HEIGHT,0.1,1000);
        camera.position.x = 0;
        camera.position.y = 20;
        camera.position.z = 58;
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

        /* 7.light - commented out is the earlier light configuration which renders court lines as black
         , what is below is what gives the court the white lines */
        //light = new THREE.DirectionalLight('white',1);
        ////light.position.set(0,10,10).normalize();
        //light.position.set(20,20,0).normalize();

        // ambient
        scene.add( new THREE.AmbientLight( 0xffffff, 0.4 ) );
        // light
        light = new THREE.PointLight( 0xffffff, 0.5 );
        light.position.set( 20, 20, 0 );
        camera.add( light );

        /* adding elements to scene */
        resizeWindowAndToggleOnM();
        drawCourt();
        drawFloorAndSky();

        /* 8.weave together */
        container = document.getElementById('ThreeJS')
        container.appendChild(renderer.domElement);
        //scene.add(cube);
    }

    else
    {
        //console.log("count=="+getCount())
        setCount(parseInt(getCount())+1);
        //console.log("came inside the config setting NOT NEEDED part of init function...")

        /* display serve information */
        var space = 3;
        var sphereYRadiusAdjustment = 1;

        //show ball marker
        var markerSphere = new THREE.Mesh(new THREE.SphereGeometry(0.8,31,31), new THREE.MeshLambertMaterial({
            color: getCurveColor(),
            opacity: 1,
            transparent: true,
            //wireframe : true,
        }));
        markerSphere.position.x = -43;
        markerSphere.position.y = 26-((getCount()-1)*space) + sphereYRadiusAdjustment;
        markerSphere.position.z = 0;
        scene.add(markerSphere);

        //show text
        addTextHelper(0,"Direction : "+getServeDirectionToAddText(),-40,26-((getCount()-1)*space),0,false,1.8,0.1);
        addTextHelper(0,"Serves : "+getNumberOfServesToAddText(),-12,26-((getCount()-1)*space),0,false,1.8,0.1);
        addTextHelper(0,"Avg. Height : "+getAverageServeHeightToAddText(),5,26-((getCount()-1)*space),0,false,1.8,0.1);
        addTextHelper(0,"Avg. Speed : "+getAverageServeSpeedToAddText(),23,26-((getCount()-1)*space),0,false,1.8,0.1);
        //console.log("y coordinate == "+22-((getCount()-1)*space));

        /* plot serve trajectory */
        drawIncrementalTubeAndSphere();
    }

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

/* actual dimensions - draw court using TubeGeometry (uses drawCourtHelper) */
//function drawCourt()
//{
//    var correctionFactor = 0.5;
//
//    //left side
//    drawCourtHelper(new THREE.Vector3(-13.5*correctionFactor,0*correctionFactor,39.5),new THREE.Vector3(-13.5*correctionFactor,0*correctionFactor,-39.5))
//    drawCourtHelper(new THREE.Vector3(-18*correctionFactor,0*correctionFactor,39.5),new THREE.Vector3(-18*correctionFactor,0*correctionFactor,-39.5))
//
//    //right side
//    drawCourtHelper(new THREE.Vector3(13.5*correctionFactor,0*correctionFactor,39.5),new THREE.Vector3(13.5*correctionFactor,0*correctionFactor,-39.5))
//    drawCourtHelper(new THREE.Vector3(18*correctionFactor,0*correctionFactor,39.5),new THREE.Vector3(18*correctionFactor,0*correctionFactor,-39.5))
//
//    //far side baseline
//    drawCourtHelper(new THREE.Vector3(-18*correctionFactor,0*correctionFactor,-39.5),new THREE.Vector3(18*correctionFactor,0*correctionFactor,-39.5))
//
//    //near side baseline
//    drawCourtHelper(new THREE.Vector3(-18*correctionFactor,0*correctionFactor,39.5),new THREE.Vector3(18*correctionFactor,0*correctionFactor,39.5))
//
//    //far side service box
//    drawCourtHelper(new THREE.Vector3(-13.5*correctionFactor,0*correctionFactor,-21),new THREE.Vector3(13.5*correctionFactor,0*correctionFactor,-21))
//
//    //near side service box
//    drawCourtHelper(new THREE.Vector3(-13.5*correctionFactor,0*correctionFactor,21),new THREE.Vector3(13.5*correctionFactor,0*correctionFactor,21))
//
//    //middle line vertical
//    drawCourtHelper(new THREE.Vector3(0*correctionFactor,0*correctionFactor,21),new THREE.Vector3(0*correctionFactor,0*correctionFactor,-21))
//
//    //middle line horizontal
//    drawCourtHelper(new THREE.Vector3(-13.5*correctionFactor,0*correctionFactor,0),new THREE.Vector3(13.5*correctionFactor,0*correctionFactor,0))
//
//    //far side mid tip
//    drawCourtHelper(new THREE.Vector3(0*correctionFactor,0*correctionFactor,-39.5),new THREE.Vector3(0*correctionFactor,0*correctionFactor,-38.5))
//
//    //near side mid tip
//    drawCourtHelper(new THREE.Vector3(0*correctionFactor,0*correctionFactor,39.5),new THREE.Vector3(0*correctionFactor,0*correctionFactor,38.5))
//}

/* draw court using TubeGeometry (uses drawCourtHelper) */
function drawCourt()
{
    /* far side */
    var farBaselineZ = -35;

    /* near side */
    var nearBaselineZ = 15;

    /* left side */
    var leftSinglesLineX = -15, leftDoublesLineX = -20;

    /* right side */
    var rightSinglesLineX = 15, rightDoublesLineX = 20;

    /* coordinates needing computation */
    var midLineX = leftDoublesLineX + (rightDoublesLineX - leftDoublesLineX)/2
    var nearServiceBoxZ = nearBaselineZ - (0.4 * ((nearBaselineZ - farBaselineZ)/2));
    var farServiceBoxZ = farBaselineZ + (0.4 * ((nearBaselineZ - farBaselineZ)/2));

    //left side
    drawCourtHelper(new THREE.Vector3(leftSinglesLineX,0,nearBaselineZ),new THREE.Vector3(leftSinglesLineX,0,farBaselineZ))
    drawCourtHelper(new THREE.Vector3(leftDoublesLineX,0,nearBaselineZ),new THREE.Vector3(leftDoublesLineX,0,farBaselineZ))

    //right side
    drawCourtHelper(new THREE.Vector3(rightSinglesLineX,0,nearBaselineZ),new THREE.Vector3(rightSinglesLineX,0,farBaselineZ))
    drawCourtHelper(new THREE.Vector3(rightDoublesLineX,0,nearBaselineZ),new THREE.Vector3(rightDoublesLineX,0,farBaselineZ))

    //far side baseline
    drawCourtHelper(new THREE.Vector3(leftDoublesLineX,0,farBaselineZ),new THREE.Vector3(rightDoublesLineX,0,farBaselineZ))

    //near side baseline
    drawCourtHelper(new THREE.Vector3(leftDoublesLineX,0,nearBaselineZ),new THREE.Vector3(rightDoublesLineX,0,nearBaselineZ))

    //far side service box
    drawCourtHelper(new THREE.Vector3(leftSinglesLineX,0,farServiceBoxZ),new THREE.Vector3(rightSinglesLineX,0,farServiceBoxZ))

    //near side service box
    drawCourtHelper(new THREE.Vector3(leftSinglesLineX,0,nearServiceBoxZ),new THREE.Vector3(rightSinglesLineX,0,nearServiceBoxZ))

    //middle line vertical
    drawCourtHelper(new THREE.Vector3(midLineX,0,farServiceBoxZ),new THREE.Vector3(midLineX,0,nearServiceBoxZ))

    //far side mid tip
    drawCourtHelper(new THREE.Vector3(midLineX,0,farBaselineZ),new THREE.Vector3(midLineX,0,farBaselineZ+1))

    //near side mid tip
    drawCourtHelper(new THREE.Vector3(midLineX,0,nearBaselineZ),new THREE.Vector3(midLineX,0,nearBaselineZ-1))

    //addTextHelper(0,"MARAT SAFIN",-5,24,0,false,2,0.1);
    //addText("Serve Direction",-3,23,0,true,1,0.1);

    //var cube = new THREE.Mesh(new THREE.CubeGeometry(1,1,1), new THREE.MeshLambertMaterial({
    //    color: 'orange',
    //}));
    //cube.position.x = -10;
    //cube.position.y = 10;
    //cube.position.z = 0;
    //
    //var light = new THREE.DirectionalLight('white', 1);
    //light.position.set(10,40,50).normalize();
    //scene.add(light);
    //scene.add(cube);
    //
    //sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5,31,31), new THREE.MeshLambertMaterial({
    //
    //    color: 'red',
    //    opacity: 0.4,
    //    transparent: true,
    //    wireframe : true,
    //}));
    //sphere.position.x = -10;
    //sphere.position.y = 20;
    //sphere.position.z = 0;
    //
    //scene.add(sphere);

    addTextHelper(0,"serve direction",-3,27,0,true,1,0.1);
}

function drawCourtHelper(coordinate1, coordinate2)
{
    /* left singles horizontal */
    // path
    var points = [];
    points.push(coordinate1,coordinate2 )

    // params
    var pathSegments = 512;
    var tubeRadius = 0.15;
    var radiusSegments = 5;
    var closed = false;

    // material
    var material = new THREE.MeshPhongMaterial( {
        //color: 0x00ffff, //alice blue
        color: 'white',
        side: THREE.DoubleSide
    } );

    var path = new THREE.CatmullRomCurve3( points );

    // geometry
    var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, open );

    // to buffer goemetry
    geometry = new THREE.BufferGeometry().fromGeometry( geometry );

    // mesh
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
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
    controls.target.set( 0, 8, 0 );

    ///////////
    // FLOOR //
    ///////////
    // note: 4x4 checkboard pattern scaled so that each square is 25 by 25 pixels.
    //var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
    floorTexture = new THREE.ImageUtils.loadTexture( '../images/grass256.jpg' );
    while (floorTexture == null);
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 20, 20 );
    // DoubleSide: render texture on both sides of mesh
    floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    floorGeometry = new THREE.PlaneGeometry(110, 110, 1, 1);
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
    //console.log("came inside getTubeData...");

    var XCoordinate = (Math.random()*(XCoordinateEnd-XCoordinateStart))+XCoordinateStart;
    var YCoordinate = (Math.random()*(30-25))+25;
    var ZCoordinate = Math.floor((Math.random() * (25-12)) + 12 ) *  -1;//get random number between -12 and -25

    var numPoints = 10;
    var start;
    /* ad side */
    if(XCoordinateStart >= 0 && XCoordinateStart <= 15)
        start = new THREE.Vector3(-0, 0, 80);
    /* deuce side */
    else if(XCoordinateStart >= -15 && XCoordinateStart <= 0)
        start = new THREE.Vector3(0, 0, 80);
    var middle = new THREE.Vector3(0, YCoordinate, 20);
    var end = new THREE.Vector3(XCoordinate, 0, ZCoordinate);

    var curveQuad = new THREE.QuadraticBezierCurve3(start, middle, end);
    var tube = new THREE.TubeGeometry(curveQuad, numPoints, 0.5, 1, false);

    var points = [];
    for(var i = 0;i<tube.vertices.length;i++)
    {
        if(tube.vertices[i].z <= 15)
            points.push(new THREE.Vector3(tube.vertices[i].x,tube.vertices[i].y,tube.vertices[i].z));
    }
    //points = tube.vertices;
    //console.log("printing tube vertices...")
    //for(var i = 0;i<tube.vertices.length;i++)
    //{
    //    console.log("vertices["+i+"]==("+tube.vertices[i].x+","+tube.vertices[i].y+","+tube.vertices[i].z+")")
    //}

    //console.log("returned points...");
    return points;
}

function getServeCountInDirection()
{
    for(var i = 0; i < JSONobj.length; i++)
    {
        if(JSONobj[i].row == row)
            return JSONobj[i][serveDirection];
    }
}

function getCurveColor()
{
    switch(serveDirection)
    {
        case 'ad_wide':
            return 0x00ffff;
        case 'ad_middle':
            return 0x9ACD32;
        case 'ad_t':
            return 0xFF3300;
        case 'deuce_t':
            return 0x000033;
        case 'deuce_middle':
            return 0xFEE0C6;
        case 'deuce_wide':
            return 0xFF6600;
    }
}

function drawIncrementalTubeAndSphere()
{
    var curveColor;
    var curveColorDebug;

    //console.log("serveDirection=="+serveDirection)
    var XCoordinateStart,XCoordinateEnd;

    numServes = getServeCountInDirection()
    console.log("numServes ==" + numServes);

    /* setting XCoordinate based on  serveDirection */
    switch (serveDirection) {
        case 'ad_wide':
            XCoordinateStart = -15;
            XCoordinateEnd = -10;
            curveColor = getCurveColor();//alice blue
            curveColorDebug = 'alice blue'
            break;
        case 'ad_middle':
            XCoordinateStart = -10;
            XCoordinateEnd = -3;
            curveColor = getCurveColor();//yellow green
            curveColorDebug = 'yellow green'
            break;
        case 'ad_t':
            XCoordinateStart = -3;
            XCoordinateEnd = 0;
            curveColor = getCurveColor();//red
            curveColorDebug = 'red'
            break;
        case 'deuce_t':
            XCoordinateStart = 0;
            XCoordinateEnd = 3;
            curveColor = getCurveColor();//blue
            curveColorDebug = 'blue'
            break;
        case 'deuce_middle':
            XCoordinateStart = 3;
            XCoordinateEnd = 10;
            curveColor = getCurveColor();//caramel
            curveColorDebug = 'caramel'
            break;
        case 'deuce_wide':
            XCoordinateStart = 10;
            XCoordinateEnd = 15;
            curveColor = getCurveColor();//orange
            curveColorDebug = 'orange'
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

    /* curve config */
    // params
    var pathSegments = 512;
    var tubeRadius = 0.2;
    var radiusSegments = 8;
    var closed = false;

    // material
    var material = new THREE.MeshPhongMaterial( {
        opacity: 0.4,
        transparent: true,
        color:curveColor,
        side: THREE.DoubleSide
    } );
    //console.log("serveDirection=="+serveDirection+",curveColorDebug=="+curveColorDebug);

    //// ambient
    //scene.add( new THREE.AmbientLight( 0xffffff, 0.4 ) );
    //
    //// light
    //var light = new THREE.PointLight( 0xffffff, 0.5 );
    //light.position.set( 20, 20, 0 );
    //camera.add( light );

    //gets the points required by the serve's TubeGeometry
    for(var i =0;i<numServes;i++)
    {
        var points = getTubeData(XCoordinateStart,XCoordinateEnd);

        // path
        var path = new THREE.CatmullRomCurve3( points );

        // geometry
        var geometry = new THREE.TubeGeometry( path, pathSegments, tubeRadius, radiusSegments, closed );

        // to buffer goemetry
        geometry = new THREE.BufferGeometry().fromGeometry( geometry );
        nMax = geometry.attributes.position.count;

        // mesh
        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        //animateIncrementalServe();
        displaySphere(points,curveColor);
    }
    material = null;
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

function displaySphere(points,curveColor)
{
    //console.log("came inside displaySphere");

    //for(var i = 0;i<points.length;i++)
    //{
    //    if(i%3 == 0)
    //    {
    //        sphere = new THREE.Mesh(new THREE.SphereGeometry(0.2,31,31), new THREE.MeshLambertMaterial({
    //            color: 'yellow',
    //            opacity: 1.0,
    //            transparent: true,
    //        }));
    //
    //        sphere.position.x = points[i].x;
    //        sphere.position.y = points[i].y;
    //        sphere.position.z = points[i].z;
    //
    //        scene.add(sphere);
    //    }
    //}
    //renderer.render(scene, camera);

    var sphere;
    /* adding the start point to be yellow */
    sphere = new THREE.Mesh(new THREE.SphereGeometry(0.2,31,31), new THREE.MeshLambertMaterial({

        color: 'yellow',
        opacity: 1.0,
        transparent: true,
    }));
    sphere.position.x = points[0].x;
    sphere.position.y = points[0].y;
    sphere.position.z = points[0].z;
    scene.add(sphere);

    /* adding the end point to be curveColor */
    sphere = new THREE.Mesh(new THREE.SphereGeometry(0.2,31,31), new THREE.MeshLambertMaterial({
        color: curveColor,
        opacity: 1.0,
        transparent: true,
    }));
    sphere.position.x = points[points.length-1].x;
    sphere.position.y = points[points.length-1].y;
    sphere.position.z = points[points.length-1].z;
    scene.add(sphere);

    renderer.render(scene, camera);
}

/* text related functions */
function generateRandomString(length)
{
    var randomString = "";
    var wideNumbers = ['2','3','4','5','6','8'];
    var hexAlphabet = ['A','B','C','D','E','F'];
    var randomChoice = Math.floor(Math.random()*100);
    if(randomChoice %2 == 0)
    {
        //console.log("randomChoice even... == "+randomChoice);
        for(var i = 0;i<length;i++)
        {
//                randomString += Math.floor(Math.random() * 2)
            randomString += wideNumbers[Math.floor(Math.random() * (wideNumbers.length - 1) )]
        }
    }
    else
    {
        //console.log("randomChoice odd... "+randomChoice);
        for(var i = 0;i<length;i++)
        {
            randomString += hexAlphabet[Math.floor(Math.random() * (hexAlphabet.length - 1) )]
        }
    }
    return randomString;
}

//function addTextHelper(textAnimationCount,text,XCoordinate,YCoordinate,ZCoordinate,persist,textSize,textHeight)
//{
//    /* Logic
//     Assume : var textLoadBreakpointsArray = [5,10,20,30,40]
//     var textBlinkBreakpointsArray = [50,100,150,200];
//
//     LOAD STAGE
//     ----------
//     * 1.textAnimationCount == 1, addText() function not called
//     * 2.textAnimationCount == 2, addText() function not called
//     * 3.textAnimationCount == 3, addText() function not called
//     * 4.textAnimationCount == 4, addText() function not called
//     * 5.textAnimationCount == 5, addText() function called,
//     *                            deletes empty array,
//     *                            displays text==DBBBABAADCE,
//     *                            added to textMeshArray so as to delete next time addText() is called, which is at 10
//     * 6-9.textAnimationCount == 6-9,addText() function not called, mesh keeps displaying same text==DBBBABAADCE
//     * 10.textAnimationCount == 10,addText() function called,
//     *                          deletes the mesh displaying DBBBABAADCE,
//     *                          displays text==08282382282,
//     * 10-19                    and keeps displaying so till 19
//     * ..
//     * ..
//     * 30.textAnimationCount == 30, deletes ABCDEFFGSD, displays 43643646334
//     * 30-39.textAnimationCount == addText() function not called, displays text==43643646334
//     * 40.textAnimationCount == 40, addText() function called,
//     *                              deletes the mesh displaying DBBBABAADCE,
//     *                              displays text 4652345236
//     *
//     *  BLINK STAGE
//     *  -----------
//     *  50-59 displays MARAT SAFIN, 60-99 displays ""
//     *   60 because (textAnimationCount - textBlinkBreakpointsArray[i]) < blinkDelay), and not <= blinkDelay
//     *  100-109 displays MARAT SAFIN, 110-149 displays ""
//     *  150-159 displays MARAT SAFIN, 160-199 displays ""
//     * 200 displays persistent text MARAT SAFIN
//     *
//     * 50-59 explained
//     * 50.textAnimationCount == 50
//     *  addText() function called,
//     *  deletes empty textMeshArray
//     *  displays MARAT SAFIN
//     *  adds MARAT SAFIN to mesh
//     *
//     * 51.textAnimationCount == 51
//     *  addText() function called,
//     *  deletes textMeshArray having MARAT SAFIN
//     *  displays new text MARAT SAFIN
//     *  adds MARAT SAFIN to mesh
//     *  ..
//     *  ..
//     *
//     * 60.textAnimationCount == 60
//     *  addText() function called,
//     *  deletes textMeshArray having MARAT SAFIN
//     *  displays new text ""
//     *  adds "" to textMeshArray
//     *  61-99.textAnimationCount == 61-99
//     *  addText() function called,
//     *  deletes textMeshArray having ""
//     *  displays new text ""
//     *  adds "" to textMeshArray
//     *
//     * */
////        console.log("text=="+text);
////    console.log("textAnimationCount=="+textAnimationCount);
////        console.log("came inside addTextHelper as addTextHelper("+textAnimationCount+","+text+","+XCoordinate+","+YCoordinate+","+ZCoordinate+","+persist+")");
////        textAnimationCount++;
//
////        console.log("textAnimationCount=="+textAnimationCount);
//
//    /* shuffle and load characters */
//    var textLoadBreakpointsArray = [5,10,20,30,40]
//    if(textLoadBreakpointsArray.indexOf(textAnimationCount) > -1)
//    {
//        addText(generateRandomString(text.length),XCoordinate,YCoordinate,ZCoordinate,false,textSize,textHeight)
//    }
//
//    /* blink */
//    var textBlinkBreakpointsArray = [50,100,150,200];
//    var blinkDelay = 10;
//    var blinkDisplayNeeded = false;
//    if(textAnimationCount >= textBlinkBreakpointsArray[0] && textAnimationCount < textBlinkBreakpointsArray[textBlinkBreakpointsArray.length - 1])
//    {
//        for(var i = 0;i<textBlinkBreakpointsArray.length;i++)
//        {
//            if( (textAnimationCount - textBlinkBreakpointsArray[i]) >=0 &&
//                (textAnimationCount - textBlinkBreakpointsArray[i]) < blinkDelay)
//            {
//                blinkDisplayNeeded = true;
//                break;
//            }
//        }
//        //console.log("textAnimationCount=="+textAnimationCount+",blinkDisplayNeeded=="+blinkDisplayNeeded+",teed off by"+textBlinkBreakpointsArray[i]);
//        if(blinkDisplayNeeded == true)
//            addText(text,XCoordinate,YCoordinate,ZCoordinate,false,textSize,textHeight)
//        else
//            addText("",XCoordinate,YCoordinate,ZCoordinate,false,textSize,textHeight)
//    }
//
//    /* final persistent display */
//    if(textAnimationCount == textBlinkBreakpointsArray[textBlinkBreakpointsArray.length -1])
//        addText(text,XCoordinate,YCoordinate,ZCoordinate,true,textSize,textHeight)
//
//    requestAnimationFrame( function(){addTextHelper(textAnimationCount+1,text,XCoordinate,YCoordinate,ZCoordinate,persist,textSize,textHeight)} );
//}

function addTextHelper(textAnimationCount,text,XCoordinate,YCoordinate,ZCoordinate,persist,textSize,textHeight)
{
    /* Logic
     Assume : var textLoadBreakpointsArray = [5,10,20,30,40]
     var textBlinkBreakpointsArray = [50,100,150,200];

     LOAD STAGE
     ----------
     * 1.textAnimationCount == 1, addText() function not called
     * 2.textAnimationCount == 2, addText() function not called
     * 3.textAnimationCount == 3, addText() function not called
     * 4.textAnimationCount == 4, addText() function not called
     * 5.textAnimationCount == 5, addText() function called,
     *                            deletes empty array,
     *                            displays text==DBBBABAADCE,
     *                            added to textMeshArray so as to delete next time addText() is called, which is at 10
     * 6-9.textAnimationCount == 6-9,addText() function not called, mesh keeps displaying same text==DBBBABAADCE
     * 10.textAnimationCount == 10,addText() function called,
     *                          deletes the mesh displaying DBBBABAADCE,
     *                          displays text==08282382282,
     * 10-19                    and keeps displaying so till 19
     * ..
     * ..
     * 30.textAnimationCount == 30, deletes ABCDEFFGSD, displays 43643646334
     * 30-39.textAnimationCount == addText() function not called, displays text==43643646334
     * 40.textAnimationCount == 40, addText() function called,
     *                              deletes the mesh displaying DBBBABAADCE,
     *                              displays text 4652345236
     *
     *  BLINK STAGE
     *  -----------
     *  50-59 displays MARAT SAFIN, 60-99 displays ""
     *   60 because (textAnimationCount - textBlinkBreakpointsArray[i]) < blinkDelay), and not <= blinkDelay
     *  100-109 displays MARAT SAFIN, 110-149 displays ""
     *  150-159 displays MARAT SAFIN, 160-199 displays ""
     * 200 displays persistent text MARAT SAFIN
     *
     * 50-59 explained
     * 50.textAnimationCount == 50
     *  addText() function called,
     *  deletes empty textMeshArray
     *  displays MARAT SAFIN
     *  adds MARAT SAFIN to mesh
     *
     * 51.textAnimationCount == 51
     *  addText() function called,
     *  deletes textMeshArray having MARAT SAFIN
     *  displays new text MARAT SAFIN
     *  adds MARAT SAFIN to mesh
     *  ..
     *  ..
     *
     * 60.textAnimationCount == 60
     *  addText() function called,
     *  deletes textMeshArray having MARAT SAFIN
     *  displays new text ""
     *  adds "" to textMeshArray
     *  61-99.textAnimationCount == 61-99
     *  addText() function called,
     *  deletes textMeshArray having ""
     *  displays new text ""
     *  adds "" to textMeshArray
     *
     * */
//        console.log("text=="+text);
//    console.log("textAnimationCount=="+textAnimationCount);
//        console.log("came inside addTextHelper as addTextHelper("+textAnimationCount+","+text+","+XCoordinate+","+YCoordinate+","+ZCoordinate+","+persist+")");
//        textAnimationCount++;

//        console.log("textAnimationCount=="+textAnimationCount);

    /* shuffle and load characters */
    var textLoadBreakpointsArray = [5,10,15]
    if(textLoadBreakpointsArray.indexOf(textAnimationCount) > -1)
    {
        addText(generateRandomString(text.length),XCoordinate,YCoordinate,ZCoordinate,false,textSize,textHeight)
    }

    /* blink */
    var textBlinkBreakpointsArray = [20,35];
    var blinkDelay = 10;
    var blinkDisplayNeeded = false;
    if(textAnimationCount >= textBlinkBreakpointsArray[0] && textAnimationCount < textBlinkBreakpointsArray[textBlinkBreakpointsArray.length - 1])
    {
        for(var i = 0;i<textBlinkBreakpointsArray.length;i++)
        {
            if( (textAnimationCount - textBlinkBreakpointsArray[i]) >=0 &&
                (textAnimationCount - textBlinkBreakpointsArray[i]) < blinkDelay)
            {
                blinkDisplayNeeded = true;
                break;
            }
        }
        //console.log("textAnimationCount=="+textAnimationCount+",blinkDisplayNeeded=="+blinkDisplayNeeded+",teed off by"+textBlinkBreakpointsArray[i]);
        if(blinkDisplayNeeded == true)
            addText(text,XCoordinate,YCoordinate,ZCoordinate,false,textSize,textHeight)
        else
            addText("",XCoordinate,YCoordinate,ZCoordinate,false,textSize,textHeight)
    }

    /* final persistent display */
    if(textAnimationCount == textBlinkBreakpointsArray[textBlinkBreakpointsArray.length -1])
        addText(text,XCoordinate,YCoordinate,ZCoordinate,true,textSize,textHeight)

    requestAnimationFrame( function(){addTextHelper(textAnimationCount+1,text,XCoordinate,YCoordinate,ZCoordinate,persist,textSize,textHeight)} );
}

/* adds text given a string */
/* Correct call : //addText("PLAYER : ",-25,16,0,true); */
function addText(text,XCoordinate,YCoordinate,ZCoordinate,persist,textSize,textHeight)
{
    //console.log(" came inside addText as addText("+text+","+XCoordinate+","+YCoordinate+","+ZCoordinate+","+persist+")");
    //console.log("text=="+text);

    //clear till last
    for(var i =0;i<textMeshArray.length;i++)
        scene.remove(textMeshArray[i]);

    // add 3D text
    //var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    //var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xf0f8ff } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0xf0f8ff } );
    var materialArray = [ materialFront, materialSide ];

//	var textGeom = new THREE.TextGeometry( "Hello, World!",
//			{
//				size: 1, height: 0.1, curveSegments: 3,
//				font: fontname, weight:'bold',
//				bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
//				material: 0, extrudeMaterial: 1
//			});
    var textGeom = new THREE.TextGeometry( text, {
        font: 'digital-7',size:textSize,height:textHeight
    });

    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
    var textMesh = new THREE.Mesh(textGeom, textMaterial );

    textGeom.computeBoundingBox();
    var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;

    textMesh.position.set( XCoordinate,YCoordinate,ZCoordinate );
    //textMesh.rotation.x = -Math.PI / 4;
    scene.add(textMesh);
    if(persist == false)
        textMeshArray.push(textMesh);

    renderer.render(scene,camera);

    //if(persist == false)
    //    scene.remove(textMesh);
}

/* helper function to addText giving serve information, which translates
* ad_wide : Ad court wide
* ad_middle : Ad court middle
* ad_t : Ad court T
* deuce_wide : Deuce court wide
* deuce_middle : Deuce court middle
* deuce_t : Deuce court T
* */
function getServeDirectionToAddText()
{
    switch(serveDirection)
    {
        case 'ad_wide':
            return "Ad court wide";
        case 'ad_middle':
            return "Ad court mid";
        case 'ad_t':
            return "Ad court T";
        case 'deuce_wide':
            return "Deuce court wide";
        case 'deuce_middle':
            return "Deuce court mid";
        case 'deuce_t':
            return "Deuce court T";
    }
}

/* helper function to addText giving serve information, on the number of serves made in that direction */
function getNumberOfServesToAddText()
{
    //return "22/88";
    numServes = getServeCountInDirection()

    var totalServes = 0;
    for(var i = 0;i<JSONobj.length;i++)
    {
        if(JSONobj[i].row == row)
        {
            totalServes = JSONobj[i]["ad_wide"] + JSONobj[i]["ad_middle"] + JSONobj[i]["ad_t"]
            +JSONobj[i]["deuce_t"] + JSONobj[i]["deuce_middle"] + JSONobj[i]["deuce_wide"];
            break;
        }
    }
    console.log("numServes=="+numServes);
    console.log("totalServes=="+totalServes);
    return (numServes.toString() + " / " + totalServes.toString());
}

/* helper function to addText giving serve information, on the average height of serves made in that direction */
function getAverageServeHeightToAddText()
{
    return (Math.floor(((Math.random()*(20-10))+10)).toString() + "m");
}

/* helper function to addText giving serve information, on the average speed of serves made in that direction */
function getAverageServeSpeedToAddText()
{
    return (Math.floor((Math.random()*(140-100))+100).toString() + "mph");
}