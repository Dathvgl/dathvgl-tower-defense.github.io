"use strict";

import { CanvasWidth, CanvasHeight, CanvasBGColor } from "./const_value.js"

export class Canvas {

    #width;
    #height;
    #context;
    #interval

    constructor() {
        this.#width = CanvasWidth;
        this.#height = CanvasHeight;
    }

    get Context() { return this.#context; }
    //set Context(value) { this.#context = value; }

    SetupCanvas() {
        let canvas = document.createElement("canvas");
        canvas.width = this.#width;
        canvas.height = this.#height;
        canvas.style.backgroundColor = CanvasBGColor;

        this.#context = canvas.getContext("2d");

        return canvas;
    }

    ClearGameArea(x = 0, y = 0, width = CanvasWidth, height = CanvasHeight) {
        this.#context.clearRect(x, y, width, height);
    }

    SetGameArea(loop, time) {
        this.#interval = setInterval(loop, time);
    }

    StopGameArea() {
        clearInterval(this.#interval);
    }
}