/**
 * Created by aftab on 1/17/2016.
 */
var camera, scene, renderer, sphere, backgroundScene, backgroundCamera;
var angularSpeed = 0.2;
var lastTime = 0;
var count = -100;

init();

function animate()
{
    var time = (new Date()).getTime();
    var timeDiff = time - lastTime;
    var angularChange = angularSpeed * timeDiff * 2 * Math.PI / 1000;

    lastTime = time;

    //before bounce (assume bounce is at the center of the page)
    if(sphere.position.z < 0)
    {
        sphere.position.y -= 0.01;
        console.log("entered inside the sphere.position.z < 0 condition...")
        console.log("sphere.position.y=="+sphere.position.y)
    }

    //before bounce (assume bounce is at the center of the page)
    else if(sphere.position.z > 0)
    {
        sphere.position.y += 0.8;
        console.log("entered inside the sphere.position.z > 0 condition...")
        console.log("sphere.position.y=="+sphere.position.y)
    }

    sphere.position.z = count;
    console.log(sphere.position.x.toString() + "," + sphere.position.y.toString() + "," + sphere.position.z.toString());

    renderer.render(scene, camera);
    renderer.render(backgroundScene, backgroundCamera);

    count += 2;
    console.log("")
    requestAnimationFrame(animate);
}

function init(){

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0,20,60);
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement);

    var size = 30, step = 3;

    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({color: 'green'});

    for ( var i = - size; i <= size; i += step){
        geometry.vertices.push(new THREE.Vector3( - size, - 0.04, i ));
        geometry.vertices.push(new THREE.Vector3( size, - 0.04, i ));

        geometry.vertices.push(new THREE.Vector3( i, - 0.04, - size ));
        geometry.vertices.push(new THREE.Vector3( i, - 0.04, size ));

    }

    var line = new THREE.Line( geometry, material, THREE.LinePieces);
    scene.add(line);

    //sphere
    sphere = new THREE.Mesh(new THREE.SphereGeometry(1,31,31), new THREE.MeshLambertMaterial({
        color: 'yellow',
    }));
    sphere.position.x = 10;
    sphere.position.y = 1;
    sphere.position.z = -100;

    scene.add(sphere);
    var light = new THREE.DirectionalLight('white', 1);
    light.position.set(0,-400,400).normalize();
    scene.add(light);

    // Load the background texture
    var texture = THREE.ImageUtils.loadTexture( 'court.jpg' );
    var backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 0),
        new THREE.MeshBasicMaterial({
            map: texture
        }));

    backgroundMesh .material.depthTest = false;
    backgroundMesh .material.depthWrite = false;

    // Create your background scene
    backgroundScene = new THREE.Scene();
    backgroundCamera = new THREE.Camera();
    backgroundScene .add(backgroundCamera );
    backgroundScene .add(backgroundMesh );

    //render();
    animate();
}


function render() {

    renderer.render( scene, camera );

}
