/**
 * Created by aftab on 1/17/2016.
 */

/*Steps
 * 1. renderer
 * 2. add to body
 * 3. camera and it's position/rotation
 * 4. scene
 * 5. plane
 * 6. render.render(scene,camera)*/
var renderer = new THREE.WebGLRenderer();

//full screen on web page
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0xffffff, 0);

//append renderer to body of the page
document.body.appendChild(renderer.domElement);

//make a camera object
//45 - fov
//1  - close to the camera
//1000-away from the camera
//just use 1-1000
var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000)

/*everything starts at the center of the scene
 * z is up and down
 * y is near and far
 * x is left and right
 *
 * So, here we are raising the camera 400
 * pulling it back from the center -450
 * 0.75 is about 45 degrees pi/180 * 45*/

camera.position.y = -450;
camera.position.z = 400;
//camera.position.x = 200;
camera.rotation.x = 0.7;

//creating the scene
var scene = new THREE.Scene();

//creating a plane(mesh)
var cube = new THREE.Mesh(new THREE.CubeGeometry(200,100,200),new THREE.MeshNormalMaterial());
cube.rotation.z = 0.75;

//plane -> scene,camera -> renderer
scene.add(cube);
renderer.render(scene,camera);