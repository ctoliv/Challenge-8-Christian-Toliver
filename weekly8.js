import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ----------------------------------------------------
// Scene
// ----------------------------------------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// ----------------------------------------------------
// Camera
// ----------------------------------------------------
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(20, 15, 20);

// ----------------------------------------------------
// Renderer
// ----------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// ----------------------------------------------------
// Orbit Controls
// Allows Zoom, Pan, Orbit (Tilt/Rotate)
// ----------------------------------------------------
const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

// ----------------------------------------------------
// Ground Plane
// ----------------------------------------------------
const groundGeometry = new THREE.PlaneGeometry(100, 100);

const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x66aa66
});

const ground = new THREE.Mesh(
    groundGeometry,
    groundMaterial
);

ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;

scene.add(ground);

// ----------------------------------------------------
// Medieval Courtyard Objects
// ----------------------------------------------------

const basicStoneMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x777777
    });

const basicWoodMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x8b5a2b
    });

const basicBannerMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x8b0000
    });


// Castle Wall
const wall =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            24,
            8,
            2
        ),
        basicStoneMaterial
    );

wall.position.set(
    0,
    4,
    -12
);

wall.castShadow = true;
wall.receiveShadow = true;

scene.add(wall);


// Wooden Gate
const gate =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            6,
            6,
            0.8
        ),
        basicWoodMaterial
    );

gate.position.set(
    0,
    3,
    -10.9
);

gate.castShadow = true;

scene.add(gate);


// Left Crate
const crate1 =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            3,
            3,
            3
        ),
        basicWoodMaterial
    );

crate1.position.set(
    -8,
    1.5,
    2
);

crate1.castShadow = true;

scene.add(crate1);


// Right Crate
const crate2 =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            3,
            3,
            3
        ),
        basicWoodMaterial
    );

crate2.position.set(
    8,
    1.5,
    2
);

crate2.rotation.y =
    Math.PI / 6;

crate2.castShadow = true;

scene.add(crate2);


// Barrel
const barrel =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            1.5,
            1.5,
            3,
            24
        ),
        basicWoodMaterial
    );

barrel.position.set(
    -5,
    1.5,
    5
);

barrel.castShadow = true;

scene.add(barrel);


// Banner
const banner =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            3,
            5
        ),
        basicBannerMaterial
    );

banner.position.set(
    7,
    5,
    -10.9
);

scene.add(banner);
// ----------------------------------------------------
// Ambient Light
// ----------------------------------------------------
const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1
);

scene.add(ambientLight);

// ----------------------------------------------------
// Directional Light
// ----------------------------------------------------
const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    2
);

directionalLight.position.set(20, 30, 10);
directionalLight.castShadow = true;

scene.add(directionalLight);

// ----------------------------------------------------
// Toggle Lights
// ----------------------------------------------------
let lightsOn = true;

document
    .getElementById("toggleButton")
    .addEventListener("click", () => {

        lightsOn = !lightsOn;

        ambientLight.visible = lightsOn;
        directionalLight.visible = lightsOn;
    });

// ----------------------------------------------------
// Window Resize
// ----------------------------------------------------
window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});

// ----------------------------------------------------
// Animation Loop
// ----------------------------------------------------
function animate() {

    requestAnimationFrame(animate);



    controls.update();

    renderer.render(scene, camera);
}

animate();