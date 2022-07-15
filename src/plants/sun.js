import * as THREE from 'three';
import DirectionalLight from '../lights/direction';

const Shaders = {
  atmosphere: {
    vertexShader: `
      varying vec3 vNormal;

      void main() {
        vNormal = normalize( normalMatrix * normal );
        gl_Position = projectionMatrix * modelViewMatrix  * vec4(position,1.0);
      }
    `,
    fragmentShader: `
      uniform float c;
      uniform float p;
      varying vec3 vNormal;

      void main() {
        float intensity = pow( c - dot( vNormal, vec3( 0.0, 0.0, 0.3 ) ), p ); 
        gl_FragColor = vec4( 1.0, 0.498, 0.0, 1.0 ) * intensity;
      }
    `,
  },
};

class Sun {
  #scene = null;
  #mesh = null;
  #texture = null;
  #material = null;
  #geometry = null;
  #camera = null;

  get mesh() {
    return this.#mesh;
  }

  constructor(scene, camera) {
    this.#scene = scene;
    this.#camera = camera;
  }

  create() {
    this.#generateLight();
    this.#generateTexture();
    this.#generateGeometry();
    this.#generateMaterial();
    this.#generateAtmosphere();
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
      const material = new THREE.MeshBasicMaterial({
        map: this.#texture
      });
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

  #generateAtmosphere() {
    const geometry = new THREE.SphereGeometry(10, 36, 16);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        c: { type: 'f', value: 0.7 },
        p: { type: 'f', value: 5.0 },
      },
      vertexShader: Shaders.atmosphere.vertexShader,
      fragmentShader: Shaders.atmosphere.fragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const atm = new THREE.Mesh(geometry, atmosphereMaterial);
    atm.scale.set(1.1, 1.1, 1.1);
    this.#scene.add(atm);
  }

  #generateSun() {
    const sun = new THREE.Mesh(this.#geometry, this.#material);
    this.#scene.add(sun);
    this.#mesh = sun;
  }
}

export default Sun;
