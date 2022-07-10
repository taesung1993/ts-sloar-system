import * as THREE from 'three';

class MeshBasicMaterial {
    #material = new THREE.MeshBasicMaterial();
    
    constructor() {}

    setColor(colorCode) {
        this.#material.color = new THREE.Color(colorCode);
        return this;
    }

    save() {
        return this;
    }

    get material() {
        return this.#material;
    }
}

export default MeshBasicMaterial;