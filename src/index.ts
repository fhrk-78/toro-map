import { pin, line, LOG, ERROR, canvas, ctx, PIN_COLOR, LOGHISTORY } from "./common";
import { pins, lines, setpins, setlines, focus, prev_focus, setPrevFocus, setFocus, edit_mode } from "./Config"
import { CanvasHandler } from "./render/CanvasMain"
import { directionObject, Directions } from "./directions/Directions"; 
import { DirectionsResult } from "./directions/Result"
import { HTMLBuilder } from "./utils/HTMLBuilder";
import { InfoHandler } from "./info/InfoHandler"
import { RouteGuideHandler } from "./info/RouteGuideHandler";
import { get, getline, getpin } from "./network/Database";
import { formControler } from "./info/FormControler";
import { lineEditorEngine } from "./editor/LineEditorEngine";

let pinlist = document.getElementById('pointList') as HTMLDataListElement;
let frompoint = document.getElementById('fromPoint') as HTMLInputElement;
let topoint = document.getElementById('toPoint') as HTMLInputElement;
let main = document.getElementById('main') as HTMLElement;
let directionTab = document.getElementById('directions')!;
let informationTab = document.getElementById('information')!;

let direction: directionObject[];

get().then((res) => {
    LOG(res);
    setpins(getpin(res));
    setlines(getline(res));
    init();
    document.getElementById('splash')?.classList.add('hide');
})

function resize() {
    LOG('Window Resized');
    canvas.width = CanvasHandler.OFFSET_X*2;
    canvas.height = CanvasHandler.OFFSET_Y*2;
    canvas.style.width = String(main.clientWidth) + "px";
    canvas.style.height = String(main.clientHeight) + "px";
    CanvasHandler.render();
}

function init() {
    pins.forEach((v: pin) => {
        pinlist.insertAdjacentHTML('afterbegin', `<option value="${v.name}" id="pin_${v.pid}"></option>`);
        CanvasHandler.addClickEvent(v.x, v.y, 10, () => {
            tabInfo();
            if (focus != undefined) {
                setPrevFocus(focus);
                if (edit_mode == true) {
                    CanvasHandler.addLineFlag([prev_focus!.x, v.x], [prev_focus!.y, v.y], "#000000");
                    LOG(prev_focus, focus);
                    CanvasHandler.render();
                }
            }
            if (edit_mode == true) {
                lineEditorEngine.pla(v.pid);
            }
            setFocus(v);
            InfoHandler.set(v);
        }, v.pid);
        CanvasHandler.addPinFlag(v.x, v.y, PIN_COLOR("station"))
    });

    resize();

    window.onresize = resize;

    canvas.addEventListener('mousedown', CanvasHandler.dragstart);
    canvas.addEventListener('mousemove', CanvasHandler.dragupdate);
    canvas.addEventListener('mouseup', CanvasHandler.dragend);
    canvas.addEventListener('wheel', CanvasHandler.wheelzoom);

    canvas.addEventListener(`contextmenu`, (e: MouseEvent) => {
        return;
    }, false);
}

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
    let f: pin | undefined = undefined, t: pin | undefined = undefined;
    for(let i = 0; i < pins.length; i++) {
        if(pins[i].name === frompoint.value) {
            f = pins[i];
            break;
        }
    }
    for(let i = 0; i < pins.length; i++) {
        if(pins[i].name === topoint.value) {
            t = pins[i];
            break;
        }
    }
    if (f != undefined && t != undefined) {
        let res;
        DirectionsResult.clear();
        direction = [];
        res = Directions.get(f, t, "train");
        direction.push(res);
        let tmp_s = "";
        for (let e of res.direction) {
            tmp_s += e.line.name + "、";
        }
        DirectionsResult.add(HTMLBuilder.directionResultCard("train", res.min, res.distance, tmp_s, "startNavi", "0"));
    }
}
(window as any).outputresult = outputresult;

function startNavi(i: number) {
    RouteGuideHandler.clear();
    let r = direction[i];
    if (r == undefined) {
        return;
    }
    RouteGuideHandler.add(r);
    RouteGuideHandler.show();
}
(window as any).startNavi = startNavi;

function closeNavi() {
    RouteGuideHandler.clear();
}
(window as any).closeNavi = closeNavi;

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

(window as any).cancelAddForm = formControler.cancel;
(window as any).showAddForm = formControler.show;
(window as any).sendPin = formControler.sendPin;

(window as any).lineEditStart = lineEditorEngine.editStart;
(window as any).lineEditCancel = lineEditorEngine.editCancel;

(window as any).lineRegistForm = lineEditorEngine.show;
(window as any).lineRegistCancel = lineEditorEngine.cancel;
(window as any).lineRegistSend = lineEditorEngine.sendLine;

////////////////
/// DevTools ///
////////////////

function getLog() {
    location.href = URL.createObjectURL(new Blob([String(LOGHISTORY)], {
        type: "application/octet-stream"
    }))
}
(window as any).getLog = getLog;
