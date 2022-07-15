import * as THREE from 'three';

const Shaders = {
    atmosphere: {
      vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() 
        {
            vec3 vNormal = normalize( normalMatrix * normal );
            vec3 vNormel = normalize( normalMatrix * viewVector );
            intensity = pow( c - dot(vNormal, vNormel), p );
          
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 0.2 );
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4( glow, 1.0 );
        }
      `
    }
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
        const light = new THREE.AmbientLight(0xFFFFFFFF, 0.5);
        this.#light = light;
    }

    #generateEarth() {
        const mesh = new THREE.Mesh(this.#gemetry, this.#material);
        mesh.add(this.#light);
        this.#mesh = mesh;
    }
}

export default Eearth;