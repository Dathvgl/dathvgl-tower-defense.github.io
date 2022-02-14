"use strict";

export class MonsterRecord {
    
    #id;
    #count;
    #form;
    #amount = [];

    constructor(id, data) {
        this.#id = id;
        this.#count = 0;
        this.#form = 0;
        this.#amount[0] = data[0];
        this.#amount[1] = data[1];

    }

    get Id() { return this.#id; }
    //set Id(value) { this.#id = value; }

    get Count() { return this.#count; }
    set Count(value) { this.#count = value; }

    get Form() { return this.#form; }
    set Form(value) { this.#form = value; }

    get Amount() { return this.#amount[this.#form]; }
    //set Amount(value) { this.#amount[this.#form] = value; }
}