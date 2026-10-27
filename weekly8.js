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
// Texture Loader
// ----------------------------------------------------

const loader =
    new THREE.TextureLoader();

const groundColor =
    loader.load(
        "textures/textures/ground/color.jpg"
    );

const wallColor =
    loader.load(
        "textures/textures/wall/color.jpg"
    );

const woodColor =
    loader.load(
        "textures/textures/wood/color.jpg"
    );

const bannerColor =
    loader.load(
        "textures/textures/banner/color.png"
    );

// ----------------------------------------------------
// Ground Plane
// ----------------------------------------------------
const groundGeometry = new THREE.PlaneGeometry(100, 100);

const groundMaterial =
    new THREE.MeshStandardMaterial({
        map: groundColor
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
        map: wallColor
    });

const basicWoodMaterial =
    new THREE.MeshStandardMaterial({
        map: woodColor
    });

const basicBannerMaterial =
    new THREE.MeshStandardMaterial({
        map: bannerColor
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

// Castle towers and battlements
for (const towerX of [-12, 12]) {
    const tower = new THREE.Mesh(
        new THREE.BoxGeometry(8, 12, 7),
        basicStoneMaterial
    );

    tower.position.set(towerX, 6, -12);
    tower.castShadow = true;
    tower.receiveShadow = true;
    scene.add(tower);

    const towerTop = new THREE.Mesh(
        new THREE.BoxGeometry(8.8, 1.5, 7.8),
        basicStoneMaterial
    );

    towerTop.position.set(towerX, 12.75, -12);
    towerTop.castShadow = true;
    towerTop.receiveShadow = true;
    scene.add(towerTop);

    for (const offset of [-3, -1, 1, 3]) {
        for (const side of [-1, 1]) {
            const frontMerlon = new THREE.Mesh(
                new THREE.BoxGeometry(1.5, 1.5, 1.5),
                basicStoneMaterial
            );
            frontMerlon.position.set(towerX + offset, 14.25, -12 + side * 3.2);
            frontMerlon.castShadow = true;
            scene.add(frontMerlon);

            const sideMerlon = new THREE.Mesh(
                new THREE.BoxGeometry(1.5, 1.5, 1.5),
                basicStoneMaterial
            );
            sideMerlon.position.set(towerX + side * 3.7, 14.25, -12 + offset);
            sideMerlon.castShadow = true;
            scene.add(sideMerlon);
        }
    }
}

for (const merlonX of [-10, -6, -2, 2, 6, 10]) {
    const merlon = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        basicStoneMaterial
    );

    merlon.position.set(merlonX, 9, -12);
    merlon.castShadow = true;
    scene.add(merlon);
}

// Stone surround for the wooden gate
for (const frameX of [-3.6, 3.6]) {
    const gatePillar = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 7.5, 2.2),
        basicStoneMaterial
    );

    gatePillar.position.set(frameX, 3.75, -11.4);
    gatePillar.castShadow = true;
    gatePillar.receiveShadow = true;
    scene.add(gatePillar);
}

const gateLintel = new THREE.Mesh(
    new THREE.BoxGeometry(8.4, 1.2, 2.2),
    basicStoneMaterial
);

gateLintel.position.set(0, 7.4, -11.4);
gateLintel.castShadow = true;
gateLintel.receiveShadow = true;
scene.add(gateLintel);


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