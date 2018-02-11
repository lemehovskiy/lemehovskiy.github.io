import Matter from 'matter-js';

const THREE = require('./vendor/three');



const { Engine, World, Bodies, Body, Events } = Matter;

let engine = Engine.create();

engine.world.gravity.y = 0.1;

    Engine.run(engine);

Events.on(engine, 'beforeUpdate', () => {
    let angle = Math.sin(Math.cos(Date.now() * 0.001) * Math.PI) * 0.05;
    // Body.rotate(ground.matter, angle);
});
Events.on(engine, 'afterUpdate', () => {
    engine.world.bodies.forEach(n => {
        if('three' in n === false) {
            return;
        }
        n.three.position.set(n.position.x, -n.position.y, 0);
        n.three.rotation.z = -n.angle;

        if(n.position.y > 3000 || Math.abs(n.position.x) > 5000) {
            scene.remove(n.three);
            Matter.Composite.remove(engine.world, n);
        }
    });
});

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
// let envMapURLs = [ 'x', 'y', 'z' ].reduce((p, d) => p.concat([ 'p', 'n' ].map(n => `${n}${d}.jpg`)), []);
// let reflectionCube = new THREE.CubeTextureLoader()
// 		.setCrossOrigin('')
// 		.setPath('https://alca.tv/static/codepen/pens/common/SwedishRoyalCastle/')
// 		.load(envMapURLs);
// reflectionCube.format = THREE.RGBFormat;
camera.position.z = 100;

let renderer = new THREE.WebGLRenderer({ antialias: true });
let middle = new THREE.Vector3();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaInput = true;
renderer.gammaOutput = true;

// scene.background = reflectionCube;

let lights = [
    { color: 0xFFFFFF, intensity: 1, distance: 4000, decay: 2, x: 100, y: 200, z: 50 },
    { color: 0xDDFFFF, intensity: 1, distance: 4000, decay: 2, x: 100, y: -200, z: 100 },
    { color: 0xAA99CC, intensity: 0.25, distance: 2000, decay: 2, x: -50, y: 0, z: -100 },
].map(n => {
    let light = new THREE.PointLight(n.color, n.intensity, n.distance, n.decay);
    light.position.set(n.x, n.y, n.z);
    light.castShadow = true;
    scene.add(light);
    return light;
});

// let spriteMap, spriteMaterial, sprite;

// setTimeout(() => {
// 	spriteMap = lights[2].shadow.map.texture;
// 	spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xFFFFFF });
// 	sprite = new THREE.Sprite(spriteMaterial);
// 	sprite.scale.x = 100;
// 	sprite.scale.y = 100;
// 	sprite.position.y = 40;
// 	scene.add(sprite);
// }, 100);

let cubes = [];

let ground = addCube({ width: 50, pos: { y: 20 } });
// ground.three.material.envMap = cubeCamera.renderTarget.texture;
// ground.matter.isStatic = true;
Body.setStatic(ground.matter, true);
Body.setPosition(ground.matter, { x: 0, y: 20, z: 0 });
Body.setAngle(ground.matter, 0);

let cubeLoop;
function addCubeLoop() {
    let { matter, three } = addCube();
    Body.setPosition(matter, { x: 0, y: Math.random() * -40 - 60, z: 0 });
    Body.setAngle(matter, Math.random() * Math.PI * 2);
}
function startAddCubeLoop() {
    cubeLoop = setInterval(addCubeLoop, 400);
}
document.addEventListener('visibilitychange', () =>
    document.hidden ? clearInterval(cubeLoop) : startAddCubeLoop(), false);
startAddCubeLoop();

function addCube(opts = {}) {
    let {
        width = 10,
        height = 2,
        pos: { x = 0, y = 0, z = 0 } = {}
    } = opts;

    let matter = Bodies.rectangle(0, 0, width, height);

    let geometry = new THREE.BoxGeometry(width, height, (width + height) / 2);
    let material = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.4,
        metalness: 0.6,
        // envMap: reflectionCube
    });
    let three = new THREE.Mesh(geometry, material);
    let cube = { matter, three };
    matter.three = three;

    three.castShadow = true;
    three.receiveShadow = true;

    World.add(engine.world, [ matter ]);
    scene.add(three);

    cubes.push(cube);

    return cube;
}

function draw() {
    requestAnimationFrame(draw);

    // let time = Date.now() * 0.00125;
    // let cameraPos = [
    //     Math.cos(time) * 100,
    //     Math.cos(time * 0.25) * 10,
    //     Math.sin(time) * 100
    // ];
    // camera.position.set(...cameraPos);
    // sprite && sprite.position.set(...cameraPos.map(n => n * 0.2));
    camera.lookAt(middle);

    // time += Math.PI * 0.5;
    // rectLight.position.set(
    // 		Math.cos(time) * 100,
    // 		Math.cos(time * 0.25) * 10,
    // 		Math.sin(time) * 100
    // 	);
    // rectLight.lookAt(middle);
    // rectLightHelper.update();

    // ground.three.visible = false;
    // cubeCamera.updateCubeMap(renderer, scene);
    // ground.three.visible = true;
    // ground.three.material.envMap = cubeCamera.renderTarget.texture;

    renderer.render(scene, camera);
}

draw();

window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
}, false);