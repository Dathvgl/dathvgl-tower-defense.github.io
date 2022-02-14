"use strict";

import { Circle } from "../Entity/circle.js";
import { Mouse } from "./mouse.js";

export class MouseDown extends Mouse {

    #rangeShot;

    constructor() {
        super();
        this.State = "";
        this.#rangeShot = null;
    }

    get RangeShot() { return this.#rangeShot; }
    set RangeShot(value) { this.#rangeShot = value; }

    SetRangeShot(rad, x, y) {
        this.#rangeShot = new Circle(rad, x, y, "blue");
    }

    CancelRangeShot() {
        this.#rangeShot = null;
    }
}