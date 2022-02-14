"use strict";

import { DataTurret, SizeTile } from "../../const_value.js";
import { ChangeArray } from "../../function.js";
import { Turret } from "./turret.js";

export class EnergyTurret extends Turret {
    
    constructor(rad, x, y, src, data) {
        super(rad, x, y, src, data);
    }

    Upgraded() {
        super.Upgraded();
        this.UpPower();
        this.UpSpeed();
        super.UpRange();
        super.UpUpgrade();
        super.UpSell();
        super.UpSpread();
        super.UpEffect();
    }

    UpPower() {
        this.Power += DataTurret[this.Id].Power * this.Multiple[0];
    }

    UpSpeed() {
        this.Speed += DataTurret[this.Id].Speed * this.Multiple[1];
    }

    Energetic(Locate, TurretList, PowerUp) {
        let AroundTurret = [];
        AroundTurret.push(Locate - SizeTile);
        AroundTurret.push(Locate + SizeTile);

        if (Locate != Math.floor(Locate / SizeTile) * SizeTile) {
            AroundTurret.push(Locate - (SizeTile + 1));
            AroundTurret.push(Locate - 1);
            AroundTurret.push(Locate + (SizeTile - 1));
        }

        if (Locate != Math.ceil(Locate / SizeTile) * SizeTile - 1) {
            AroundTurret.push(Locate - (SizeTile - 1));
            AroundTurret.push(Locate + 1);
            AroundTurret.push(Locate + (SizeTile + 1));
        }

        let n = AroundTurret.length;
        for (let i = 0; i < n; i++) {
            if (AroundTurret[i] < 1) {
                AroundTurret[i] = null;
                continue;
            }

            if (TurretList[AroundTurret[i]] == null) {
                AroundTurret[i] = null;
            }
        }

        n = null;

        AroundTurret = ChangeArray(AroundTurret);
        PowerUp(this.Power, this.Speed, AroundTurret, TurretList);

        AroundTurret.length = 0;
        AroundTurret = null;
    }
}