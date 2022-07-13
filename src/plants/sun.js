import * as THREE from 'three';
import DirectionalLight from '../lights/direction';

class Sun {
  #scene = null;
  #mesh = null;
  #texture = null;
  #material = null;
  #geometry = null;

  get mesh() {
    return this.#mesh;
  }

  constructor(scene) {
    this.#scene = scene;
  }

  create() {
    this.#generateLight();
    this.#generateTexture();
    this.#generateGeometry();
    this.#generateMaterial();
    this.#generateSun();
    return this;
  }

  save() {
    return this;
  }

  setScale(number) {
    this.#mesh.scale.set(number, number, number);
    return this;
  }

  #generateTexture() {
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load(
      '/images/textures/solar-system/sun.jpg'
    );
    this.#texture = sunTexture;
  }

  #generateMaterial() {
      const material = new THREE.MeshPhongMaterial();
      material.map = this.#texture;
      this.#material = material;
  }

  #generateGeometry() {
    const geometry = new THREE.SphereGeometry(1.5, 36, 16);
    this.#geometry = geometry;
  }

  #generateLight() {
    const direction = new DirectionalLight()
      .setColor('#ffffff')
      .setIntensity(1.1)
      .setPosition(0, 0, 1)
      .save();

    this.#scene.add(direction.light);
  }

  #generateSun() {
    const sun = new THREE.Mesh(this.#geometry, this.#material);
    // this.#scene.add(sun);
    this.#mesh = sun;
  }
}

export default Sun;
