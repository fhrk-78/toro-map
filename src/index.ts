import { pin, line, LOG, ERROR, canvas, ctx } from "./common";
import { pins, lines } from "./Config"
import { CanvasHandler } from "./CanvasHandler"

// 経路計算ユーティリティ
class Directions {
    //
}

// 経路結果コントロール
class DirectionsResult {
    static clear() {
        directionresults.innerHTML = "";
    }

    static add(html: string) {
        directionresults.insertAdjacentHTML('afterbegin', html);
    }
}

// テンプレート化されたHTMLの生成ユーティリティ
class HTMLBuilder {
    static directionResultCard(icon: "train" | "car", hour: number | null = null, min: number, distance: number, about: string, returnmethodname: string, returnmethodparam: string = "") {
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

let pinlist = document.getElementById('pointList') as HTMLDataListElement;
let directionresults = document.getElementById('directionresults') as HTMLDivElement;
let frompoint = document.getElementById('fromPoint') as HTMLInputElement;
let topoint = document.getElementById('toPoint') as HTMLInputElement;

let main = document.getElementById('main') as HTMLElement;

let directionTab = document.getElementById('directions')!;
let informationTab = document.getElementById('information')!;

function resize() {
    LOG('Window Resized');
    canvas.width = CanvasHandler.OFFSET_X*2;
    canvas.height = CanvasHandler.OFFSET_Y*2;
    canvas.style.width = String(main.clientWidth) + "px";
    canvas.style.height = String(main.clientHeight) + "px";
    CanvasHandler.render();
}

function init() {
    resize();

    pins.forEach((v: pin, i: number, a: pin[]) => {
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
(window as any).reverseft = reverseft;

function outputresult() {
    if (frompoint.value == "" || topoint.value == "") {return;}
    let f: string, t: string;
    for(let i = 0; i < pins.length; i++) {
        if(pins[i].name === frompoint.value) {
            f = pins[i].pid;
            break;
        }
    }
    for(let i = 0; i < pins.length; i++) {
        if(pins[i].name === topoint.value) {
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
(window as any).outputresult = outputresult;

function startNavi() {
    //
}
(window as any).startNavi = startNavi;

function dismiss_donate() {
    document.getElementById('marumasa_donation')?.remove();
}
(window as any).dismiss_donate = dismiss_donate;

function tabDir() {
    directionTab.classList.remove('hide');
    informationTab.classList.add('hide');
}
(window as any).tabDir = tabDir;

function tabInfo() {
    informationTab.classList.remove('hide');
    directionTab.classList.add('hide');
}
(window as any).tabInfo = tabInfo;
