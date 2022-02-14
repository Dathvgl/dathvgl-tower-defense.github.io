"use strict";

import { CanvasHeight, DataMonster, RadTile, SizeTile } from "../../const_value.js";
import { ChangeArray, SpreadMonster } from "../../function.js";
import { Circle } from "../circle.js";

export class Monster extends Circle {

    #form
    #name;
    #type;

    #speed = [];
    #hp;
    #gold = [];
    #damaged = [];

    #hp_total;
    #hp_boss_multi;
    #targeted;
    #spreaded;
    #bullet = [];
    #poison = [];
    #frozen = [];
    
    constructor(rad, x, y, src, data) {
        super(rad, x, y, src);
        this.#form = 0;
        this.#name = data.Name;
        this.#type = null;

        this.#speed[0] = data.Speed[0];
        this.#speed[1] = data.Speed[1];
        this.#hp = data.HP[0];
        this.#gold[0] = data.Gold[0];
        this.#gold[1] = data.Gold[1];
        this.#damaged = new Array(...data.Damaged);
        
        this.#hp_total = this.#hp;
        this.#hp_boss_multi = data.HP[1];

        this.#targeted = false;
        this.#spreaded = null;
        this.#bullet.length = 0;
        this.#poison.length = 0;
        this.#frozen.length = 0;
    }

    get Form() { return this.#form; }
    set Form(value) { this.#form = value; }

    get Name() { return this.#name; }
    set Name(value) { this.#name = value; }

    get Type() { return this.#type; }
    set Type(value) { this.#type = value; }

    get Speed() { return this.#speed[this.#form]; }
    set Speed(value) { this.#speed[this.#form] = value; }

    get HP() { return this.#hp; }
    set HP(value) { this.#hp = value; }

    get HPTotal() { return this.#hp_total; }
    set HPTotal(value) { this.#hp_total = value; }

    get Gold() { return this.#gold[this.#form]; }
    //set Gold(value) { this.#gold[this.#form] = value; }

    get Damaged() { return this.#damaged; }
    //set Damaged(value) { this.#damaged = value; }

    Nothing() {}

    ScaleHP(Turn) {
        if (Turn < 6) { return; }

        let reduce = 1;
        if (Turn < 50) { reduce *= 0.5; }
        else if (Turn < 100) { reduce *= 0.75; }

        this.#hp *= Turn * this.#hp_boss_multi * Turn;
        this.#hp = this.#hp - this.#hp * this.#form + this.#hp * this.#form * 3;
        this.#hp_total = this.#hp * reduce;

        reduce = null;
    }

    Pathing() {}

    Moving() {}

    IsPlaced() {}

    Death() {
        if (this.#hp <= 0) { return true; }
        return false;
    }

    ChargeBullet(Shot) {
        this.#targeted = true;
        this.#bullet.push(Shot);
    }

    IsShot(Context) {
        if (this.#targeted) {
            let n = this.#bullet.length;
            if (n > 0) {
                for (let i = 0; i < n; i++) {
                    let keep = this.#bullet[i].TimeDelayed(this.#bullet[i], this.#damaged, this.X, this.Y, Context);
                    this.#hp -= keep.Data[0];
                    this.IsEffect(keep.Data[1], keep.Data[2]);
                    this.IsSpread(keep.Data[1], keep.Data[2], keep.Data[3], keep.Data[4]);
                    this.#bullet[i] = keep.Shoot;
                    
                    keep.Data.length = 0;
                    keep.Data = null;
                    keep.Shoot = null;
                    keep = null;
                }
                this.#bullet = ChangeArray(this.#bullet);
                return;
            }
            this.#targeted = false;
            n = null;
        }
    }

    IsEffect(ExID, ExEffect) {
        switch(ExID) {
            case 2:
                this.#poison.push([5000, ExEffect]);
                break;
            case 4:
                this.#frozen.push([1000, ExEffect]);
                break;
            default:
                break;
        }
    }

    IsSpread(ExID, ExEffect, ExSpread, ExPower) {
        if (ExSpread == 0) { return; }
        this.#spreaded = [ExID, ExSpread, ExEffect, ExPower];
    }

    TimeEffect(Order) {
        let n = this.#poison.length;
        for (let i = 0; i < n; i++) {
            if ((this.#poison[i][0] / 1000 - Math.floor(this.#poison[i][0] / 1000)) == 0) {
                this.#hp -= this.#hp * this.#poison[i][1] / 100;
            }

            if (this.#poison[i][0] / 1000 == 1) {
                this.#poison[i] = null;
                continue;
            }

            this.#poison[i][0] -= 50;
        }
        this.#poison = ChangeArray(this.#poison);

        let BasicSpeed = DataMonster[Order].Speed[this.#form]
        n = this.#frozen.length;
        for (let i = 0; i < n; i++) {
            if (BasicSpeed - this.#speed[this.#form] == 0) {
                this.#speed[this.#form] -= this.#speed[this.#form] * this.#frozen[i][1] / 100;
            }

            if (this.#frozen[i][0] == 0) {
                this.#speed[this.#form] = BasicSpeed;
                this.#frozen[i] = null;
                continue;
            }

            this.#frozen[i][0] -= 50;
        }
        this.#frozen = ChangeArray(this.#frozen);

        n = BasicSpeed = null;
    }

    Spreading(Monster, Type, Order) {
        if (this.#spreaded == null) { return; }

        SpreadMonster(
            this, Monster, Math.floor(this.#spreaded[1]) * RadTile + 
            (this.#spreaded[1] - Math.floor(this.#spreaded[1])) * RadTile,
            this.#spreaded[0], this.#spreaded[2], this.#spreaded[3],
            Type, Order
        );
        
        this.#spreaded.length = 0;
        this.#spreaded = null;
    }
    
    IsRangeSpread(x, y, check) {
        if (x == this.X && y == this.Y) { return false; }
        if (y <= (CanvasHeight - SizeTile * RadTile) / 2) { return false; }
        return this.IsCircle(x, y, check);
    }
}