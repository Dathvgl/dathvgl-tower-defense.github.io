"use strict";

import { RadTile } from "./const_value.js";

export class General {

    #rad;
    #x;
    #y;
    #src;

    constructor(rad, x, y, src = "white") {
        this.#rad = rad;
        this.#x = x;
        this.#y = y;
        this.#src = src;
    }

    get Rad() { return this.#rad; }
    set Rad(value) { this.#rad = value; }

    get X() { return this.#x; }
    set X(value) { this.#x = value; }

    get Y() { return this.#y; }
    set Y(value) { this.#y = value; }

    get Src() { return this.#src; }
    set Src(value) { this.#src = value; }

    //Layout - return ID Object clicked - scale là số lượng dọc
    ObjectPosition(x, y, scale) {
        return Math.floor((y - this.Y) / RadTile) + Math.floor((x - this.X) / RadTile) * scale;
    }

    DrawObject(ctx, opacity, src, lineWidth, lineColor) {
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.fillStyle = src;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
    }
}