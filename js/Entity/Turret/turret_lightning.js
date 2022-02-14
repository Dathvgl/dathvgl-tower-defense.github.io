"use strict";

import { DataTurret } from "../../const_value.js";
import { Turret } from "./turret.js";

export class LightningTurret extends Turret {

    #tempSpread;
    
    constructor(rad, x, y, src, data) {
        super(rad, x, y, src, data);
        this.#tempSpread = this.Spread;
    }

    Upgraded() {
        super.Upgraded();
        super.UpPower();
        this.UpSpeed();
        this.UpRange();
        super.UpUpgrade();
        super.UpSell();
        this.UpSpread();
        super.UpEffect();
    }

    UpSpeed() {
        this.Speed += DataTurret[this.Id].Speed * this.Multiple[1];
    }

    UpRange() {
        this.Range += DataTurret[this.Id].Range * this.Multiple[2];
    }

    UpSpread() {
        this.#tempSpread += DataTurret[this.Id].Spread * this.Multiple[5];
        this.Spread = Math.round(this.#tempSpread);
        if (this.Level == 5) { this.#tempSpread = null; }
    }
}