"use strict";

import { RadTile } from "../const_value.js";
import { Circle } from "./circle.js";

export class Bullet extends Circle {

    #id;
    #monsterX;
    #monsterY;
    #power;
    #spread;
    #effect;
    #exPower;

    constructor(rad, x, y, src, data) {
        super(rad, x, y, src);
        
        this.#id = data.Id;
        this.#power = data.Power;
        this.#spread = data.Spread;
        this.#effect = data.Effect;
        this.#exPower = data.ExPower;
    }

    SetEnemyPosition(x, y) {
        this.#monsterX = x;
        this.#monsterY = y;
    }
    
    TimeDelayed(Origin, Monster, x, y, Context) {
        this.SetEnemyPosition(x, y);
        return this.Chasing(Origin, Monster, Context);
    }

    Chasing(Origin, Monster, Context) {
        this.X = this.CaseChasing(this.X, this.#monsterX);
        this.Y = this.CaseChasing(this.Y, this.#monsterY);
        this.DrawObject(Context);
        if (this.X == this.#monsterX && this.Y == this.#monsterY) {
            return { Data: [(this.#power + this.#exPower) * Monster[this.#id] / 100,
                    this.#id, this.#effect, this.#spread, this.#power], Shoot: null };
        }
        return { Data: [0, null, null, null, null], Shoot: Origin };
    }

    CaseChasing(Thing, Condition) {
        if (Thing != Condition) {
            if (Math.abs(Thing - Condition) > RadTile / 6) {
                if (Condition > Thing) { return Thing += RadTile / 4; }

                return Thing -= RadTile / 4;
            }
            return Thing = Condition;;
        }
    }
}