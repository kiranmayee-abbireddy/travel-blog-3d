import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 
import './style.css'; 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 60); // Position the camera above and further back
camera.lookAt(0, 0, 0); // Look at the center of the scene

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Load the car model
const loader = new GLTFLoader();
loader.load(
    'assets/models/car.glb',
    (gltf) => {
        const car = gltf.scene;
        car.position.set(0, 0.5, 0); // Position the car above the ground
        car.scale.set(0.3, 0.3, 0.3); // Adjust scale as needed
        scene.add(car);
    },
    undefined,
    (error) => {
        console.error(error);
    }
);

// Create ground/road plane
const roadGeometry = new THREE.PlaneGeometry(10, 100);
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
road.position.y = 0; // Set ground at y = 0
scene.add(road);

// Rendering loop
const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
animate();
