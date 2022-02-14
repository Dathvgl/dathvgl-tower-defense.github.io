"use strict";

import { AmountMonster, BasicCoolDownMonster, BasicTurnMonster, CanvasHeight, CanvasWidth, ColorMonster, ColorReup, ColorTile, ColorTurret, ColumnTurret, DataMonster, DataTurret, ObjectBorder_Width, OpacityTurret, RadMonster, RadTile, RadTile_Circle, RowTurret, ScaleMonster, SizeMonster, SizeTile, SizeTile_All, SizeTurret } from "./const_value.js";
import { CrazyBuffalo } from "./Entity/Monster/monster_crazybuffalo.js";
import { CrystalDragon } from "./Entity/Monster/monster_crystaldragon.js";
import { DemonBat } from "./Entity/Monster/monster_demonbat.js";
import { DemonSlug } from "./Entity/Monster/monster_demonslug.js";
import { GhostFox } from "./Entity/Monster/monster_ghostfox.js";
import { Mantis } from "./Entity/Monster/monster_mantis.js";
import { MonsterRecord } from "./Entity/Monster/monster_record.js";
import { Skeleton } from "./Entity/Monster/monster_skeleton.js";
import { StoneMan } from "./Entity/Monster/monster_stoneman.js";
import { Zombie } from "./Entity/Monster/monster_zombie.js";
import { Tile } from "./Entity/tile.js";
import { ArrowTurret } from "./Entity/Turret/turret_arrow.js";
import { EnergyTurret } from "./Entity/Turret/turret_energy.js";
import { FireTurret } from "./Entity/Turret/turret_fire.js";
import { IceTurret } from "./Entity/Turret/turret_ice.js";
import { LightningTurret } from "./Entity/Turret/turret_lightning.js";
import { PoisonTurret } from "./Entity/Turret/turret_poison.js";

//Tạo khung map
export function SetupTile() {
    let SizeMap = SizeTile * RadTile;
    let BasicMargin = (CanvasHeight - SizeMap) / 2;
    let MapZone = new Tile(SizeMap, BasicMargin, BasicMargin);

    SizeMap = BasicMargin = null;

    return MapZone;
}

//Tạo khung trụ
export function SetupTurret() {
    let TurretWidth = RadTile * ColumnTurret;
    let BasicMargin = (CanvasHeight - (SizeTile * RadTile)) / 2;
    let TurretX = CanvasWidth - BasicMargin - TurretWidth;
    let TurretZone = new Tile(TurretWidth, TurretX, BasicMargin, "none");
    TurretZone.Resize(TurretWidth, RadTile * RowTurret);

    TurretWidth = BasicMargin = TurretX = null;

    return TurretZone;
}

//Tạo danh sách trụ
export function SetTypeTurret(number, x, y) {
    switch(number) {
        case 0:
            return new ArrowTurret(RadTile_Circle, x, y, ColorTurret[number], DataTurret[number]);
        case 1:
            return new LightningTurret(RadTile_Circle, x, y, ColorTurret[number], DataTurret[number]);
        case 2:
            return new PoisonTurret(RadTile_Circle, x, y, ColorTurret[number], DataTurret[number]);
        case 3:
            return new FireTurret(RadTile_Circle, x, y, ColorTurret[number], DataTurret[number]);
        case 4:
            return new IceTurret(RadTile_Circle, x, y, ColorTurret[number], DataTurret[number]);
        case 5:
            return new EnergyTurret(RadTile_Circle, x, y, ColorTurret[number], DataTurret[number]);
    }
}

//Tạo danh sách quái
export function SetTypeMonster(number, x = 0, y = 0) {
    switch(number) {
        case 0:
            return new Mantis(RadMonster, x, y, ColorMonster[number], DataMonster[number]);
        case 1:
            return new StoneMan(RadMonster, x, y, ColorMonster[number], DataMonster[number]);
        case 2:
            return new Zombie(RadMonster, x, y, ColorMonster[number], DataMonster[number]);
        case 3:
            return new Skeleton(RadMonster, x, y, ColorMonster[number], DataMonster[number]);
        case 4:
            return new DemonSlug(RadMonster, x, y, ColorMonster[number], DataMonster[number]);
        case 5:
            return new DemonBat(RadMonster, x, y, ColorMonster[number], DataMonster[number]);
        case 6:
            return new CrazyBuffalo(RadMonster, x, y, ColorMonster[number], DataMonster[number]);
        case 7:
            return new GhostFox(RadMonster, x, y, ColorMonster[number], DataMonster[number]);
        case 8:
            return new CrystalDragon(RadMonster, x, y, ColorMonster[number], DataMonster[number]);
    }
}

export function ChangeArray(OldArray) {
    let NewArray = [];
    let n = OldArray.length;
    for (let i = 0; i < n; i++) {
        if (OldArray[i] != null) {
            NewArray.push(OldArray[i]);
        }
    }
    n = null;
    return NewArray;
}

//Tạo danh sách lượt quái
export function SetTurnMonster(Record) {
    let ArrayList = [];
    //ArrayList.push(8);
    for (let i = 0; i < BasicTurnMonster; i++) {
        ArrayList.push(i);
        Record[i].Count = BasicCoolDownMonster;
    }
    return ArrayList;
}

//Danh sách lượt quái
export function AltTurnMonster(List, Record, Turn) {
    Record[List[0]].Count--;
    for (let i = 0; i < SizeMonster; i++) {
        if (Record[i].Count == 0 || Record[i].Count == BasicCoolDownMonster) { continue; }
        if (i == List[0]) { continue; }
        Record[i].Count--;
    }
    List.shift();

    let altNumber = () => {
        while(true) {
            let rd = Math.floor(Math.random() * 9)
            if (Record[rd].Count != 0) {
                rd = null;
                continue;
            }
            return rd;
        }
    }

    let n = altNumber();
    List.push(n);
    Record[n].Count = BasicCoolDownMonster;
    Record[n].Form = 0;

    let temp = Turn.toString().split("");
    if (parseInt(temp[temp.length - 1]) % 10 == 0) {
        Record[n].Form = 1;
    }

    n = temp = altNumber = null;
}

//Ghi nhận map
export function RecordTile() {
    let ArrayList = [];
    let SizeMap = SizeTile * RadTile;
    let BasicMargin = (CanvasHeight - SizeMap) / 2;
    for (let i = 0; i < SizeTile; i++) {
        for (let j = 0; j < SizeTile; j++) {
            ArrayList.push(new Tile(RadTile, BasicMargin + RadTile * i, BasicMargin + RadTile * j, ColorTile));
        }
    }

    SizeMap = BasicMargin = null;

    return ArrayList;
}

//Ghi nhận trụ
export function RecordTurret(Layout) {
    let ArrayList = [];
    let count = 0;
    for (let i = 0; i < ColumnTurret; i++) {
        for (let j = 0; j < RowTurret; j++) {
            let Number = i * 2 + j + count;
            ArrayList.push(SetTypeTurret(
                Number,
                Layout[1].X + RadTile * i + RadTile_Circle,
                Layout[1].Y + RadTile * j + RadTile_Circle
            ));
            ArrayList[ArrayList.length - 1].DesEffect = DataTurret[Number].DesEffect;
            ArrayList[ArrayList.length - 1].Description = DataTurret[Number].Description;

            Number = null;
        }
        count++;
    }

    count = null;

    return ArrayList;
}

//Ghi nhận trụ trên sân
export function RecordTurretArea() {
    let ArrayList = [];
    for (let i = 0; i < SizeTile_All; i++) {
        ArrayList.push(null);
    }
    return ArrayList;
}

//Ghi nhận record quái
export function RecordMonster() {
    let ArrayList = [];
    for (let i = 0; i < SizeMonster; i++) {
        ArrayList.push(new MonsterRecord(i, AmountMonster[i]));
    }
    return ArrayList;
}

//Ghi nhận quái trên sân
export function RecordMonsterArea() {
    let ArrayList = [];
    for (let i = 0; i < SizeMonster; i++) {
        ArrayList.push(null);
    }
    return ArrayList;
}

//Đưa quái vào danh sách trận
export function PrepareMonster(Area, Amount, Form, Id, Layout, ResultPath, Turn) {
    Area[Id] = [];
    for (let i = 0; i < Amount; i++) {
        let reverse = Amount - i - 1;
        let extra = RadTile * (Math.sqrt(2) - 1) + RadMonster * 0.75 / 2;
        let x = Layout.X - extra * reverse * ScaleMonster[Id] + RadTile_Circle - RadTile_Circle * ScaleMonster[Id];
        let y = Layout.Y - extra * reverse * ScaleMonster[Id] - (RadMonster * 2 * i) + (RadMonster * 2 * i) * ScaleMonster[Id];
        Area[Id].push(SetTypeMonster(Id, x, y));
        Area[Id][i].Nothing(ResultPath);
        Area[Id][i].ScaleHP(Turn);
        Area[Id][i].Form = Form;

        x = y = extra = reverse = null;
    }
}

//Kiểm tra list quái
export function CheckMonter(Monster, Layout, TileList, ResultPath, Context, Basic) {
    let n = Monster.length;
    for (let i = 0; i < n; i++) {
        if (Monster[i] == null) { continue; }
        Monster[i] = TestMonster(Monster[i], Layout, ResultPath, TileList, i, Monster, Context, Basic);
    }
    
    n = null;
}

//Kiểm tra loại list quái
export function TestMonster(Monster, Layout, ResultPath, TileList, Order, AllMonster, Context, Basic) {
    let n = Monster.length;

    for (let i = 0; i < n; i++) {
        if (Monster[i] == null) { continue; }

        Monster[i].Moving(ResultPath, Layout, TileList);
        Monster[i].IsShot(Context);
        Monster[i].TimeEffect(Order);
        Monster[i].Spreading(AllMonster, Order, i);
        Monster[i] = Monster[i].Death(Layout, TileList, Basic);
    }

    let check = false;
    for (let i = 0; i < n; i++) {
        if (Monster[i] == null) { continue; }
        check = true;
    }
    if (!check) { return null; }

    check = null;
    return Monster;
}

//Kiểm tra quái vật trong vùng click chuột
export function ScanMonster(Monster, x, y) {
    let n = Monster.length;
        for (let i = 0; i < n; i++) {
            if (Monster[i] == null) { continue; }
            let m = Monster[i].length;
            for (let j = 0; j < m; j++) {
                if (Monster[i][j] == null) { continue; }
                if (Monster[i][j].IsCircle(x, y)) { return Monster[i][j]; }
            }
            m = null;
        }
    n = null;
    return null;
}

//Kiểm tra đặt trụ vào quái
export function AbleMonster(Monster, Tile) {
    let n = Monster.length;
        for (let i = 0; i < n; i++) {
            if (Monster[i] == null) { continue; }
            let m = Monster[i].length;
            for (let j = 0; j < m; j++) {
                if (Monster[i][j] == null) { continue; }
                if (Monster[i][j].IsPlaced(Tile)) { return false; }
            }
            m = null;
        }
    n = null;
    return true;
}

//Thay đổi đường đi khi đặt trụ
export function AltPathMonster(Monster, ResultPath, TileList, MapPath, Layout) {
    let n = Monster.length;
        for (let i = 0; i < n; i++) {
            if (Monster[i] == null) { continue; }
            let m = Monster[i].length;
            for (let j = 0; j < m; j++) {
                if (Monster[i][j] == null) { continue; }
                Monster[i][j].Pathing(ResultPath, TileList, MapPath, Layout);
            }
            m = null;
        }
    n = null;
}

//Trụ bắn quái
export function ShootMonster(Turret, Monster, BeginPath, TileList) {
    //Buff trụ năng lượng
    let k = Turret.length;
    for (let i = 0; i < k; i++) {
        if (Turret[i] == null) { continue; }
        if (Turret[i].Id != 5) { continue; }
        Turret[i].Energetic(i, Turret, PowerUp);
    }

    //Chạy list trụ
    for (let v = 0 ; v < k; v++) {
        if (Turret[v] == null) { continue; }
        if (Turret[v].Id == 5) { continue; }

        //Cộng stat nếu có
        Turret[v].IsExtra();
        //Chạy list loại quái
        let n = Monster.length;
        for (let i = 0; i < n; i++) {
            if (Monster[i] == null) { continue; }

            //Chạy list của list loại quái
            for (let j = Monster[i].length; j >= 0; j--) {
                if (Monster[i][j] == null) { continue; }
                //Kiểm tra nếu nó chưa qua cửa đi
                if (Monster[i][j].Y < TileList[BeginPath].Y) { continue; }

                //Kiểm tra nếu sát thương tác động vào được
                if (Monster[i][j].Damaged[Turret[v].Id] != null) {
                    //Kiểm tra nếu quái trong tầm trụ
                    if (Turret[v].IsCircle(Monster[i][j].X, Monster[i][j].Y, Turret[v].ShootRange())) {
                        Turret[v].NewTarget(i, j, true, Monster[i][j]);
                        continue;
                    }
                    Turret[v].NewTarget(i, j, false, Monster[i][j]);
                }
            }
        }
        Turret[v].ExStorage.length = 0;
        Turret[v].OldTarget(Monster);

        n = null;
    }

    k = null;
}

//Kiểm tra bắn lan
export function SpreadMonster(Spreader, Monster, Range, ExID, ExEffect, ExPower, Type, Order) {
    let n = Monster.length;
    for (let i = 0; i < n; i++) {
        if (Monster[i] == null) { continue; }

        let m = Monster[i].length;
        for (let j = 0; j < m; j++) {
            if (Monster[i][j] == null) { continue; }

            if (i == Type && Order == j) { continue; }

            if (Spreader.Type != Monster[i][j].Type) { continue; }

            if (!Spreader.IsRangeSpread(Monster[i][j].X, Monster[i][j].Y, Range)) { continue; }

            if (Monster[i][j].Damaged[ExID] != null) {
                Monster[i][j].HP -= ExPower * Monster[i][j].Damaged[ExID] / 100;
                Monster[i][j].IsEffect(ExID, ExEffect);
                Monster[i][j].TimeEffect(i);
            }
        }

        m = null;
    }

    n = null;
}

//Trụ tăng sức mạnh tăng cho trụ
export function PowerUp(Power, Speed, List, Turret) {
    let n = List.length;
    for (let i = 0; i < n; i++) {
        let Select = Turret[List[i]];
        Select.ExStorage.push([
            Select.Power * Power / 100,
            Select.Speed * Speed / 100
        ]);
        Select = null;
    }
}

//Mở bảng phụ của trụ
export function AddFunction(Turret) {
    return [
        new Tile(RadTile_Circle, Turret.X + RadTile_Circle, Turret.Y - RadTile_Circle, ColorReup[0]),
        new Tile(RadTile_Circle, Turret.X + RadTile_Circle, Turret.Y, ColorReup[1])
    ]
}

//Kiểm tra đã dính bảng phụ
export function IfAddFunction(TurretFunction, x, y) {
    if (TurretFunction.length == 0) { return true; }
    if (TurretFunction[0].IsTileExact(x, y) || TurretFunction[1].IsTileExact(x, y)) { return false; }
    return true;
}

//Nâng cấp trụ
export function UpgradeTurret(Turret, ID) {
    if (Turret[ID].Level == 5) { return; }
    Turret[ID].Upgraded();
}

//Hủy diệt trụ
export function RemoveTurret(Turret, ID, Basic) {
    Basic.Money += Turret[ID].Sell;
    Turret[ID] = null;
}

//Xóa canvas
export function DrawClear(GamePlay, Layout) {
    GamePlay.ClearGameArea(Layout.X, Layout.Y, Layout.Width, Layout.Height);
}

//Vẽ map
export function DrawTile(List, Context) {
    for (let i = 0; i < SizeTile_All; i++) {
        List[i].DrawObject(Context);
    }
}

//Vẽ trụ
export function DrawTurret(List, Context) {
    for (let i = 0; i < SizeTurret; i++) {
        List[i].DrawObject(Context);
    }
}

//Vẽ trụ cầm
export function DrawHoldTurret(Hold, Context) {
    Hold.DrawObject(Context, OpacityTurret);
}

//Vẽ trụ trên sân
export function DrawTurretArea(List, Context) {
    for (let i = 0; i < SizeTile_All; i++) {
        if (List[i] == null) { continue; }
        List[i].DrawObject(Context);
    }
}

//Vẽ quái trên sân
export function DrawMonsterArea(List, Context) {
    let n = List.length;
    for (let i = 0; i < n; i++) {
        if (List[i] == null) { continue; }

        let m = List[i].length;
        for (let j = 0; j < m; j++) {
            if(List[i][j] == null) { continue; }
            List[i][j].DrawObject(Context);
        }
    }
}

//Cập nhật xóa - vẽ map - vẽ trụ trên sân
export function UpdateArea(GamePlay, Layout, List, Mouse) {
    let ctx = GamePlay.Context;
    DrawClear(GamePlay, { X: 0, Y: 0, Width: Layout.Width + (CanvasHeight - Layout.Height) + parseInt(ObjectBorder_Width), Height: CanvasHeight});
    DrawTile(List[0], ctx);
    DrawTurretArea(List[1], ctx);
    DrawMonsterArea(List[3], ctx);

    if (Mouse[0].Id != -1) { DrawHoldTurret(Mouse[0], ctx); }
    if (List[2].length != 0) {
        List[2][0].DrawObject(ctx);
        List[2][1].DrawObject(ctx);
    }
    if (Mouse[1] != null) { Mouse[1].DrawObject(ctx, 0.2); }

    ctx = null;
}
