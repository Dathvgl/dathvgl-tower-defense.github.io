"use strict";

import { ObjectBorder_Color, ObjectBorder_Width } from "../const_value.js";
import { General } from "../general.js";

export class Circle extends General {

    constructor(rad,x, y, src) {
        super(rad, x, y, src);
    }

    IsCircle(x, y, check = this.Rad) {
        return Math.round(Math.sqrt(Math.pow(x - this.X, 2) + Math.pow(y - this.Y, 2))) <= check;
    }

    DrawObject(ctx, opacity = 1, src = this.Src, lineWidth = ObjectBorder_Width, lineColor = ObjectBorder_Color) {
        super.DrawObject(ctx, opacity, src, lineWidth, lineColor);
        ctx.arc(this.X, this.Y, this.Rad, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}