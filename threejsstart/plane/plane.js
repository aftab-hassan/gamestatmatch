/**
 * Created by aftab on 1/17/2016.
 */
var camera, scene, renderer, sphere;
var angularSpeed = 0.2;
var lastTime = 0;
var count = -100;

init();

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

    render();
}


function render() {

    renderer.render( scene, camera );

}
