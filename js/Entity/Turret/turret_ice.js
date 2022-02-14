"use strict";

import { DataTurret } from "../../const_value.js";
import { Turret } from "./turret.js";

export class IceTurret extends Turret {

    #tempSpread;
    
    constructor(rad, x, y, src, data) {
        super(rad, x, y, src, data);
        this.#tempSpread = this.Spread;
    }

    Upgraded() {
        super.Upgraded();
        super.UpPower();
        this.UpSpeed();
        super.UpRange();
        this.UpUpgrade();
        super.UpSell();
        this.UpSpread();
        this.UpEffect();
    }

    UpSpeed() {
        this.Speed += DataTurret[this.Id].Speed * this.Multiple[1];
    }

    UpUpgrade() {
        if (this.Level != 4) {
            super.UpUpgrade();
            return;
        }
        super.UpUpgrade(this.Multiple[4] * 1.25);
    }

    UpSpread() {
        if (this.Level != 5) {
            this.#tempSpread += DataTurret[this.Id].Spread * this.Multiple[5];
            this.Spread = Math.round(this.#tempSpread);
            return;
        }
        this.#tempSpread += DataTurret[this.Id].Spread * this.Multiple[5] * 3;
        this.Spread = Math.round(this.#tempSpread);
    }

    UpEffect() {
        this.Effect += DataTurret[this.Id].Effect * this.Multiple[6];
    }
}