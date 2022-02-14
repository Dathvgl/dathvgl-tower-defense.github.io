"use strict";

import { RadBullet, RadTile } from "../../const_value.js";
import { Bullet } from "../bullet.js";
import { Circle } from "../circle.js";

export class Turret extends Circle {

    #name;
    #id;
    #level;
    #power;
    #speed;
    #range;
    #spread;
    #effect;
    #buy;
    #sell;
    #upgrade;
    #multiple;

    #des_effect;
    #description;

    #target;
    #timeDelay;
    #saveDelay;
    #exStorage = [];
    #exPower;
    #exSpeed;

    constructor(rad, x, y, src, data) {
        super(rad, x, y, src);
        this.#name = data.Name;
        this.#id = data.Id;
        this.#level = 1;
        this.#power = data.Power;
        this.#speed = data.Speed;
        this.#range = data.Range;
        this.#spread = data.Spread;
        this.#effect = data.Effect;
        this.#buy = data.Buy;
        this.#sell = data.Sell;
        this.#upgrade = data.Upgrade;
        this.#multiple = data.Multiple;

        this.#des_effect = null;;
        this.#description = null;

        this.DefaultTurret();
    }

    get Name() { return this.#name; }
    //set Name(value) { this.#name = value; }

    get Id() { return this.#id; }
    //set Id(value) { this.#id = value; }

    get Level() { return this.#level; }
    set Level(value) { this.#level = value; }

    get Power() { return this.#power; }
    set Power(value) { this.#power = value; }

    get Speed() { return this.#speed; }
    set Speed(value) { this.#speed = value; }

    get Range() { return this.#range; }
    set Range(value) { this.#range = value; }

    get Spread() { return this.#spread; }
    set Spread(value) { this.#spread = value; }

    get Effect() { return this.#effect; }
    set Effect(value) { this.#effect = value; }

    get Buy() { return this.#buy; }
    set Buy(value) { this.#buy = value; }

    get Sell() { return this.#sell; }
    set Sell(value) { this.#sell = value; }

    get Upgrade() { return this.#upgrade; }
    set Upgrade(value) { this.#upgrade = value; }

    get DesEffect() { return this.#des_effect; }
    set DesEffect(value) { this.#des_effect = value; }

    get Description() { return this.#description; }
    set Description(value) { this.#description = value; }

    get Multiple() { return this.#multiple; }
    //set Multiple(value) { this.#multiple = value; }

    get ExStorage() { return this.#exStorage; }
    set ExStorage(value) { this.#exStorage = value; }

    get ExPower() { return this.#exPower; }
    //set ExPower(value) { this.#exPower = value; }

    get ExSpeed() { return this.#exSpeed; }
    //set ExSpeed(value) { this.#exSpeed = value; }

    DefaultTurret() {
        this.#target = null;
        this.#timeDelay = 0;
        this.#saveDelay = 0;

        this.#exStorage.length = 0;
        this.#exPower = 0;
        this.#exSpeed = 0;
    }

    Upgraded() {
        this.#level++;
    }

    UpPower(Multiple = this.#multiple[0]) {
        this.#power = Math.ceil(this.#power * Multiple);
    }

    UpSpeed() {}

    UpRange(Multiple = this.#multiple[2]) {
        this.#range = Math.ceil(this.#range * Multiple * 10) / 10;
    }

    UpSell(Multiple = this.#multiple[3]) {
        if (isNaN(parseInt(this.#upgrade))) { return; }
        this.#sell = this.#upgrade * Multiple;
    }

    UpUpgrade(Multiple = this.#multiple[4]) {
        if (this.#level == 5) {
            this.#upgrade = "Max";
            return;
        }
        this.#upgrade *= Multiple;
    }

    UpSpread(Multiple = this.#multiple[5]) {
        this.#spread *= Multiple;
    }

    UpEffect() {}

    IsExtra() {
        if (this.#exStorage.length == 0) {
            this.#exPower = 0;
            this.#exSpeed = 0;
            return;
        }
        this.#exPower = 0;
        this.#exSpeed = 0;
        for (let i = 0; i < this.#exStorage.length; i++) {
            this.#exPower += this.#exStorage[i][0];
            this.#exSpeed += this.#exStorage[i][1];
        }
        return;
    }

    ShootRange() {
        return Math.floor(this.Range) * RadTile + (this.Range - Math.floor(this.Range)) * RadTile;
    }

    SetDelay() { return Math.floor(1000 / this.Speed); }

    ResetDelay() {
        if (this.#saveDelay < 0) { this.#saveDelay = 0; }
        return this.#saveDelay;
    }

    OldTarget(Monster) {
        //console.log("hmm");
        if (this.#target == null) {
            this.#saveDelay -= 50;
            this.#saveDelay = this.ResetDelay();
            return;
        }

        //console.log("ok");
        if (Monster[this.#target[0]] == null) {
            this.#saveDelay = this.TimeDelay;
            this.#target = null;
            return;
        }
        
        //console.log("wut");
        if (Monster[this.#target[0]][this.#target[1]] == null) {
            this.#saveDelay = this.#timeDelay;
            this.#target = null;
        }
    }

    NewTarget(Type, Order, Check, Monster) {
        if (Check) {
            if (this.#target == null) {
                this.#target = [Type, Order];
                this.#timeDelay = this.ResetDelay();
                this.NewTarget(this.#target[0], this.#target[1], true, Monster);
                return;
            }

            if(this.#target[0] == Type && this.#target[1] == Order) {
                //Cooldown bắn
                if (this.#timeDelay > 0) {
                    this.#timeDelay -= 50;
                    return;
                }

                Monster.ChargeBullet(new Bullet(
                    RadBullet, this.X, this.Y, this.Src,
                    { Id: this.#id, Power: this.#power, Spread: this.#spread,
                        Effect: this.#effect, ExPower: this.#exPower }
                ));
                this.#timeDelay = this.SetDelay();
                return;
            }
        }

        if (this.#target == null) { return; }

        if (this.#target[0] == Type && this.#target[1] == Order) {
            this.#saveDelay = this.#timeDelay;
            this.#target = null;
        }
    }
}