import './styles.css';
import * as THREE from 'three';
import Size from './config/sizes';
import PerspectiveCamera from './cameras/perspective';
import DirectionalLight from './lights/direction';
import Sun from './plants/sun';
import Eearth from './plants/earth';

function main() {
  const canvas = document.querySelector('canvas.webgl');
  const scene = new THREE.Scene();
  const sizes = new Size().setWidth(window.innerWidth)
                          .setHeight(window.innerHeight)
                          .save();

  const perspective = new PerspectiveCamera()
                .setFieldView(75)
                .setAspect(sizes.aspectRatio)
                .setZPosition(7)
                .save();
  scene.add(perspective.camera);

  const sun = new Sun(scene).create().save();
  sun.setScale(1).save();


  /* 지구 생성 */
  const earth = new Eearth(scene).create().save();

  
  // Renderer
  const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true 
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, perspective.camera);

  render({ renderer, scene, camera: perspective.camera, sun: sun.mesh, earth: earth.mesh });

  window.addEventListener(
    'resize',
    handleResize({ renderer, camera: perspective.camera, sizes })
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
  const {renderer, scene, camera, sun, earth} = config;
  const clock = new THREE.Clock();

  return function cb (timestamp) {
    const elapsedTime = clock.getElapsedTime();

    sun.rotation.y = elapsedTime * 0.8;
    earth.rotation.y = elapsedTime * 0.25;

    renderer.render(scene, camera);
    window.requestAnimationFrame(cb);
  }();
}