"use strict";

import { RadTile_Circle } from "../const_value.js";
import { TurretTemp } from "../Entity/Turret/turret_temp.js";
import { Mouse } from "./mouse.js";

export class MouseMove extends Mouse {

    constructor() {
        super();
        this.State = new TurretTemp(RadTile_Circle, 0, 0, "white");
    }

    ReturnBasic() {
        this.State.BasicTemp();
    }
}