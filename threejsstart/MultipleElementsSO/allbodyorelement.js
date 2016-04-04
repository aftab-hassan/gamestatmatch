/**
 * Created by aftab on 4/3/2016.
 */
var cube;
var scene, camera, renderer;
var step = 0;

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
    document.body.appendChild(renderer.domElement);

    var container = document.getElementById('foo')
    console.log(container);
    //container.appendChild(renderer.domElement)

    /* cube */
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    /* cylinder */
    var cylinder = createMesh(new THREE.CylinderGeometry(20, 20, 20));
    scene.add(cylinder);

    /* Need one camera position to display all elements */
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 5;

    /* calling all renders */
    console.log("camera position==("+camera.position.x+","+camera.position.y+","+camera.position.z+")")
    rendercube();
    rendercylinder();
}

var rendercube = function () {
    requestAnimationFrame( render );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

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
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
}