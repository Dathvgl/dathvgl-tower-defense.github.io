"use strict";

import { BaseLife, BaseMoney, BaseTime, BaseTimeReset, BaseTurn } from "./const_value.js";

export class Basic {

    #life;
    #money;
    #time;
    #turn;

    constructor() {
        this.#life = BaseLife;
        this.#money = BaseMoney;
        this.#time = BaseTime;
        this.#turn = BaseTurn;
    }

    get Life() { return this.#life; }
    set Life(value) { this.#life = value; }

    get Money() { return this.#money; }
    set Money(value) { this.#money = value; }

    get Time() { return this.#time; }
    set Time(value) { this.#time = value; }

    get Turn() { return this.#turn; }
    set Turn(value) { this.#turn = value; }

    TimeReset() {
        this.#time = BaseTimeReset;
    }

    EnoughMoney(Turret, ID) {
        if (Turret[ID].Buy > this.#money) { return false; }
        return true;
    }

    UpgradeMoney(Turret, ID) {
        if (Turret[ID].Upgrade > this.#money) { return false; }
        this.#money -= Turret[ID].Upgrade;
        return true;
    }
}