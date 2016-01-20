/**
 * Created by aftab on 1/17/2016.
 */
var camera, scene, renderer, sphere;
var angularSpeed = 0.2;
var lastTime = 0;
var count = 0;
var animationTracker;
var startx, starty, startz=-100;
var incx, incy1=0.01,incy2=0.8, incz1, incz2;
var shot = 1;

init();

function animate()
{
    console.log(sphere.position.z)

    /* ball coming towards you */
    if(shot%2 == 1)
    {
        console.log("ball coming towards you...")

        /* ending condition */
        if(sphere.position.z >= 25)
        {
            shot++;
        }

        /* before bounce - dip */
        else if(sphere.position.z < 0)
        {
            sphere.position.y -= 0.01;
        }
        /* after bounce - rise */
        else
        {
            sphere.position.y += 0.5;
        }

        sphere.position.z += 2;
    }

    /* you hit the ball */
    else
    {
        console.log("you hit the ball...")

        /* ending condition */
        if(sphere.position.z <= -100)
        {
            shot++;
            cancelAnimationFrame(animationTracker)
            return;
        }

        /* before bounce - dip */
        if(sphere.position.z > 0)
        {
            sphere.position.y -= 0.5;
        }
        /* after bounce - rise */
        else
        {
            sphere.position.y += 0.01;
        }

        sphere.position.z -= 2;
    }

    /* repeat */
    renderer.render(scene,camera);
    animationTracker = requestAnimationFrame(animate)
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

    for ( var i = - size; i <= size; i += step)
    {
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
    sphere.position.x = 20;
    sphere.position.y = 0.5;
    sphere.position.z = -100;

    scene.add(sphere);
    var light = new THREE.DirectionalLight('white', 1);
    light.position.set(0,-400,400).normalize();
    scene.add(light);

    animate();
}