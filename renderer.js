// renderer.js - simple Three.js scene for MyCity Simulator
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:false});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0x999999);
scene.add(ambient);
const dir = new THREE.DirectionalLight(0xffffff, 0.8);
dir.position.set(1,1,0.5);
scene.add(dir);

// ground
const groundGeo = new THREE.PlaneGeometry(200,200,1,1);
const groundMat = new THREE.MeshLambertMaterial({color:0x2e8b57});
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI/2;
scene.add(ground);

// simple grid of low-poly buildings
for(let i=-10;i<=10;i+=2){
  for(let j=-10;j<=10;j+=2){
    if(Math.random() < 0.12){
      const h = 2 + Math.random()*12;
      const bGeo = new THREE.BoxGeometry(1.5, h, 1.5);
      const bMat = new THREE.MeshLambertMaterial({color: 0x808080 * (1 - Math.random()*0.5)});
      const b = new THREE.Mesh(bGeo, bMat);
      b.position.set(i*3, h/2, j*3);
      scene.add(b);
    }
  }
}

camera.position.set(0, 40, 60);
camera.lookAt(0,0,0);

// very simple orbit-like controls (no external deps)
let dragging = false;
let lastX=0, lastY=0;
let yaw = 0, pitch = -30;
document.addEventListener('mousedown', (e)=>{ dragging=true; lastX=e.clientX; lastY=e.clientY; });
document.addEventListener('mouseup', ()=>{ dragging=false; });
document.addEventListener('mousemove', (e)=>{
  if(!dragging) return;
  const dx = e.clientX - lastX, dy = e.clientY - lastY;
  lastX = e.clientX; lastY = e.clientY;
  yaw += dx*0.1; pitch += dy*0.1;
  pitch = Math.max(-89, Math.min(60, pitch));
});
window.addEventListener('wheel', (e)=>{
  camera.position.addScaledVector(camera.getWorldDirection(new THREE.Vector3()), e.deltaY*0.05);
});

function updateCamera(){
  const r = Math.max(10, camera.position.distanceTo(new THREE.Vector3(0,0,0)));
  const phi = THREE.Math.degToRad(90 - pitch);
  const theta = THREE.Math.degToRad(yaw);
  const x = r * Math.sin(phi) * Math.cos(theta);
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  camera.position.set(x, y, z);
  camera.lookAt(0,0,0);
}

function animate(){
  requestAnimationFrame(animate);
  updateCamera();
  renderer.render(scene, camera);
}
animate();

// Resize handling
window.addEventListener('resize', ()=>{ renderer.setSize(window.innerWidth, window.innerHeight); camera.aspect = window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); });
