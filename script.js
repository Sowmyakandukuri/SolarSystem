const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight * 0.9);
document.getElementById('canvas-container').appendChild(renderer.domElement);
const light = new THREE.PointLight(0xffffff, 2);
scene.add(light);

const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
const planets = [
  { name: 'Mercury', color: 0xaaaaaa, size: 0.3, distance: 4, speed: 0.04 },
  { name: 'Venus', color: 0xffcc99, size: 0.5, distance: 6, speed: 0.03 },
  { name: 'Earth', color: 0x3399ff, size: 0.5, distance: 8, speed: 0.025 },
  { name: 'Mars', color: 0xff3300, size: 0.4, distance: 10, speed: 0.02 },
  { name: 'Jupiter', color: 0xff9966, size: 1.2, distance: 13, speed: 0.015 },
  { name: 'Saturn', color: 0xffff99, size: 1.0, distance: 16, speed: 0.012 },
  { name: 'Uranus', color: 0x66ffff, size: 0.9, distance: 19, speed: 0.01 },
  { name: 'Neptune', color: 0x6666ff, size: 0.9, distance: 22, speed: 0.008 }
];

const planetMeshes = [];
const controlPanel = document.getElementById('control-panel');
planets.forEach(planet => {
  const geometry = new THREE.SphereGeometry(planet.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: planet.color });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  planet.mesh = mesh;
  planet.angle = Math.random() * Math.PI * 2;
  planetMeshes.push(planet);

  // Speed Slider
  const label = document.createElement('label');
  label.innerText = planet.name + " ";
  const input = document.createElement('input');
  input.type = 'range';
  input.min = 0;
  input.max = 0.1;
  input.step = 0.001;
  input.value = planet.speed;
  input.oninput = (e) => {
    planet.speed = parseFloat(e.target.value);
  };
  label.appendChild(input);
  controlPanel.appendChild(label);
  controlPanel.appendChild(document.createElement('br'));
});
camera.position.z = 30;
let paused = false;

document.getElementById('pause').onclick = () => paused = true;
document.getElementById('resume').onclick = () => paused = false;
function animate() {
  requestAnimationFrame(animate);
  
  if (!paused) {
    planetMeshes.forEach(planet => {
      planet.angle += planet.speed;
      planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
      planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
    });
  }

  renderer.render(scene, camera);
}

animate();
