"use strict";

export class Mouse {

    #state;

    constructor() {
    }

    get State() { return this.#state; }
    set State(value) { this.#state = value; }
}