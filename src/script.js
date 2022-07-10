import './styles.css';
import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import {Lensflare, LensflareElement} from 'three/examples/jsm/objects/Lensflare';
import Size from './config/sizes';

function main() {
  // create Size
  const sizes = new Size().setWidth(window.innerWidth)
                          .setHeight(window.innerHeight)
                          .save();

  // canvas
  const canvas = document.querySelector('canvas.webgl');
  // scene
  const scene = new THREE.Scene();
  // Camera
  const camera = new THREE.PerspectiveCamera(75, sizes.aspectRatio);
  camera.position.z = 4;
  scene.add(camera);

  // Texture
  const textureLoader = new THREE.TextureLoader();

  const sunTexture = textureLoader.load('/images/textures/solar-system/sun.jpg');

  // Object
  const geometry = new THREE.SphereGeometry(0.5, 36, 16);
  
  // Light
  const directionLight1 = new THREE.DirectionalLight(0xFFCCAA, 1.1);
  directionLight1.position.set(0, 0, 1);
  scene.add(directionLight1);

  const material = new THREE.MeshPhongMaterial();
  // material.emissive = new THREE.Color('#ee2554');
  material.map = sunTexture;
  material.normalMap;
  
  const sun = new THREE.Mesh(geometry, material);
  scene.add(sun);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true 
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);

  render({ renderer, scene, camera, sun });

  window.addEventListener(
    'resize',
    handleResize({ renderer, camera, sizes })
  );
}

main();

function handleResize(config) {
  const { renderer, camera, sizes, sun } = config; 

  return function(event) {
    sizes.setWidth(window.innerWidth)
         .setHeight(window.innerHeight)
         .save();
    
    camera.aspect = sizes.aspectRatio;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
}

function render(config) {
  const {renderer, scene, camera, sun} = config;
  const clock = new THREE.Clock();

  return function cb (timestamp) {
    const elapsedTime = clock.getElapsedTime();

    sun.rotation.y = elapsedTime * 0.15;

    renderer.render(scene, camera);
    window.requestAnimationFrame(cb);
  }();
}