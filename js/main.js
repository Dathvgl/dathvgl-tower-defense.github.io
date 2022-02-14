"use strict";

import { Basic as Base } from "./basic.js";
import { Canvas } from "./canvas.js";
import { CanvasHeight, CanvasWidth, ObjectBorder_Width, RadMonster, RadTile, RadTile_Circle, RowTurret, SizeTile } from "./const_value.js";
import { AbleMonster, AddFunction, AltPathMonster, AltTurnMonster, CheckMonter, DrawClear, DrawTile, DrawTurret, IfAddFunction, PrepareMonster, RecordMonster, RecordMonsterArea, RecordTile, RecordTurret, RecordTurretArea, RemoveTurret, ScanMonster, SetTurnMonster, SetTypeTurret, SetupTile, SetupTurret, ShootMonster, UpdateArea, UpgradeTurret } from "./function.js";
import { MouseDown as Down } from "./Mouse/mouse_down.js";
import { MouseMove as Move } from "./Mouse/mouse_move.js";
import { PathWay } from "./path_way.js";
import { Text as Texture } from "./text.js";

window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
}, true);

let GamePlay = new Canvas();
document.body.appendChild(GamePlay.SetupCanvas());

let MouseDown = new Down();
let MouseMove = new Move();
let Basic = new Base();
let Text = new Texture();

function PlaceTurret(e) {
    let x = e.layerX;
    let y = e.layerY;

    if (!Layout[0].IsTile(x, y)) { return; }

    let ID = Layout[0].ObjectPosition(x, y, SizeTile);
    MouseMove.State.X = TileList[ID].X + RadTile_Circle;
    MouseMove.State.Y = TileList[ID].Y + RadTile_Circle;

    x = y = ID = null;
}

function AltClick(e) {
    if (e.key != "ContextMenu") { return; }

    MouseDown.State = "";
    MouseMove.ReturnBasic();

    TurretFunction.length = 0;

    document.body.removeEventListener("keydown", AltClick, false);
    canvas.removeEventListener("mousemove", PlaceTurret, false);
}

function ControlClick (e) {
    let x = e.layerX;
    let y = e.layerY;

    if (Layout[1].IsTile(x, y)) {
        //Kiểm tra nhấp khu danh sách trụ
        let ID = Layout[1].ObjectPosition(x, y, RowTurret);
        if (TurretList[ID].IsCircle(x, y)) {
            MouseDown.State = "hold";
            MouseMove.State.Id = ID;
            MouseMove.State.Src = TurretList[ID].Src;

            TurretFunction.length = 0;

            Text.ClearHintTurret(GamePlay, BaseTextX, Layout[1].Height + RadTile);
            Text.HintedTurret = TurretList[ID];
            Text.DrawHintTurret(GamePlay.Context, BaseTextX, Layout[1].Height + RadTile);
            
            canvas.addEventListener("mousemove", PlaceTurret, false);
            document.body.addEventListener("keydown", AltClick, false);
        }

        x = y = ID = null;
        return;
    }

    if (Layout[0].IsTile(x, y)) {
        //Kiểm tra nhấp đặt trụ
        let ID = Layout[0].ObjectPosition(x, y, SizeTile);
        if (    MouseDown.State == "hold" &&
                TurretArea[ID] == null &&
                Path.OnlyPlacingTurret(ID, SizeTile) &&
                Basic.EnoughMoney(TurretList, MouseMove.State.Id) &&
                AbleMonster(MonsterArea, TileList[ID])
            ) {
            TurretArea[ID] = SetTypeTurret(
                MouseMove.State.Id,
                TileList[ID].X + RadTile_Circle,
                TileList[ID].Y + RadTile_Circle
            );

            Basic.Money -= TurretArea[ID].Buy;

            Path.FixPath(ID);
            AltPathMonster(MonsterArea, Path.ResultPath, TileList, Path.MapPath, Layout[0]);
            x = y = ID = null;
            return;
        }

        //Kiểm tra nhấp quái
        let TestMonter = ScanMonster(MonsterArea, x, y);
        if (TestMonter != null) {
            Text.ClearTextBottom(GamePlay, BaseTextX, BaseTextY);
            Text.Monster = TestMonter;
            Text.DrawTextMonster(GamePlay.Context, BaseTextX, Layout[0].Height);

            x = y = ID = null;
            TestMonter = null;
            TurretFunction.length = 0;
            return;
        }

        //Kiểm tra nhấp trụ
        if ((MouseDown.State == "" || MouseDown.State == "reup") && TurretArea[ID] != null && IfAddFunction(TurretFunction, x, y)) {
            MouseDown.State = "reup";
            MouseDown.SetRangeShot(TurretArea[ID].ShootRange(), TurretArea[ID].X, TurretArea[ID].Y)

            TurretFunction = AddFunction(TurretArea[ID]);

            Text.ClearTextBottom(GamePlay, BaseTextX, BaseTextY);
            Text.Turret = TurretArea[ID];
            Text.DrawTextTurret(GamePlay.Context, BaseTextX, Layout[0].Height);

            x = y = ID = null;
            return;
        }

        //Kiểm tra nhấp chức năng trụ
        if (!IfAddFunction(TurretFunction, x, y)) {
            ID = Layout[0].ObjectPosition(x - RadTile, y, SizeTile);
            if (TurretFunction[0].IsTile(x, y) && Basic.UpgradeMoney(TurretArea, ID)) {
                UpgradeTurret(TurretArea, ID);
            }

            if (TurretFunction[1].IsTile(x, y)) {
                RemoveTurret(TurretArea, ID, Basic);
                Path.FixPath(ID, false);
                AltPathMonster(MonsterArea, Path.ResultPath, TileList, Path.MapPath, Layout[0]);
            }
        }

        TurretFunction.length = 0;
        ID = null;
    }

    //Kiểm tra nhấp chức năng trụ ngoài lề khu chính
    if (!IfAddFunction(TurretFunction, x, y)) {
        let ID = Layout[0].ObjectPosition(x - RadTile, y, SizeTile);
        if (TurretFunction[0].IsTile(x, y) && Basic.UpgradeMoney(TurretArea, ID)) {
            UpgradeTurret(TurretArea, ID);
        }

        if (TurretFunction[1].IsTile(x, y)) {
            RemoveTurret(TurretArea, ID, Basic);
            Path.FixPath(ID, false);
            AltPathMonster(MonsterArea, Path.ResultPath, TileList, Path.MapPath, Layout[0]);
        }

        TurretFunction.length = 0;
        ID = null;
    }

    x = y = null;
    MouseDown.CancelRangeShot();
    Text.ClearHintTurret(GamePlay, BaseTextX, Layout[1].Height + RadTile);
    Text.ClearTextBottom(GamePlay, BaseTextX, BaseTextY);

}

let canvas = document.getElementsByTagName("canvas")[0];
canvas.addEventListener("mousedown", ControlClick, false);

let Layout = [];
Layout.push(SetupTile());
Layout.push(SetupTurret());

let BaseTextX = Layout[0].Width + (CanvasHeight - Layout[0].Height) + parseInt(ObjectBorder_Width);
let BaseTextY = Layout[0].Height - RadTile * 4;

let TileList = RecordTile();
let TurretList = RecordTurret(Layout);
let TurretArea = RecordTurretArea();
let TurretFunction = [];
let MonsterRecord = RecordMonster();
let MonsterArea = RecordMonsterArea();
let MonsterTurn = SetTurnMonster(MonsterRecord);

DrawTile(TileList, GamePlay.Context);
DrawTurret(TurretList, GamePlay.Context);

let Path = new PathWay();

/*let Position = MonsterTurn[0];
PrepareMonster(MonsterArea, MonsterRecord[Position].Amount, MonsterRecord[Position].Form, Position, Layout[0], Path.ResultPath, Basic.Turn);
Position = null;*/

GamePlay.SetGameArea(() => {
    if (Basic.Time == 0) {
        Basic.TimeReset();
        Basic.Turn++;

        let Position = MonsterTurn[0];
        AltTurnMonster(MonsterTurn, MonsterRecord, Basic.Turn + 4);
        PrepareMonster(MonsterArea, MonsterRecord[Position].Amount, MonsterRecord[Position].Form, Position, Layout[0], Path.ResultPath, Basic.Turn);
        Position = null;
    }

    Basic.Time -= 50;
    Text.Basic = null;
    Text.Basic = Basic;

    DrawClear(GamePlay, { X: BaseTextX, Y: Layout[0].Y, Width: Layout[1].X - BaseTextX - parseInt(ObjectBorder_Width), Height: Layout[1].Height - (CanvasWidth - Layout[1].Width)});
    Text.DrawTextBasic(GamePlay.Context, BaseTextX, Layout[0].Y);

    UpdateArea(GamePlay, Layout[0],
        [TileList, TurretArea, TurretFunction, MonsterArea],
        [MouseMove.State, MouseDown.RangeShot]
    );
    CheckMonter(MonsterArea, Layout[0], TileList, Path.ResultPath, GamePlay.Context, Basic);
    ShootMonster(TurretArea, MonsterArea, Path.ResultPath[0] - 1, TileList);

    if (Text.Monster != null) {
        DrawClear(GamePlay, { X: BaseTextX, Y: BaseTextY, Width: CanvasWidth - BaseTextX, Height: CanvasHeight - BaseTextY});
        Text.DrawTextMonster(GamePlay.Context, BaseTextX, Layout[0].Height);
    }

    if (Basic.Life <= 0) {
        canvas.removeEventListener("mousedown", ControlClick, false);
        GamePlay.StopGameArea();

        GamePlay = MouseDown = MouseMove = Basic = Text = canvas = BaseTextX = BaseTextY = Path = null;

        Layout.length = TileList.length = TurretList.length = TurretArea.length = TurretFunction.length = MonsterRecord.length = MonsterArea.length = MonsterTurn.length = 0;
        Layout = TileList = TurretList = TurretArea = TurretFunction = MonsterRecord = MonsterArea = MonsterTurn = null;
    }
}, 50);
