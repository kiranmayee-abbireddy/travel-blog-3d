import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 60);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls for camera manipulation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Load the skybox
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    'assets/skybox/px.jpg',  // Positive X
    'assets/skybox/nx.jpg',  // Negative X
    'assets/skybox/py.jpg',  // Positive Y
    'assets/skybox/ny.jpg',  // Negative Y
    'assets/skybox/pz.jpg',  // Positive Z
    'assets/skybox/nz.jpg'   // Negative Z
]);
scene.background = texture;

// Load the car model
const gltfLoader = new GLTFLoader();
gltfLoader.load(
    'assets/models/car.glb',
    (gltf) => {
        const car = gltf.scene;
        car.position.set(0, 0.5, 0);
        car.scale.set(0.3, 0.3, 0.3);
        scene.add(car);
        
        // Animate the car
        function animateCar() {
            car.position.z += 0.1; // Move the car forward
            if (car.position.z > 50) { // Reset position if it goes too far
                car.position.z = 0; // Reset back to start
            }
        }

        // Animation loop
        const animate = function () {
            requestAnimationFrame(animate);
            animateCar();
            controls.update();
            renderer.render(scene, camera);
        };
        animate(); // Start the animation loop
    },
    undefined,
    (error) => {
        console.error(error);
    }
);

// Create a road
const roadGeometry = new THREE.PlaneGeometry(10, 100);
const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI / 2;
road.position.y = 0;
scene.add(road);

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
