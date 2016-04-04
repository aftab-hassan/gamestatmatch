/**
 * Created by aftab on 4/3/2016.
 */
var scene, camera, renderer;
var cube,cylinder,sphere,plane,polyhedron,torusknot,torus;
var step = 0;
var geometry, material;

function change()
{
    console.log("came inside the change function...");
    document.getElementById('foo').innerHTML = 'Your content';

    var container = document.getElementById('foo');
    console.log(container);
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var container = document.getElementById('foo');
    console.log(container);
    container.appendChild(renderer.domElement);

    /* cube */
    geometry = new THREE.BoxGeometry(10, 10, 10);
    material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    cube = new THREE.Mesh(geometry, material);
    cube.position.y += 30;
    scene.add(cube);

    /* cylinder */
    cylinder = createMesh(new THREE.CylinderGeometry(10, 10, 10));
    cylinder.position.y += 30;
    scene.add(cylinder);

    /* sphere */
    geometry = new THREE.SphereGeometry(2, 20, 20, 0, Math.PI * 2, 0, Math.PI * 2);
    material = new THREE.MeshNormalMaterial({wireframe:true});
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.y += 30;
    sphere.position.z += 30;
    scene.add(sphere);

    /* plane */
    plane = new THREE.Mesh(new THREE.PlaneGeometry(40,40), new THREE.MeshNormalMaterial());
    plane.position.y += 60;
    scene.add(plane);

    /* polyhedron */
    polyhedron = createMesh(new THREE.IcosahedronGeometry(20, 0));
    polyhedron.position.y += 30;
    scene.add(polyhedron);

    /* torus knot */
    torusknot = createMesh(new THREE.TorusKnotGeometry(15, 1));
    torusknot.position.y += 30;
    scene.add(torusknot);

    /* torus */
    torus = createMesh(new THREE.TorusGeometry(8, 5));
    torus.position.y = 25;
    scene.add(torus);

    /* Want to display all elements using this camera position */
    /* Ideal camera position for individual elements below */
    /* cube's camera position */
    /* test position */
    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = 40;
    //camera.lookAt(cube.position)

    /* cylinder's camera position */
    //camera.position.x = -30;
    //camera.position.y = 40;
    //camera.position.z = 50;
    //camera.lookAt(new THREE.Vector3(10, 0, 0));

    /* sphere's camera position */
    //camera.position.x = 0;
    //camera.position.y = 0;
    //camera.position.z = 10;

    /* plane's camera position */
    //camera.position.y = -400;
    //camera.position.z = 400;
    //camera.rotation.x = .70;

    /* calling all renders */
    console.log("camera position==("+camera.position.x+","+camera.position.y+","+camera.position.z+")");
    rendercube();
    rendercylinder();
    rendersphere();
    renderplane();
    renderpolyhedron();
    rendertorusknot();
    rendertorus();
}

/* cube */
var rendercube = function () {
    requestAnimationFrame( rendercube );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

/* cylinder */
function createMesh(geom) {

    // assign two materials
    var meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;
    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // create a multimaterial
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

    return mesh;
}

function rendercylinder() {
    cylinder.rotation.y = step += 0.01;

    // render using requestAnimationFrame
    requestAnimationFrame(rendercylinder);
    renderer.render(scene, camera);
}

/* sphere */
function rendersphere() {
    requestAnimationFrame(rendersphere);

    sphere.rotation.y += 0.001;

    renderer.render(scene, camera);
}

function renderplane()
{

}

/* polyhedron */
function renderpolyhedron() {
    polyhedron.rotation.y = step += 0.01;

    // render using requestAnimationFrame
    requestAnimationFrame(renderpolyhedron);
    renderer.render(scene, camera);
}

/* rendertorusknot */
function rendertorusknot() {
    torusknot.rotation.y = step += 0.0001;

    // render using requestAnimationFrame
    requestAnimationFrame(rendertorusknot);
    renderer.render(scene, camera);
}

/* torus */
function rendertorus() {
    torus.rotation.y = step += 0.01;

    // render using requestAnimationFrame
    requestAnimationFrame(rendertorus);
    renderer.render(scene, camera);
}