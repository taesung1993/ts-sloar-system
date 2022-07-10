import * as THREE from 'three';

class BoxGeometry {
  #geometry = new THREE.BoxGeometry();

  constructor() {}

  setWidth(width) {
    this.#geometry.width = width;
    return this;
  }

  setHeight(height) {
    this.#geometry.height = height;
    return this;
  }

  setDepth(depth) {
    this.#geometry.depth = depth;
    return this;
  }

  save() {
    return this;
  }

  get geometry() {
    return this.#geometry;
  }
}

export default BoxGeometry;