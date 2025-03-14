import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-webgl'), alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(5, 64, 64);
const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
const blackHole = new THREE.Mesh(geometry, material);
scene.add(blackHole);

camera.position.z = 20;

function animate() {
    requestAnimationFrame(animate);
    blackHole.rotation.y += 0.005;
    renderer.render(scene, camera);
}

animate();
