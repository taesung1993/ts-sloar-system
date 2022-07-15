import * as THREE from 'three';
import DirectionalLight from '../lights/direction';

class Moon {
    #mesh = null;
    #texture = null;
    #material = null;
    #geometry = null;

    get mesh() {
        return this.#mesh;
    }

    constructor() {
        this.#generateTexture();
        this.#generateGeometry();
        this.#generateMaterial();
        this.#generateMoon();
    }

    create() {
        return this;
    }

    save () {
        return this;
    }

    #generateTexture() {
        const textureLoader = new THREE.TextureLoader();
        const moonTexture = textureLoader.load(
            '/images/textures/solar-system/moon.jpeg'
        );
        this.#texture = moonTexture;
    }

    #generateGeometry() {
        this.#geometry = new THREE.SphereGeometry(0.1, 32, 32);
    }

    #generateMaterial() {
        this.#material = new THREE.MeshPhongMaterial();
        this.#material.map = this.#texture;
    }

    #generateMoon() {
        const direction = new DirectionalLight()
        .setColor('#ffffff')
        .setIntensity(1.1)
        .setPosition(0, 0, 1)
        .save();
        this.#mesh = new THREE.Mesh(this.#geometry, this.#material);
        this.#mesh.add(direction);
    
    }
}

export default Moon;