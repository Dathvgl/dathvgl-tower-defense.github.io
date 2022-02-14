"use strict";

import { RadTile_Circle, SizeTile } from "../../const_value.js";
import { PathWay } from "../../path_way.js";
import { Monster } from "./monster.js";

export class MonsterWalk extends Monster {

    #path = [];
    #inPath;
    #temp;
    #keepDirect;
    #final;
    #stop

    #tempWay;
    #tempPath = [];
    #tempInPath;
    
    constructor(rad, x, y, src, data) {
        super(rad, x, y, src, data);
        this.#inPath = 0;
        this.#temp = null;
        this.#keepDirect = "S";
        this.#final = false;
        this.#stop = false;

        this.#tempWay = null;
        this.#tempInPath = 0;

        this.Type = "walk";
    }

    Nothing(Path) {
        super.Nothing();
        this.#path.length = 0;
        this.#path = new Array(...Path);
    }

    Pathing(Path, TileList, MapPath, Layout) {
        super.Pathing();
        let lengthPathOld = this.#path.length;
        let lengthPathNew = Path.length;

        if (lengthPathOld == lengthPathNew && this.#tempPath.length == 0 && !this.#stop) {
            if (this.#path.every((element, index) => { return element === Path[index]; })) {
                lengthPathOld = lengthPathNew = null;
                return;
            }
        }

        if (this.IsLost(Path, TileList)) {
            this.Nothing(Path);
            this.#tempPath.length = 0;
            lengthPathOld = lengthPathNew = null;
            return;
        }

        this.#tempWay = new PathWay();
        this.#tempWay.TempPath(MapPath);

        let ID = Layout.ObjectPosition(this.X, this.Y, SizeTile);
        this.#tempWay.BFSVisited(ID);
        this.Nothing(Path);
        this.#stop = false;

        let minInPath = lengthPathNew;
        for (let i = lengthPathNew - 1; i >= 0; i--) {
            this.#tempPath.length = 0;
            this.#tempPath = this.#tempWay.FindEdges(Path[i] - 1);

            if (this.#tempPath[0] != ID + 1) {
                this.#tempPath.length = 0;
                this.#tempInPath = 0;
                this.#stop = true;

                lengthPathOld = lengthPathNew = ID = minInPath = this.#tempWay = null;
                return;
            }

            let n = this.#tempPath.length;
            if (n > minInPath) {
                this.#tempInPath = 0;
                this.#tempPath.length = 0;
                this.#tempPath = this.#tempWay.FindEdges(Path[i + 1] - 1);
                this.#inPath = i + 1;

                n = minInPath = this.#tempWay = null;
                break;
            }
            minInPath = n;

            n = null;
        }

        lengthPathOld = lengthPathNew = ID = null;
    }

    IsLost(Path, TileList) {
        let n = Path.length;
        for (let i = 0; i < n; i++) {
            if (TileList[Path[i] - 1].IsTileExact(this.X, this.Y)) {
                n = null;
                return true;
            }
        }

        n = null;
        return false;
    }

    Moving(Path, Layout, TileList) {
        super.Moving();
        this.FollowPath(TileList);
    }

    FollowPath(TileList) {
        if (this.#final) {
            if (isNaN(this.#path[this.#inPath] - 1)) { this.#inPath--; }
            let Middle = this.AltMiddle(
                TileList[this.#path[this.#inPath] - 1].X + RadTile_Circle,
                TileList[this.#path[this.#inPath] - 1].Height
            );
            this.Direction(Middle, -1);

            Middle = null
            return;
        }

        if (this.#tempPath.length != 0) {
            let Middle = this.AltMiddle(
                TileList[this.#tempPath[this.#tempInPath] - 1].X + RadTile_Circle,
                TileList[this.#tempPath[this.#tempInPath] - 1].Y + RadTile_Circle
            );
            this.ReDirection(Middle, undefined);
            
            Middle = null;
            return;
        }

        if (this.#stop) { return; }

        let Middle = this.AltMiddle(
            TileList[this.#path[this.#inPath] - 1].X + RadTile_Circle,
            TileList[this.#path[this.#inPath] - 1].Y + RadTile_Circle
        );

        this.Direction(Middle, undefined);

        Middle = null;
    }

    Direction(Middle, Where) {
        this.IsDirect(Middle);
        if (this.#temp !== Middle) { 
            this.MoveWay();
            return;
        }
        this.FindNEWS(Where);
        this.#inPath++;
        if (this.#inPath === this.#path.length - 1) { this.#final = true; }
    }

    ReDirection(Middle, Where) {
        this.IsDirect(Middle);
        if (this.#temp !== Middle) { 
            this.MoveWay();
            return;
        }
        this.FindNEWS(this.#tempPath[this.#tempInPath] - this.#tempPath[this.#tempInPath + 1]);
        this.#tempInPath++;
        if (this.#tempInPath === this.#tempPath.length - 1) {
            this.#tempInPath = null;
            this.#tempPath.length = 0;
        }
    }

    IsDirect(Middle) {
        switch(this.#keepDirect) {
            case "N":
                this.#temp = (this.Y > Middle) ? this.Y - this.Speed : Middle;
                break;
            case "S":
                this.#temp = (this.Y < Middle) ? this.Y + this.Speed : Middle;
                break;
            case "E":
                this.#temp = (this.X < Middle) ? this.X + this.Speed : Middle;
                break;
            case "W":
                this.#temp = (this.X > Middle) ? this.X - this.Speed : Middle;
                break;
        }
    }

    FindNEWS(Where = this.#path[this.#inPath] - this.#path[this.#inPath + 1]) {
        let Directed = null;
        switch(Where) {
            case 1:
                Directed = "N";
                this.AltWay(this.Y, -1, Directed);
                break;
            case -1:
                Directed = "S";
                this.AltWay(this.Y, 1, Directed);
                break;
            case 15:
                Directed = "W";
                this.AltWay(this.X, -1, Directed);
                break;
            case -15:
                Directed = "E";
                this.AltWay(this.X, 1, Directed);
                break;
        }

        Directed = Where = null;
    }

    MoveWay() {
        switch(this.#keepDirect) {
            case "N":
            case "S":
                this.Y = this.#temp;
                break;
            case "E":
            case "W":
                this.X = this.#temp;
                break;
        }
    }

    AltWay(Origin, Multi, Directed) {
        if (this.#keepDirect !== Directed) {
            this.MoveWay();
            this.#keepDirect = Directed;
            return;
        }
        this.#temp = Origin + this.Speed * Multi;
        this.MoveWay();
    }

    AltMiddle(x, y) {
        switch(this.#keepDirect) {
            case "N":
            case "S":
                return y;
            case "E":
            case "W":
                return x;
        }
    }

    IsPlaced(Tile) {
        super.IsPlaced();
        let Check = false;
        let ArrayList = [
            [this.X, this.Y],
            [this.X - this.Rad, this.Y],
            [this.X + this.Rad, this.Y],
            [this.X, this.Y - this.Rad],
            [this.X, this.Y + this.Rad]
        ];
        let n = ArrayList.length;
        for (let i = 0; i < n; i++) {
            if (Tile.IsTileExact(ArrayList[i][0], ArrayList[i][1])) { Check = true; }
            ArrayList[i].length = 0;
        }

        ArrayList.length = 0;
        ArrayList = n = null;
        return Check;
    }

    Death(Layout, TileList, Basic) {
        if (super.Death()) {
            Basic.Money += this.Gold;
            return null;
        }

        if (this.X == TileList[this.#path[this.#path.length - 1] - 1].X + RadTile_Circle && this.Y >= TileList[this.#path[this.#path.length - 1] - 1].Height) {
            Basic.Life--;
            return null;
        }

        return this;
    }
}

export class MonsterAir extends Monster {

    constructor(rad, x, y, src, data) {
        super(rad, x, y, src, data);
        this.Type = "air";
    }

    Nothing(Path) {
        super.Nothing();
    }

    Pathing(Path, TileList) {
        super.Pathing();
    }

    Moving(Path, Layout, TileList) {
        super.Moving();
        this.X = (this.X < Layout.Width) ? this.X += this.Speed : this.X = Layout.Width;
        this.Y = (this.Y < Layout.Height) ? this.Y += this.Speed : this.Y = Layout.Height;
    }

    IsPlaced(Tile) {
        super.IsPlaced();
    }

    Death(Layout, TileList, Basic) {
        if (super.Death()) {
            Basic.Money += this.Gold;
            return null;
        }

        if (this.X + this.Y == Layout.Width + Layout.Height) {
            Basic.Life--;
            return null;
        }

        return this;
    }
}