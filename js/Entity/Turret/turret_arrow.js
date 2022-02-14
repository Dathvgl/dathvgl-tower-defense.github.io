"use strict";

import { Turret } from "./turret.js";

export class ArrowTurret extends Turret {
    
    constructor(rad, x, y, src, data) {
        super(rad, x, y, src, data);
    }

    Upgraded() {
        super.Upgraded();
        this.UpPower();
        this.UpSpeed();
        super.UpRange();
        this.UpUpgrade();
        super.UpSell();
        super.UpSpread();
        super.UpEffect();
    }

    UpPower() {
        if (this.Level != 5) {
            super.UpPower();
            return;
        }
        super.UpPower(this.Multiple[0] * 0.8);
    }

    UpSpeed() {
        if (this.Level != 5) {
            this.Speed = Math.ceil(this.Speed * this.Multiple[1] * 10) / 10;
            return;
        }
        this.Speed = Math.ceil(this.Speed * (Math.ceil(Math.pow(this.Multiple[1], 2))) * 10) / 10;
    }

    UpUpgrade() {
        if (this.Level != 4) {
            super.UpUpgrade();
            return;
        }
        super.UpUpgrade(this.Multiple[4] * 1.25);
    }
}