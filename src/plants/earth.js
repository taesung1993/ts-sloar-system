import * as THREE from 'three';

class Eearth {
    #scene = null;
    #mesh = null;
    #texture = null;
    #material = null;
    #gemetry = null;
    #light = null;
    
    get mesh() {
        return this.#mesh;
    }

    constructor(scene) {
        this.#scene = scene;
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