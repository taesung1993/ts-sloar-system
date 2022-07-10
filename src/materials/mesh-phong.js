import * as THREE from 'three';

class MeshPhongMaterial {
    #material = new THREE.MeshPhongMaterial();

    constructor(){}

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

export default MeshPhongMaterial;