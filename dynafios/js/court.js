/**
 * Created by aftab on 4/1/2016.
 */

/*************************************************************************************************************/
/* Three.js */
/* Three.js variables */
var angularSpeed = 0.2;
var lastTime = 0;
var SCREEN_WIDTH,SCREEN_HEIGHT,scene,camera,renderer,light,container,animationTracker,controls;
var courtSelection;
var floormesh=null,floorTexture,floorMaterial,floorGeometry;//floor
var skyBoxGeometry,skyBoxMaterial,skyBox;//sky
var textMeshArray = [];
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
var netLineZ = nearBaselineZ - ((nearBaselineZ - farBaselineZ)/2)
var pins = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var clothGeometry;

/* three.js helper functions */

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

    /* 1.set SCREEN_WIDTH and SCREEN_HEIGHT */
    SCREEN_WIDTH = window.innerWidth-110, SCREEN_HEIGHT = window.innerHeight;

    /* 2.scene*/
    scene = new THREE.Scene();

    /* 3.camera */
    camera = new THREE.PerspectiveCamera(45,SCREEN_WIDTH/SCREEN_HEIGHT,0.1,1000);
    camera.position.x = 0;
    camera.position.y = 40;
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
    drawNet();
    //playSound('../sounds/courtBackground.mp3',0);
    drawFloorAndSky();
    //datGUIControls();

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

/* draw court using TubeGeometry (uses drawCourtHelper) */
function drawCourt()
{
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
}

function drawCourtHelper(coordinate1, coordinate2)
{
    var courtMesh;

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

    // courtMesh
    courtMesh = new THREE.Mesh( geometry, material );
    scene.add( courtMesh );
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
    //controls.target.set( 0, 8, 0 );

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

function drawNet()
{
    console.log("came inside drawNet...");
    netConfig();
    netAnimate();
}

function netConfig()
{
    // cloth material

    var clothLoader = new THREE.TextureLoader();
    var clothTexture = clothLoader.load( '../images/circuit_pattern.png' );
    //console.log("next line prints THREE.RepeatWrapping ... ");
    //console.log(THREE.RepeatWrapping);
    //console.log(clothTexture.wrapS);
    //clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
    //clothTexture.anisotropy = 16;

    var clothMaterial = new THREE.MeshPhongMaterial( {
        specular: 0x030303,
        map: clothTexture,
        side: THREE.DoubleSide,
        alphaTest: 0.5
    } );

    // cloth geometry
    clothGeometry = new THREE.ParametricGeometry( clothFunction, cloth.w, cloth.h );
    clothGeometry.dynamic = true;

    var uniforms = { texture:  { type: "t", value: clothTexture } };

    // cloth mesh

    var object = new THREE.Mesh( clothGeometry, clothMaterial );
    object.position.set( 0, 0, -10 );
    object.castShadow = true;
    scene.add( object );

    object.customDepthMaterial = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        side: THREE.DoubleSide
    } );
}

function netAnimate() {

    requestAnimationFrame( netAnimate );

    var time = Date.now();

    windStrength = Math.cos( time / 7000 ) * 20 + 40;
    windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) ).normalize().multiplyScalar( windStrength );

    simulate( time );
    netRender();

}

function netRender() {

    var timer = Date.now() * 0.0002;

    var p = cloth.particles;

    for ( var i = 0, il = p.length; i < il; i ++ ) {

        clothGeometry.vertices[ i ].copy( p[ i ].position );

    }

    clothGeometry.computeFaceNormals();
    clothGeometry.computeVertexNormals();

    clothGeometry.normalsNeedUpdate = true;
    clothGeometry.verticesNeedUpdate = true;

    camera.lookAt( scene.position );

    renderer.render( scene, camera );
}