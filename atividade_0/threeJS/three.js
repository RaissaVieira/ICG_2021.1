// Configuracao da cena

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Questao 4.1

function StaticCube() {

    const scene = new THREE.Scene();
    renderer.render( scene, camera );

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: "#40E0D0" });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.rotation.set(1,0.5,0);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }

    animate();
}

// Questao 4.2

function RotationCube() {

    const scene = new THREE.Scene();
    renderer.render( scene, camera );

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: "#A020F0" });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.rotation.set(1,0.5,0);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render( scene, camera );
    }

    animate();
}

// Questao 4.3

function ThreeCubes() {

    const scene = new THREE.Scene();
    renderer.render( scene, camera );
    
    const geometry = new THREE.BoxGeometry();
    const material = [
        new THREE.MeshBasicMaterial( { color: 0x654684 } ),
        new THREE.MeshLambertMaterial( { color: 0x568726 } ),
        new THREE.MeshPhysicalMaterial ( {color: 0xEAEBEA } ),
    ];
    
    const cubes = [
        new THREE.Mesh( geometry, material[0] ),
        new THREE.Mesh( geometry, material[1] ),
        new THREE.Mesh( geometry, material[2] ),
    ];

    scene.add( cubes[0] );
    scene.add( cubes[1] );
    scene.add( cubes[2] );

    camera.position.set(2, 2, 5);
    camera.rotation.set(-0.2, 0.2, 0);

    cubes[0].position.x = -2.5;
    cubes[1].position.x = 0;
    cubes[2].position.x = 2;

    cubes[0].position.y = 0.5;
    cubes[1].position.y = -0.3;
    cubes[2].position.y = 0.5;

    const ambient_light = new THREE.AmbientLight(0x404040, 0.3);
    const directional_light = new THREE.DirectionalLight(0xffffff, 1);

    directional_light.position.set(0, 2, 2);
    directional_light.castShadow = true;

    scene.add(ambient_light);
    scene.add(directional_light);

    function animate() {
        requestAnimationFrame( animate );
        
        renderer.render( scene, camera );
    }

    animate();
}

function RotationThreeCubes() {

    const scene = new THREE.Scene();
    renderer.render( scene, camera );
    
    const geometry = new THREE.BoxGeometry();
    const material = [
        new THREE.MeshBasicMaterial( { color: 0x654684 } ),
        new THREE.MeshLambertMaterial( { color: 0x568726 } ),
        new THREE.MeshPhysicalMaterial ( {color: 0xEAEBEA } ),
    ];
    
    const cubes = [
        new THREE.Mesh( geometry, material[0] ),
        new THREE.Mesh( geometry, material[1] ),
        new THREE.Mesh( geometry, material[2] ),
    ];

    scene.add( cubes[0] );
    scene.add( cubes[1] );
    scene.add( cubes[2] );

    camera.position.set(2, 2, 5);
    camera.rotation.set(-0.2, 0.2, 0);

    cubes[0].position.x = -2.5;
    cubes[1].position.x = 0;
    cubes[2].position.x = 2;

    cubes[0].position.y = 0.5;
    cubes[1].position.y = -0.3;
    cubes[2].position.y = 0.5;

    const ambient_light = new THREE.AmbientLight(0x404040, 0.3);
    const directional_light = new THREE.DirectionalLight(0xffffff, 1);

    directional_light.position.set(0, 2, 2);
    directional_light.castShadow = true;

    scene.add(ambient_light);
    scene.add(directional_light);

    function animate() {

        requestAnimationFrame( animate );

        for (let i = 0; i < cubes.length; i++) {
        cubes[i].rotation.x += 0.01;
        cubes[i].rotation.y += 0.01;
        }

        renderer.render( scene, camera );
    }

    animate();
}


