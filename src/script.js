import './styles.css';
import * as THREE from 'three';
import Size from './config/sizes';
import PerspectiveCamera from './cameras/perspective';
import Sun from './plants/sun';
import Earth from './plants/earth';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Orbit from './orbits/orbit';
import Moon from './plants/moon';

function main() {
  const objects = [];
  const canvas = document.querySelector('canvas.webgl');
  const scene = new THREE.Scene();
  const sizes = new Size().setWidth(window.innerWidth)
                          .setHeight(window.innerHeight)
                          .save();
  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem); // index 0

  const perspective = new PerspectiveCamera(scene)
                .setFieldView(75)
                .setAspect(sizes.aspectRatio)
                .setZPosition(17)
                .lookAt(0, 0, 0)
                .save();

  const sun = new Sun(solarSystem, perspective.camera).create().setScale(2).save();
  objects.push(sun.mesh); // index 1


  /* 지구 궤도 생성 */
  const earthOrbit = new Orbit()
                      .setScene(solarSystem)
                      .addedByScene()
                      .setOrbitDistance(10)
                      .save();
  objects.push(earthOrbit.object);
    

  /* 지구 셍성 */
  const earth = new Earth(sun.mesh, perspective.camera).create().save();
  earthOrbit.insertPlant(earth.mesh).save();
  objects.push(earth.mesh); // index 3


  /* 달 궤도 생성 */
  const moonOrbit = new Orbit()
                    .setOrbitDistance(2)
                    .setScene(earthOrbit.object)
                    .addedByScene()
                    .save();

  /* 달 생성 */
  const moon = new Moon().create().save();
  moonOrbit.insertPlant(moon.mesh);
  objects.push(moon.mesh); // index 4
  
  // Renderer
  const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true 
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, perspective.camera);

  // Controls
  const controls = new OrbitControls(perspective.camera, canvas);

  render({ renderer, scene, camera: perspective.camera, objects, controls });

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
  const {renderer, scene, camera, objects, controls} = config;
  const clock = new THREE.Clock();

  return function cb () {
    const elapsedTime = clock.getElapsedTime();
    const OBJECT = {
      SOLAR_SYSYEM: 0,
      SUN: 1,
      EARTH_ORBIT: 2,
      EARTH: 3,
      MOON_ORBIT: 4
    };

    objects.forEach((object, index) => {
      object.rotation.y = elapsedTime * 0.1;

      switch(index) {
        case OBJECT.SOLAR_SYSYEM:
          object.rotation.y = elapsedTime * 0.001;
          break;
        case OBJECT.SUN:
          object.rotation.y = elapsedTime * 1;
          break;
        case OBJECT.EARTH_ORBIT:
          object.rotation.y = elapsedTime * 0.7;
          break;
        case OBJECT.EARTH:
          object.rotation.y = elapsedTime * 3;
          break;
        case OBJECT.MOON_ORBIT:
          object.rotation.y = elapsedTime * 2;
          break;
      }
    });

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(cb);
  }();
}