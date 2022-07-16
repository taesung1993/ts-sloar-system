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

  const perspective = new PerspectiveCamera(scene)
    .setFieldView(75)
    .setAspect(sizes.aspectRatio)
    .setZPosition(30)
    .lookAt(0, 1, 1)
    .save();

  
  /* 우주 생성 */
  const textureLoader = new THREE.TextureLoader();
  const backgroundTexture = textureLoader.load(
    '/images/textures/solar-system/galaxy.png'
  );
  const galaxyGeometry = new THREE.SphereGeometry(80, 32, 32);
  const galaxyMaterial = new THREE.MeshBasicMaterial({
    map: backgroundTexture,
    side: THREE.BackSide
  });
  const galaxyMesh = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
  scene.add(galaxyMesh);
  objects.push(galaxyMesh); // index 0

  const solarSystem = new THREE.Object3D();
  galaxyMesh.add(solarSystem);
  objects.push(solarSystem); // index 1

  const sun = new Sun(solarSystem, perspective.camera).create().setScale(2).save();
  objects.push(sun.mesh); // index 2


  /* 지구 궤도 생성 */
  const earthOrbit = new Orbit()
                      .setScene(solarSystem)
                      .addedByScene()
                      .setOrbitDistance(20)
                      .save();
  objects.push(earthOrbit.object); // index 3
    

  /* 지구 셍성 */
  const earth = new Earth(sun.mesh, perspective.camera).create().save();
  earthOrbit.insertPlant(earth.generateAtmosphere()).save();
  earthOrbit.insertPlant(earth.mesh).save();
  objects.push(earth.mesh); // index 4


  /* 달 궤도 생성 */
  const moonOrbit = new Orbit()
                    .setOrbitDistance(2)
                    .setScene(earthOrbit.object)
                    .addedByScene()
                    .save();

  /* 달 생성 */
  const moon = new Moon().create().save();
  moonOrbit.insertPlant(moon.mesh);
  objects.push(moon.mesh); // index 5
  
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
      GALAXY: 0,
      SOLAR_SYSYEM: 2,
      SUN: 3,
      EARTH_ORBIT: 3,
      EARTH: 4,
      MOON_ORBIT: 5
    };

    objects.forEach((object, index) => {

      switch(index) {
        case OBJECT.GALAXY:
          object.rotation.y = elapsedTime * 0.1;
          break;
        case OBJECT.SOLAR_SYSYEM:
          object.rotation.y = elapsedTime * 2;
          break;
        case OBJECT.SUN:
          object.rotation.y = elapsedTime * 1;
          break;
        case OBJECT.EARTH_ORBIT:
          object.rotation.y = elapsedTime * 1;
          break;
        case OBJECT.EARTH:
          object.rotation.y = elapsedTime * 1;
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