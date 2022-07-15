import * as THREE from 'three';

class Orbit {
    #orbit = null;
    #scene = null;
    
    constructor() {
        this.#generateOrbit();
    }

    #generateOrbit() {
        this.#orbit = new THREE.Object3D();
    }

    setOrbitDistance(x) {
        this.#orbit.position.x = x;
        return this;
    }

    insertPlant(plant) {
        this.#orbit.add(plant);
        return this;
    }

    setScene(scene) {
        this.#scene = scene;
        return this;
    }

    addedByScene() {
        if (this.#scene && this.#scene.add) {
            return this;
        } 
        throw Error('씬(scene)을 등록해주세요.');
    }

    save() {
        if(this.#scene && this.#scene.add) {
            this.#scene.add(this.#orbit);
        }
        return this;
    }

    get object() {
        return this.#orbit;
    }
}

export default Orbit;