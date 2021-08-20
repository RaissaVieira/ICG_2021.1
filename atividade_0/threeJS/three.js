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
        new THREE.MeshBasicMaterial({ color: 0x7fb069 }),
        new THREE.MeshBasicMaterial({ color: 0xb540bf }),
        new THREE.MeshBasicMaterial(),
    ];
    
    const cube = [
        new THREE.Mesh(geometry, material[0]),
        new THREE.Mesh(geometry, material[1]),
        new THREE.Mesh(geometry, material[2])
    ];

    for(var i=0; i<3; i++) scene.add(cube[i]);

    cube[0].position.set(2,1,0);
    cube[0].rotation.set(1,0.5,0);

    cube[1].position.set(-2,-1,0);
    cube[1].rotation.set(1,0.5,0);

    cube[2].position.set(0,0,0);
    cube[2].rotation.set(1,0.5,0);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame( animate );

        console.log(scene)

        renderer.render( scene, camera );
    }

    animate();
}
