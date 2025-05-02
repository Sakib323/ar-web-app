import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';

const mindarThree = new window.MINDAR.IMAGE.MindARThree({
container: document.querySelector("#ar-container"),
imageTargetSrc: "./assets/marker.mind",
});
const { renderer, scene, camera } = mindarThree;

const anchor = mindarThree.addAnchor(0);

// Load GLTF model
const loader = new GLTFLoader();
let model;

loader.load('./assets/model.glb', (gltf) => {
model = gltf.scene;
model.scale.set(0.2, 0.2, 0.2);
anchor.group.add(model);
});

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
if (model) {
model.rotation.y += clock.getDelta();
}
renderer.render(scene, camera);
});

await mindarThree.start()