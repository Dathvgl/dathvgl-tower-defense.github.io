import { Circle } from "../circle.js";

export class TurretTemp extends Circle {

    #id;

    constructor(rad, x, y, src) {
        super(rad, x, y, src);
        this.#id = -1;
    }

    get Id() { return this.#id; }
    set Id(value) { this.#id = value; }

    BasicTemp() {
        this.#id = -1;
        this.X = 0;
        this.Y = 0;
        this.Src = "white";
    }
}