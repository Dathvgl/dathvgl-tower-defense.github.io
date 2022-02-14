"use strict";

import { SizeTile } from "./const_value.js";

const MapPathVertices = [
    "225",
    "2 16",
    "1 3 17",
    "2 4 18",
    "3 5 19",
    "4 6 20",
    "5 7 21",
    "6 8 22",
    "7 9 23",
    "8 10 24",
    "9 11 25",
    "10 12 26",
    "11 13 27",
    "12 14 28",
    "13 15 29",
    "14 30",
    "1 17 31",
    "2 16 18 32",
    "3 17 19 33",
    "4 18 20 34",
    "5 19 21 35",
    "6 20 22 36",
    "7 21 23 37",
    "8 22 24 38",
    "9 23 25 39",
    "10 24 26 40",
    "11 25 27 41",
    "12 26 28 42",
    "13 27 29 43",
    "14 28 30 44",
    "15 29 45",
    "16 32 46",
    "17 31 33 47",
    "18 32 34 48",
    "19 33 35 49",
    "20 34 36 50",
    "21 35 37 51",
    "22 36 38 52",
    "23 37 39 53",
    "24 38 40 54",
    "25 39 41 55",
    "26 40 42 56",
    "27 41 43 57",
    "28 42 44 58",
    "29 43 45 59",
    "30 44 60",
    "31 47 61",
    "32 46 48 62",
    "33 47 49 63",
    "34 48 50 64",
    "35 49 51 65",
    "36 50 52 66",
    "37 51 53 67",
    "38 52 54 68",
    "39 53 55 69",
    "40 54 56 70",
    "41 55 57 71",
    "42 56 58 72",
    "43 57 59 73",
    "44 58 60 74",
    "45 59 75",
    "46 62 76",
    "47 61 63 77",
    "48 62 64 78",
    "49 63 65 79",
    "50 64 66 80",
    "51 65 67 81",
    "52 66 68 82",
    "53 67 69 83",
    "54 68 70 84",
    "55 69 71 85",
    "56 70 72 86",
    "57 71 73 87",
    "58 72 74 88",
    "59 73 75 89",
    "60 74 90",
    "61 77 91",
    "62 76 78 92",
    "63 77 79 93",
    "64 78 80 94",
    "65 79 81 95",
    "66 80 82 96",
    "67 81 83 97",
    "68 82 84 98",
    "69 83 85 99",
    "70 84 86 100",
    "71 85 87 101",
    "72 86 88 102",
    "73 87 89 103",
    "74 88 90 104",
    "75 89 105",
    "76 92 106",
    "77 91 93 107",
    "78 92 94 108",
    "79 93 95 109",
    "80 94 96 110",
    "81 95 97 111",
    "82 96 98 112",
    "83 97 99 113",
    "84 98 100 114",
    "85 99 101 115",
    "86 100 102 116",
    "87 101 103 117",
    "88 102 104 118",
    "89 103 105 119",
    "90 104 120",
    "91 107 121",
    "92 106 108 122",
    "93 107 109 123",
    "94 108 110 124",
    "95 109 111 125",
    "96 110 112 126",
    "97 111 113 127",
    "98 112 114 128",
    "99 113 115 129",
    "100 114 116 130",
    "101 115 117 131",
    "102 116 118 132",
    "103 117 119 133",
    "104 118 120 134",
    "105 119 135",
    "106 122 136",
    "107 121 123 137",
    "108 122 124 138",
    "109 123 125 139",
    "110 124 126 140",
    "111 125 127 141",
    "112 126 128 142",
    "113 127 129 143",
    "114 128 130 144",
    "115 129 131 145",
    "116 130 132 146",
    "117 131 133 147",
    "118 132 134 148",
    "119 133 135 149",
    "120 134 150",
    "121 137 151",
    "122 136 138 152",
    "123 137 139 153",
    "124 138 140 154",
    "125 139 141 155",
    "126 140 142 156",
    "127 141 143 157",
    "128 142 144 158",
    "129 143 145 159",
    "130 144 146 160",
    "131 145 147 161",
    "132 146 148 162",
    "133 147 149 163",
    "134 148 150 164",
    "135 149 165",
    "136 152 166",
    "137 151 153 167",
    "138 152 154 168",
    "139 153 155 169",
    "140 154 156 170",
    "141 155 157 171",
    "142 156 158 172",
    "143 157 159 173",
    "144 158 160 174",
    "145 159 161 175",
    "146 160 162 176",
    "147 161 163 177",
    "148 162 164 178",
    "149 163 165 179",
    "150 164 180",
    "151 167 181",
    "152 166 168 182",
    "153 167 169 183",
    "154 168 170 184",
    "155 169 171 185",
    "156 170 172 186",
    "157 171 173 187",
    "158 172 174 188",
    "159 173 175 189",
    "160 174 176 190",
    "161 175 177 191",
    "162 176 178 192",
    "163 177 179 193",
    "164 178 180 194",
    "165 179 195",
    "166 182 196",
    "167 181 183 197",
    "168 182 184 198",
    "169 183 185 199",
    "170 184 186 200",
    "171 185 187 201",
    "172 186 188 202",
    "173 187 189 203",
    "174 188 190 204",
    "175 189 191 205",
    "176 190 192 206",
    "177 191 193 207",
    "178 192 194 208",
    "179 193 195 209",
    "180 194 210",
    "181 197 211",
    "182 196 198 212",
    "183 197 199 213",
    "184 198 200 214",
    "185 199 201 215",
    "186 200 202 216",
    "187 201 203 217",
    "188 202 204 218",
    "189 203 205 219",
    "190 204 206 220",
    "191 205 207 221",
    "192 206 208 222",
    "193 207 209 223",
    "194 208 210 224",
    "195 209 225",
    "196 212",
    "197 211 213",
    "198 212 214",
    "199 213 215",
    "200 214 216",
    "201 215 217",
    "202 216 218",
    "203 217 219",
    "204 218 220",
    "205 219 221",
    "206 220 222",
    "207 221 223",
    "208 222 224",
    "209 223 225",
    "210 224",
];

export class PathWay {

    #start;
    #end
    #numVertices;
    #mapPath = [];
    #previous = [];
    #resultPath = [];

    constructor() {
        this.#start = 0;
        this.#end = SizeTile * SizeTile - 1 - SizeTile;
        this.#numVertices = SizeTile * SizeTile;
        this.ReadMap();
        this.ChangeMap();
    }

    get MapPath() { return this.#mapPath; }
    //set MapPath(value) { this.#mapPath = value; }

    get ResultPath() { return this.#resultPath; }
    //set ResultPath(value) { this.#resultPath = value; }

    ReadMap() {
        for (let i = 1; i < MapPathVertices.length; i++) {
            let row = MapPathVertices[i].split(' ');
            for (let j = 0; j < row.length; j++) {
                row[j] = Number(row[j].trim()) - 1;
            }
            this.#mapPath[i - 1] = { Override: false, Edges: row };
            row = null;
        }
    }

    ChangeMap() {
        this.BFSVisited(this.#start);

        this.#resultPath.length = 0;
        this.#resultPath = this.FindEdges(this.#end);
    }

    BFSVisited(begining) {
        this.#previous.length = 0;
        let Processed = [];
        let Distance = [];
        let Vertices = [];

        for (let i = 0; i < this.#numVertices; i++) {
            this.#previous[i] = -1;
            Processed[i] = false;
            Distance[i] = 0;
        }

        //console.log(Distance);
        let Queue = [];
        Queue.push(begining);
        Processed[begining] = true;
        Vertices.push(begining);
        while (Queue.length != 0) {
            let u = Queue.shift();
            let n = this.#mapPath[u].Edges.length;
            for (let v = 0; v < n; v++) {
                if (Processed[this.#mapPath[u].Edges[v]]) { continue; }
                if (this.#mapPath[this.#mapPath[u].Edges[v]].Override) { continue; }

                Processed[this.#mapPath[u].Edges[v]] = true;
                Queue.push(this.#mapPath[u].Edges[v]);

                this.#previous[this.#mapPath[u].Edges[v]] = u;
                Distance[this.#mapPath[u].Edges[v]] = Distance[u] + 1;
                Vertices.push(this.#mapPath[u].Edges[v]);
            }

            u = n = null;
        }
        //console.log(Distance[1]);

        Processed.length = Distance.length = Vertices.length = 0;
        Queue = Processed = Distance = Vertices = null;
    }

    FindEdges(ending) {
        let ArrayList = [];
        //console.log(this.#previous);
        for (let i = ending; i != -1; i = this.#previous[i]) {
            ArrayList.unshift(i + 1);
        }
        return ArrayList;
    }

    TempPath(MapPath) {
        this.#mapPath = new Array(...MapPath);
    }

    FixPath(ID, Check = true) {
        this.#mapPath[ID].Override = Check;
        this.ChangeMap();

        if (this.#end == 224) { return; }

        let ArrayList = this.FindEdges(224);
        if (this.#resultPath.length <= ArrayList.length) {
            ArrayList.length = 0;
            ArrayList = null;
            return;
        }

        this.#resultPath.length = 0;
        this.#resultPath = new Array(...ArrayList);

        ArrayList.length = 0;
        ArrayList = null;
    }

    OnlyPlacingTurret(ID, Extra) {
        if (this.OnlyStartVertice(ID, Extra)) { return true; }
        if (this.OnlyEndVertice(ID, Extra)) { return true; }
        if (ID == 0 || ID == 15 || ID == 209 || ID == 224) { return false; }
        if (this.OnlyPathingWay(ID)) { return false; }
        return true;
    }

    OnlyStartVertice(ID, Extra) {
        if (ID == 0 && !this.#mapPath[this.#start + Extra].Override) {
            this.#start += Extra;
            return true; 
        }
        if (ID == 15 && this.#start != ID) {  return true; }
        return false;
    }

    OnlyEndVertice(ID, Extra) {
        if (ID == 209 && !this.#mapPath[this.#end + Extra].Override) {
            this.#end += Extra;
            return true;
        }
        if (ID == 224 && this.#end != ID) { return true; }
        return false;
    }

    OnlyPathingWay(ID) {
        let keep = new Array(...this.#resultPath);
        this.#mapPath[ID].Override = true;
        this.ChangeMap();
        this.#mapPath[ID].Override = false;
        if (this.#resultPath.length != 1) {
            this.#resultPath.length = 0;
            this.#resultPath = keep;
            keep = null;
            return false;
        }
        this.#resultPath.length = 0;
        this.#resultPath = keep;
        keep = null;
        return true;
    }
}