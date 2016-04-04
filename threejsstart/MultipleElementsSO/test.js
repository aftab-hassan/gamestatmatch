var cube;
var scene, camera, renderer;

function change()
{
    console.log("came inside the change function...");
    document.getElementById('foo').innerHTML = 'Your content';

    var container = document.getElementById('foo')
    console.log(container);
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //document.body.appendChild(renderer.domElement);

    var container = document.getElementById('foo')
    console.log(container);
    container.appendChild(renderer.domElement)

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 5;

    console.log("camera position==("+camera.position.x+","+camera.position.y+","+camera.position.z+")")
    render();
}

var render = function () {
    requestAnimationFrame( render );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

//init();
//render();