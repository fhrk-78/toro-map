"use strict";
/***************
 * Static Data *
 ***************/
//   -------------[WARN]------------
// * xとyは1の位の桁を切り落とす
// * pidは[都市名_駅名]の形を使用する
// * 順番はあいうえお順
const pins = [
    { name: "中海駅", author: "pizzaharumaki", x: 223, y: -821, pid: "harumaki_chukai" },
    { name: "春座駅", author: "hosiharu", x: 123, y: -471, pid: "haruza_haruza" },
];
//   -------------[WARN]------------
// * xとyは1の位の桁を切り落とす
// * lidは[会社名_路線名]の形を使用する
// * 順番はあいうえお順
const lines = [
    { name: "春晴本線", color: "blue", x: [243, 208, 164, 130, 123, 123], y: [-821, -831, -831, -831, -825, -471], pid: ['harumaki_chukai', '', '', '', '', 'haruza_haruza'], lid: "syunse_main" },
];
/***************
 * Main Script *
 ***************/
let LOG = console.log;
let tmp_x, tmp_y;
let isMouseDown;
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
        CanvasHandler.clear();
        //for (let i = 0; i < pins.length; i++) {
        //    const e = pins[i];
        //}
        for (let j = 0; j < lines.length; j++) {
            const e = lines[j];
            CanvasHandler.lineRender(e.x, e.y, e.color);
        }
    }
    static clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(230, 230, 230)";
        ctx.fillRect(0, 0, CanvasHandler.OFFSET_X * 2, CanvasHandler.OFFSET_Y * 2);
    }
    static lineRender(x, y, color) {
        CanvasHandler.strokeWidth(5);
        CanvasHandler.strokeStyle(color);
        ctx.beginPath();
        ctx.moveTo(CanvasHandler.cx(x[0]), CanvasHandler.cy(y[0]));
        for (let i = 1; i < x.length; i++) {
            ctx.lineTo(CanvasHandler.cx(x[i]), CanvasHandler.cy(y[i]));
        }
        ctx.stroke();
    }
    static dragstart(e) {
        isMouseDown = true;
        tmp_x = e.offsetX;
        tmp_y = e.offsetY;
    }
    static dragupdate(e) {
        if (isMouseDown) {
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
        isMouseDown = false;
    }
    static wheelzoom(e) {
        CanvasHandler.local_size += e.deltaY * -0.001;
        CanvasHandler.render();
    }
    static strokeStyle = (color) => ctx.strokeStyle = color;
    static strokeWidth = (width) => ctx.lineWidth = width;
}
// 経路計算ユーティリティ
class Directions {
    static get(fromname, toname) {
        //
    }
    static generateNodeGraph() {
        let graph = {};
        // ノードの初期化
        for (let pine of pins) {
            graph[pine.pid] = {};
        }
        // 路線ごとに通るノードのエッジを計算する
        for (let linee of lines) {
            for (let i = 0; i < linee.pid.length; i++) {
                let pin1 = linee.pid[i];
                let pin2 = linee.pid[i + 1];
                // ピン間のユークリッド距離(直線距離)を求める
                let distance = Math.sqrt(Math.pow(pins.find(pin => pin.name == pin1).x - pins.find(pin => pin.name == pin2).x, 2) +
                    Math.pow(pins.find(pin => pin.name == pin1).y - pins.find(pin => pin.name == pin2).y, 2));
                graph[pin1][pin2] = distance;
                graph[pin2][pin1] = distance;
            }
        }
    }
    static dijkstra(graph, start) {
        let distances = {};
        for (let node in graph) {
            distances[node] = Infinity;
        }
        distances[start] = 0;
        let queue = [[0, start]];
        while (queue.length != 0) {
            queue.sort((a, b) => a[0] - b[0]);
            let [currentDistance, currentNode] = queue.shift();
            if (distances[currentNode] < currentDistance) {
                continue;
            }
            for (let neighbor in graph[currentNode]) {
                let distance = currentDistance + graph[currentNode][neighbor];
                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                    queue.push([distance, neighbor]);
                }
            }
        }
        return distances;
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
    static directionResultCard(icon, hour = null, min, about, returnmethodname, returnmethodparam = "") {
        let i;
        switch (icon) {
            case "train":
                i = "t";
                break;
            case "car":
                i = "c";
                break;
        }
        return `<div class="di_res"><div><div class="i ${i}"></div><div><h3>${hour == null ? "" : `${hour}時間`}${String(min)}分</h3><p>${about}</p></div></div><div><a href="javascript:${returnmethodname}(${returnmethodparam});" class="s text">開始</a></div></div>`;
    }
}
let pinlist = document.getElementById('pointList');
let directionresults = document.getElementById('directionresults');
let frompoint = document.getElementById('fromPoint');
let topoint = document.getElementById('toPoint');
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let main = document.getElementById('main');
function resize() {
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
    Directions.get(frompoint.value, topoint.value);
}
function dismiss_donate() {
    document.getElementById('marumasa_donation')?.remove();
}
