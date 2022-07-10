class Size {
    #width = 0;
    #height = 0;

    constructor() {}

    setWidth(width) {
        this.#width = width;
        return this;
    }

    setHeight(height) {
        this.#height = height;
        return this;
    }

    save() {
        return this;
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

    get aspectRatio() {
        return this.#width / this.#height;
    }
}

export default Size;