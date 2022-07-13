import './styles.css';
import * as THREE from 'three';
import Size from './config/sizes';
import PerspectiveCamera from './cameras/perspective';
import DirectionalLight from './lights/direction';
import Sun from './plants/sun';
import Eearth from './plants/earth';

function main() {
  const objects = [];
  const canvas = document.querySelector('canvas.webgl');
  const scene = new THREE.Scene();
  const sizes = new Size().setWidth(window.innerWidth)
                          .setHeight(window.innerHeight)
                          .save();
  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);

  const perspective = new PerspectiveCamera()
                .setFieldView(75)
                .setAspect(sizes.aspectRatio)
                .setZPosition(7)
                .save();
  scene.add(perspective.camera);

  const sun = new Sun(scene).create().save();
  sun.setScale(1).save();
  solarSystem.add(sun.mesh);
  objects.push(sun.mesh);


  /* 지구 생성 */
  const earth = new Eearth(sun.mesh).create().save();
  solarSystem.add(earth.mesh);
  objects.push(earth.mesh);
  
  // Renderer
  const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true 
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, perspective.camera);

  render({ renderer, scene, camera: perspective.camera, objects });

  window.addEventListener(
    'resize',
    handleResize({ renderer, camera: perspective.camera, sizes })
  );
}

main();

function handleResize(config) {
  const { renderer, camera, sizes } = config; 

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
  const {renderer, scene, camera, objects} = config;
  const clock = new THREE.Clock();

  return function cb (timestamp) {
    const elapsedTime = clock.getElapsedTime();
    const OBJECT = {
      SOLAR_SYSYEM: 0,
      SUN: 1,
      EARTH: 2
    };

    objects.forEach((object, index) => {
      switch(index) {
        case OBJECT.SOLAR_SYSYEM:
          object.rotation.y = elapsedTime * 0.1;
          break;
        case OBJECT.SUN:
          object.rotation.y = elapsedTime * 2;
          break;
        case OBJECT.EARTH:
          object.rotation.y = elapsedTime * 1;
          break;
      };
    });

    renderer.render(scene, camera);
    window.requestAnimationFrame(cb);
  }();
}