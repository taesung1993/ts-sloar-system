import * as THREE from 'three';

/*
* 원근 카메라(PerspectiveCamera) 생성 
*/
class PerspectiveCamera {
  #camera = new THREE.PerspectiveCamera();

  constructor() {}

  setFieldView(fieldView) {
    /*
        fov: 시야각(field of view)의 줄임말, 도(degrees) 사용
    */
    this.#camera.fov = fieldView;
    return this;
  }

  setAspect(aspect) {
    /*
        aspect: 가로 / 세로 비율
    */
    this.#camera.aspect = aspect;
    return this;
  }

  setNear(near) {
    /*
        near: 카메라 앞에 렌더링되는 공간 범위를 지정하는 요소
    */
    this.#camera.near = near;
    return this;
  }

  setFar(far) {
    /*
        far: 카메라 앞에 렌더링되는 공간 범위를 지정하는 요소
    */
    this.#camera.far = far;
    return this;
  }

  setZPosition(z) {
    this.#camera.position.z = z;
    return this;
  }

  update() {
    /*
      카메라 옵션을 변경했을 경우, 변경 값을 업데이트한다.
    */
    this.#camera.updateProjectionMatrix();
  }

  save() {
    this.#camera.updateProjectionMatrix();
    return this;
  }

  get camera() {
    return this.#camera;
  }
}

export default PerspectiveCamera;