"use strict";

import { MonsterWalk } from "./monster_typed.js";

export class Zombie extends MonsterWalk {
    
    constructor(rad, x, y, src, data) {
        super(rad, x, y, src, data);
    }
}