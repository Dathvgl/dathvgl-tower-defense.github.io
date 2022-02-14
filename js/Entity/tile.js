"use strict";

import { ObjectBorder_Color, ObjectBorder_Width } from "../const_value.js";
import { General } from "../general.js";

export class Tile extends General {

    #width;
    #height;

    constructor(rad,x, y, src) {
        super(rad, x, y, src);
        this.#width = this.Rad + this.X;
        this.#height = this.Rad + this.Y;
    }

    get Width() { return this.#width; }
    //set Width(value) { this.#width = value; }

    get Height() { return this.#height; }
    //set Height(value) { this.#height = value; }

    IsTile(x, y) {
        return  (x - this.X) * (this.#width - x) > 0 &&
                (y - this.Y) * (this.#height - y) > 0;
    }

    IsTileExact(x, y) {
        return  (x - this.X) * (this.#width - x) >= 0 &&
                (y - this.Y) * (this.#height - y) >= 0;
    }

    Resize(a, b) {
        this.#width = a + this.X;
        this.#height = b + this.Y;
    }
    
    DrawObject(ctx, opacity = 1, src = this.Src, lineWidth = ObjectBorder_Width, lineColor = ObjectBorder_Color, width = this.Rad, height = this.Rad) {
        super.DrawObject(ctx, opacity, src, lineWidth, lineColor);
        ctx.rect(this.X, this.Y, width, height);
        ctx.fill();
        ctx.stroke();
    }
}