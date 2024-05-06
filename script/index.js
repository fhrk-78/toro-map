"use strict";
/***************
 * Static Data *
 ***************/
const TRAIN_SPEED = 420; // m/min
//   -------------[WARN]------------
// * xとyは1の位の桁を切り落とす
// * pidは[都市名_駅名]の形を使用する
const pins = [
    { name: "小宮山口駅", x: 544, y: -458, pid: 'komiya_komiyasanguchi' },
    { name: "小宮駅", x: 517, y: -449, pid: "komiya_komiya" },
    { name: "小宮格闘センター前駅", x: 484, y: -433, pid: "komiya_komiyafightingcenter" },
    { name: "小宮南駅", x: 527, y: -430, pid: "komiya_komiyaminami" },
    { name: "小宮村駅", x: 458, y: -449, pid: "komiya_komiyamura" },
    { name: "赤羽駅", x: 435, y: -449, pid: "akabane_akabane" },
    { name: "T村駅", x: 449, y: -410, pid: "tmura_tmura" },
    { name: "北小宮駅", x: 550, y: -478, pid: "komiya_kitakomiya" },
    { name: "北平駅", x: 550, y: -478, pid: "komiya_kitahira" },
];
//   -------------[WARN]------------
// * xとyは1の位の桁を切り落とす
// * lidは[会社名_路線名]の形を使用する
const lines = [
    { name: "小宮電鉄線(テストデータ1)", color: "orange", pid: ["komiya_komiyafightingcenter", "komiya_komiya", "komiya_komiyasanguchi", "komiya_kitakomiya"], lid: "komiya_1" },
    { name: "小宮電鉄線(テストデータ2)", color: "orange", pid: ["komiya_komiyaminami", "komiya_komiya", "komiya_komiyamura", "akabane_akabane", "tmura_tmura"], lid: "komiya_2" },
    { name: "RR秘境線(テストデータ)", color: "yellow", pid: ["komiya_komiyaminami", "komiya_komiyasanguchi", "komiya_kitahira"], lid: "komiya_2" },
];
/***************
 * Main Script *
 ***************/
let LOG = console.log;
let ERROR = console.error;
let tmp_x, tmp_y;
let isMouseDown;
// 優先キュー(要インスタンス化)
class PriorityQueue {
    nodes;
    constructor() {
        this.nodes = [];
    }
    enqueue(data, priority) {
        this.nodes.push({ data, priority });
        this.nodes.sort((a, b) => a.priority - b.priority);
    }
    dequeue() {
        return this.nodes.shift();
    }
    isEmpty() {
        return !this.nodes.length;
    }
}
// Canvas操作ユーティリティ
class CanvasHandler {
    static OFFSET_X = 1000;
    static OFFSET_Y = 1000;
    static local_x = 0;
    static local_y = 0;
    static local_size = 1;
    static cx = (ax) => (CanvasHandler.OFFSET_X + CanvasHandler.local_x + ax) * (CanvasHandler.local_size);
    static cy = (ay) => (CanvasHandler.OFFSET_Y + CanvasHandler.local_y + ay) * (CanvasHandler.local_size);
    static render() {
        LOG('Render Updated');
        CanvasHandler.clear();
        //for (let i = 0; i < pins.length; i++) {
        //    const e = pins[i];
        //}
        for (let j = 0; j < lines.length; j++) {
            let x = [], y = [];
            const e = lines[j];
            for (let k of e.pid) {
                for (let l = 0; l < pins.length; l++) {
                    if (pins[l].pid == k) {
                        x.push(pins[l].x);
                        y.push(pins[l].y);
                    }
                }
            }
            CanvasHandler.lineRender(x, y, e.color, lines[j].bezier);
        }
    }
    static clear() {
        LOG('Canvas Clear');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(230, 230, 230)";
        ctx.fillRect(0, 0, CanvasHandler.OFFSET_X * 2, CanvasHandler.OFFSET_Y * 2);
    }
    static lineRender(x, y, color, bezier) {
        LOG("RenderLine", x, y, color);
        CanvasHandler.strokeWidth(5);
        CanvasHandler.strokeStyle(color);
        ctx.beginPath();
        let isBezier = (bezier != undefined);
        ctx.moveTo(CanvasHandler.cx(x[0]), CanvasHandler.cy(y[0]));
        for (let i = 1; i < x.length; i++) {
            if (isBezier) {
                ctx.quadraticCurveTo(CanvasHandler.cx(bezier[0][i]), CanvasHandler.cy(bezier[1][i]), CanvasHandler.cx(x[i]), CanvasHandler.cy(y[i]));
            }
            else {
                ctx.lineTo(CanvasHandler.cx(x[i]), CanvasHandler.cy(y[i]));
            }
        }
        ctx.stroke();
    }
    static dragstart(e) {
        LOG("Start Drag");
        isMouseDown = true;
        tmp_x = e.offsetX;
        tmp_y = e.offsetY;
    }
    static dragupdate(e) {
        if (isMouseDown) {
            LOG("Update Drag");
            if (tmp_x == undefined || tmp_y == undefined) {
                return;
            }
            let factor = 1 / CanvasHandler.local_size;
            CanvasHandler.local_x += (e.offsetX - tmp_x) * factor;
            CanvasHandler.local_y += (e.offsetY - tmp_y) * factor;
            tmp_x = e.offsetX;
            tmp_y = e.offsetY;
            CanvasHandler.render();
        }
    }
    static dragend(e) {
        LOG("End Drag");
        isMouseDown = false;
    }
    static wheelzoom(e) {
        LOG("Update WheelZoom");
        CanvasHandler.local_size += e.deltaY * -0.001;
        CanvasHandler.render();
    }
    static strokeStyle = (color) => ctx.strokeStyle = color;
    static strokeWidth = (width) => ctx.lineWidth = width;
}
// 経路計算ユーティリティ
class Directions {
    static get(fromid, toid) {
        LOG("Direction GET", fromid, toid);
        /*let {distances, previous} = Directions.dijkstra(Directions.generateNodeGraph(), fromid);
        return {distances: distances, path: Directions.getPath(previous, fromid, toid)};*/
        //return Directions.dijkstra(Directions.generateNodeGraph(), fromid)[toid];
    }
}
// 経路結果コントロール
class DirectionsResult {
    static clear() {
        directionresults.innerHTML = "";
    }
    static add(html) {
        directionresults.insertAdjacentHTML('afterbegin', html);
    }
}
// テンプレート化されたHTMLの生成ユーティリティ
class HTMLBuilder {
    static directionResultCard(icon, hour = null, min, distance, about, returnmethodname, returnmethodparam = "") {
        let i;
        switch (icon) {
            case "train":
                i = "t";
                break;
            case "car":
                i = "c";
                break;
        }
        return `<div class="di_res"><div><div class="i ${i}"></div><div><h3>${hour == null ? "" : `${hour}時間`}${String(min)}分 / ${distance}m</h3><p>${about}</p></div></div><div><a href="javascript:${returnmethodname}(${returnmethodparam});" class="s text">開始</a></div></div>`;
    }
}
let pinlist = document.getElementById('pointList');
let directionresults = document.getElementById('directionresults');
let frompoint = document.getElementById('fromPoint');
let topoint = document.getElementById('toPoint');
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let main = document.getElementById('main');
let directionTab = document.getElementById('directions');
let informationTab = document.getElementById('information');
function resize() {
    LOG('Window Resized');
    canvas.width = CanvasHandler.OFFSET_X * 2;
    canvas.height = CanvasHandler.OFFSET_Y * 2;
    canvas.style.width = String(main.clientWidth) + "px";
    canvas.style.height = String(main.clientHeight) + "px";
    CanvasHandler.render();
}
function init() {
    resize();
    pins.forEach((v, i, a) => {
        pinlist.insertAdjacentHTML('afterbegin', `<option value="${v.name}" id="pin_${v.pid}"></option>`);
    });
    window.onresize = resize;
    canvas.addEventListener('mousedown', CanvasHandler.dragstart);
    canvas.addEventListener('mousemove', CanvasHandler.dragupdate);
    canvas.addEventListener('mouseup', CanvasHandler.dragend);
    canvas.addEventListener('wheel', CanvasHandler.wheelzoom);
}
init();
/*************
 * HTML Call *
 *************/
function reverseft() {
    let f = frompoint.value;
    let t = topoint.value;
    frompoint.value = t;
    topoint.value = f;
}
function outputresult() {
    if (frompoint.value == "" || topoint.value == "") {
        return;
    }
    let f, t;
    for (let i = 0; i < pins.length; i++) {
        if (pins[i].name === frompoint.value) {
            f = pins[i].pid;
            break;
        }
    }
    for (let i = 0; i < pins.length; i++) {
        if (pins[i].name === topoint.value) {
            t = pins[i].pid;
            break;
        }
    }
    /*let result = Directions.get(f!, t!);
    LOG(result);
    let realdistance = result.distances[t!] * 10;
    let min = realdistance / TRAIN_SPEED % 60;
    let hour: number | null = (realdistance / TRAIN_SPEED - min) / 60;
    if (hour == 0) {hour = null}
    DirectionsResult.add(HTMLBuilder.directionResultCard("train", hour, min, realdistance, "", "startNavi", ``));
    LOG(HTMLBuilder.directionResultCard("train", hour, min, realdistance, "", "startNavi", ``));*/
}
function startNavi() {
    //
}
function dismiss_donate() {
    document.getElementById('marumasa_donation')?.remove();
}
function tabDir() {
    directionTab.classList.remove('hide');
    informationTab.classList.add('hide');
}
function tabInfo() {
    informationTab.classList.remove('hide');
    directionTab.classList.add('hide');
}
