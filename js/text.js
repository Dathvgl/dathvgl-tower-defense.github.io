"use strict";

import { CanvasHeight, CanvasWidth, RadTile } from "./const_value.js";
import { DrawClear } from "./function.js";

export class Text {

    #basic;
    #turret;
    #hintedTurret;
    #monster

    constructor() {
        this.#basic = null;
        this.#turret = null;
        this.#monster = null
    }

    get Basic() { return this.#basic; }
    set Basic(value) { this.#basic = value; }

    get Turret() { return this.#turret; }
    set Turret(value) { this.#turret = value; }

    get HintedTurret() { return this.#hintedTurret; }
    set HintedTurret(value) { this.#hintedTurret = value; }

    get Monster() { return this.#monster; }
    set Monster(value) { this.#monster = value; }

    DrawText(ctx, Title, Value, x, y, Color = "black", Font = "30px Arial") {
        ctx.beginPath();
        ctx.font = Font;
        ctx.fillStyle = Color;
        ctx.fillText(Title + Value, x, y);
        ctx = null;
    }

    ClearHintTurret(Gameplay, x, y) {
        this.#hintedTurret = null;
        DrawClear(Gameplay, { X: x, Y: y, Width: CanvasWidth - x, Height: y});
    }

    ClearTextBottom(Gameplay, x, y) {
        this.#turret = null;
        this.#hintedTurret = null;
        this.#monster = null;
        DrawClear(Gameplay, { X: x, Y: y, Width: CanvasWidth - x, Height: CanvasHeight - y});
    }

    DrawTextBasic(Context, x, y) {
        if (this.#basic == null) { return; }

        let FillTitle = [ "Life: ", "Money: ", "Time: ", "Turn: " ];
        let count = 0;
        let counter = 1;
        let extraY = (layer, base = 30) => { return base * layer; }
        this.DrawText(Context, FillTitle[count], this.#basic.Life, x, y + extraY(counter));

        count++; counter++;
        this.DrawText(Context, FillTitle[count], this.#basic.Money, x, y + extraY(counter));

        count++; counter++;
        this.DrawText(Context, FillTitle[count], Math.floor(this.#basic.Time / 1000), x, y + extraY(counter));

        count++; counter++;
        this.DrawText(Context, FillTitle[count], this.#basic.Turn, x, y + extraY(counter));

    }

    DrawTextMonster(Context, x, y) {
        if (this.#monster == null) { return; }

        let FillTitle = [ "Name: ", "Speed: ", "Gold: ", "HP: ", "Total HP: " ];
        let count = 0;
        let counter = 3;
        let extraX = RadTile * 5;
        let extraY = (layer, base = 30) => { return base * layer; }
        this.DrawText(Context, FillTitle[count], this.#monster.Name, x, y - extraY(counter));

        count++; counter--;
        this.DrawText(Context, FillTitle[count], Math.round(this.#monster.Speed * 1000) / 1000, x, y - extraY(counter));
        this.DrawText(Context, FillTitle[count + 1], this.#monster.Gold, x + extraX, y - extraY(counter));

        count++; counter--;
        this.DrawText(Context, FillTitle[count + 1], Math.round(this.#monster.HP * 100) / 100, x, y - extraY(counter));

        count++; counter--;
        this.DrawText(Context, FillTitle[count + 1], Math.round(this.#monster.HPTotal * 100) / 100, x, y - extraY(counter));
    }

    DrawHintTurret(Context, x, y) {
        if (this.#hintedTurret == null) { return; }

        let FillTitle = [ "Name: ", "Power: ", "Speed: ", "Range: ", "Spread: ", "Effect: ", "Sell Price: ", "Upgrade: ", "Description: " ];
        let count = 0;
        let counter = 1;
        let extraX = RadTile * 4;
        let extraY = (layer, base = 30) => { return base * layer; }
        this.DrawText(Context, FillTitle[count], this.#hintedTurret.Name, x, y + extraY(counter));

        count++; counter++;
        this.DrawText(Context, FillTitle[count], this.#hintedTurret.Power, x, y + extraY(counter));
        this.DrawText(Context, FillTitle[count + 1], this.#hintedTurret.Speed, x + extraX, y + extraY(counter));

        count++; counter++;
        this.DrawText(Context, FillTitle[count + 1], this.#hintedTurret.Range, x, y + extraY(counter));
        this.DrawText(Context, FillTitle[count + 2], this.#hintedTurret.Spread, x + extraX, y + extraY(counter));

        count++; counter++;
        this.DrawText(Context, FillTitle[count + 2], this.#hintedTurret.DesEffect, x, y + extraY(counter));

        count++; counter++;
        this.DrawText(Context, FillTitle[count + 2], this.#hintedTurret.Sell, x, y + extraY(counter));
        this.DrawText(Context, FillTitle[count + 3], this.#hintedTurret.Upgrade, x + extraX, y + extraY(counter));

        //count++; counter++;
        //this.DrawText(Context, FillTitle[count + 3], this.#hintedTurret.Description, x, y + extraY(counter));

        FillTitle.length = 0;
        count = count = extraX = extraY = FillTitle = null;
    }

    DrawTextTurret(Context, x, y) {
        if (this.#turret == null) { return; }

        let FillTitle = [ "Name: ", "Power: ", "Speed: ", "Range: ", "Spread: ", "Effect: ", "Sell Price: ", "Upgrade: " ];
        let count = 0;
        let counter = 5;
        let extraX = RadTile * 4;
        let extraY = (layer, base = 30) => { return base * layer; }
        this.DrawText(Context, FillTitle[count], this.#turret.Name, x, y - extraY(counter));

        count++; counter--;
        this.DrawText(Context, FillTitle[count], this.#turret.Power, x, y - extraY(counter));
        this.DrawText(Context, "+", this.#turret.ExPower, x + extraX, y - extraY(counter));

        count++; counter--;
        this.DrawText(Context, FillTitle[count], this.#turret.Speed, x, y - extraY(counter));
        this.DrawText(Context, "+", this.#turret.ExSpeed, x + extraX, y - extraY(counter));

        count++; counter--;
        this.DrawText(Context, FillTitle[count], this.#turret.Range, x, y - extraY(counter));

        count++; counter--;
        this.DrawText(Context, FillTitle[count], this.#turret.Spread, x, y - extraY(counter));
        this.DrawText(Context, FillTitle[count + 1], this.#turret.Effect, x + extraX, y - extraY(counter));

        count++; counter--;
        this.DrawText(Context, FillTitle[count + 1], this.#turret.Sell, x, y - extraY(counter));
        this.DrawText(Context, FillTitle[count + 2], this.#turret.Upgrade, x + extraX, y - extraY(counter));

        FillTitle.length = 0;
        count = count = extraX = extraY = FillTitle = null;
    }
}