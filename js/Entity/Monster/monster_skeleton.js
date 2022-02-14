"use strict";

import { MonsterWalk } from "./monster_typed.js";

export class Skeleton extends MonsterWalk {
    
    constructor(rad, x, y, src, data) {
        super(rad, x, y, src, data);
    }
}