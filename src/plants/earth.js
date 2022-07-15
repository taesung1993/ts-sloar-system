import * as THREE from 'three';

const Shaders = {
  atmosphere: {
    vertexShader: `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix  * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
     void main() {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 0.2); // R, G, B, A
      }
    `,
  },
};


class Eearth {
  #scene = null;
  #mesh = null;
  #texture = null;
  #material = null;
  #gemetry = null;
  #light = null;
  #camera = null;

  get mesh() {
    return this.#mesh;
  }

  constructor(scene, camera) {
    this.#scene = scene;
    this.#camera = camera;
  }

  create() {
    this.#generateTexture();
    this.#generateMaterial();
    this.#generateGeometry();
    this.#generateLight();
    this.#generateEarth();
    // this.#generateAtmosphere();
    return this;
  }

  save() {
    return this;
  }

  #generateTexture() {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      '/images/textures/solar-system/earth.jpeg'
    );
    this.#texture = texture;
  }

  #generateMaterial() {
    const material = new THREE.MeshPhongMaterial();
    material.map = this.#texture;
    this.#material = material;
  }

  #generateGeometry() {
    const geometry = new THREE.SphereGeometry(0.3, 32, 32);
    this.#gemetry = geometry;
  }

  #generateLight() {
    const light = new THREE.AmbientLight(0xffffffff, 0.5);
    this.#light = light;
  }

  #generateEarth() {
    const mesh = new THREE.Mesh(this.#gemetry, this.#material);
    mesh.add(this.#light);
    this.#mesh = mesh;
  }

  generateAtmosphere() {
    const geometry = new THREE.SphereGeometry(0.3, 36, 32);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        c: { type: 'f', value: 0.7 },
        p: { type: 'f', value: 4.0 },
      },
      vertexShader: Shaders.atmosphere.vertexShader,
      fragmentShader: Shaders.atmosphere.fragmentShader,
      transparent: true
    });
    const atmosphere = new THREE.Mesh(geometry, atmosphereMaterial);
    atmosphere.scale.set(1.1, 1.1, 1.1);
    return atmosphere;
  }
}

export default Eearth;