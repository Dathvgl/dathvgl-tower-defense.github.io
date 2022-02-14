"use strict";

export const CanvasWidth = 1280;
export const CanvasHeight = 800;
export const CanvasBGColor = "#D9D9D9";

export const BaseLife = 10;
export const BaseMoney = 35;
export const BaseTime = 3000;
export const BaseTimeReset = 24000;
export const BaseTurn = 0;

export const ObjectBorder_Width = "2";
export const ObjectBorder_Color = "black";

export const SizeTile = 15;
export const SizeTile_All = SizeTile * SizeTile;
export const ColorTile = "#cc9900";

export const RadTile = 50;
export const RadTile_Circle = RadTile / 2;

export const RadBullet = RadTile_Circle * 0.3;
export const OpacityTurret = 0.6;
export const RowTurret = 3;
export const ColumnTurret = 2;
export const SizeTurret = RowTurret * ColumnTurret;
export const ColorTurret = [ "#99cc00", "#0066ff", "#00ff00", "#ff3300", "#00ffff", "#9933ff" ];
export const ColorReup = [ "green", "red" ];
//Multiple: power - speed - range - sell - upgrade - spread - effect
export const DataTurret = [
    //Multiple: power - speed - range - sell - upgrade - spread (default) - effect (default)
    { Name: "Tháp tên", Power : 10, Speed : 1.5, Range : 1.5, Id: 0,
    Spread : 0, Effect : null, Buy: 5, Sell : 2, Upgrade : 10,
    Multiple: [2.5, 1.05, 1.18, 0.5, 2, 0, 0], DesEffect: "Không có",
    Description: "" },

    //Multiple: power - speed - range - sell - upgrade - spread - effect (default)
    { Name: "Tháp sét", Power : 20, Speed : 5, Range : 2, Id: 1,
    Spread : 1, Effect : null, Buy: 15, Sell : 7, Upgrade : 30,
    Multiple: [2.5, 0.1, 0.25, 0.5, 2, 0.2, 0], DesEffect: "Không có",
    Description: "" },

    //Multiple: power - speed - range - sell - upgrade - spread (default) - effect
    { Name: "Tháp độc", Power : 1, Speed : 1, Range : 1.5, Id: 2,
    Spread : 1, Effect : 5, Buy: 20, Sell : 10, Upgrade : 40,
    Multiple: [1, 0.075, 1.18, 0.5, 2, 1, 1], DesEffect: "Độc gây mất %HP/s",
    Description: "" },

    //Multiple: power - speed (default) - range - sell - upgrade - spread (default) - effect (default)
    { Name: "Tháp lửa", Power : 15, Speed : 0.6, Range : 2, Id: 3,
    Spread : 1, Effect : null, Buy: 10, Sell : 5, Upgrade : 20,
    Multiple: [3, 1, 0.25, 0.5, 2, 1, 0], DesEffect: "Không có",
    Description: "" },

    //Multiple: power - speed - range (default) - sell - upgrade - spread - effect
    { Name: "Tháp băng", Power : 5, Speed : 2, Range : 1.5, Id: 4,
    Spread : 1, Effect : 5, Buy: 20, Sell : 10, Upgrade : 40,
    Multiple: [2, 0.25, 1, 0.5, 2, 0.25, 1], DesEffect: "Băng làm chậm %Speed",
    Description: "" },

    //Multiple: power - speed - range (default) - sell - upgrade - spread (default) - effect (default)
    { Name: "Tháp năng lượng", Power : 10, Speed : 10, Range : 1.5, Id: 5,
    Spread : 0, Effect : null, Buy: 30, Sell : 15, Upgrade : 60,
    Multiple: [0.5, 0.5, 1, 0.5, 2, 0, 0], DesEffect: "Tăng chỉ số",
    Description: "" }
];

export const RadMonster = RadTile_Circle * 0.8;
export const SizeMonster = 9;
export const BasicTurnMonster = 4;
export const BasicCoolDownMonster = 5;
export const ScaleMonster = [ 0, 0, 0, 0, 0, 1, 0, 0, 1 ]
export const AmountMonster = [ [10, 3], [2, 1], [7, 3], [20, 3], [5, 1], [5, 2], [3, 2], [5, 1], [5, 1] ];
export const ColorMonster = [ "lime", "yellow", "indigo", "violet", "aqua", "blue", "red", "orange", "green" ];
export const DataMonster = [
    { Name: "Bọ ngựa", Speed: [2, 2], HP: [11, 0.18], Gold: [3, 18], Damaged: [110, null, 100, 107, 100, null] },

    { Name: "Người đá", Speed: [0.4, 0.4], HP: [107, 0.07], Gold: [16, 96], Damaged: [20, null, 100, 80, 20, null] },

    { Name: "Cương thi", Speed: [1.2, 1.2], HP: [12, 0.17], Gold: [5, 30], Damaged: [10, null, 100, 21, 100, null] },

    { Name: "Hài cốt", Speed: [1.5, 1.5], HP: [9, 0.23], Gold: [3, 18], Damaged: [10, null, 100, 109, 5, null] },

    { Name: "Yêu sên", Speed: [0.8, 0.8], HP: [135, 0.03], Gold: [3, 18], Damaged: [100, null, 100, 100, 105, null] },

    { Name: "Yêu dơi", Speed: [2, 2], HP: [15, 0.13], Gold: [4, 24], Damaged: [110, 110, null, null, 20, null] },

    { Name: "Trâu điên", Speed: [2, 2], HP: [85, 0.05], Gold: [6, 36], Damaged: [100, null, 100, 25, 50, null] },

    { Name: "Cáo ma", Speed: [3, 3], HP: [22, 0.09], Gold: [5, 50], Damaged: [100, null, 100, 109, 120, null] },

    { Name: "Rồng tinh", Speed: [1, 1], HP: [20, 0.1], Gold: [5, 30], Damaged: [10, 10, null, null, 40, null] }
];