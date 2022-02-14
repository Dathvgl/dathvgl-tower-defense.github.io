"use strict";

import { DataTurret } from "../../const_value.js";
import { Turret } from "./turret.js";

export class FireTurret extends Turret {
    
    constructor(rad, x, y, src, data) {
        super(rad, x, y, src, data);
    }

    Upgraded() {
        super.Upgraded();
        this.UpPower();
        super.UpSpeed();
        this.UpRange();
        super.UpUpgrade();
        super.UpSell();
        this.UpSpread();
        super.UpEffect();
    }

    UpPower() {
        if (this.Level != 5) {
            super.UpPower();
            return;
        }
        super.UpPower(Math.ceil(this.Multiple[0] * 0.83 * 10) / 10);
    }

    UpRange() {
        this.Range += DataTurret[this.Id].Range * this.Multiple[2];
    }

    UpSpread() {
        if (this.Level != 5) { return; }
        this.Spread += DataTurret[this.Id].Spread * this.Multiple[5];
    }
}