import * as THREE from 'three';

class DirectionalLight {
    #light = new THREE.DirectionalLight();
    
    constructor() {}

    setColor(colorCode) {
        this.#light.color = new THREE.Color(colorCode);
        return this;
    }

    setIntensity(intensity) {
        this.#light.intensity = intensity;
        return this;
    }

    setPosition(x, y, z) {
        this.#light.position.set(x, y, z);
        return this;
    }

    save() {
        return this;
    }

    get light() {
        return this.#light;
    }
}

export default DirectionalLight;