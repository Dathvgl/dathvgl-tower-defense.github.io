"use strict";

import { DataTurret } from "../../const_value.js";
import { Turret } from "./turret.js";

export class PoisonTurret extends Turret {

    #tempSpeed;
    
    constructor(rad, x, y, src, data) {
        super(rad, x, y, src, data);
        this.#tempSpeed = this.Speed;
    }

    Upgraded() {
        super.Upgraded();
        this.UpPower();
        this.UpSpeed();
        super.UpRange();
        super.UpUpgrade();
        super.UpSell();
        super.UpSpread();
        this.UpEffect();
    }

    UpPower() {
        this.Power += DataTurret[this.Id].Power * this.Multiple[0];
    }

    UpSpeed() {
        this.#tempSpeed += DataTurret[this.Id].Speed * this.Multiple[1];
        this.Speed = Math.round(this.#tempSpeed * 10) / 10;
        if (this.Level == 5) { this.#tempSpeed = null; }
    }

    UpEffect() {
        this.Effect += DataTurret[this.Id].Effect * this.Multiple[6];
    }
}