/***************
 * Static Data *
 ***************/

interface pin {
    name: string,
    author: string,
    x: number,
    y: number,
    cid: string,
}

interface line {
    name: string,
    color: string,
    x: number[],
    y: number[],
    cid: string,
}

//   -------------[WARN]------------
// * xとyは1の位の桁を切り落とす
// * cidは[都市名_駅名]の形を使用する
// * 順番はあいうえお順

const pins: pin[] = [
    {name:"晴牧駅", author:"pizzaharumaki", x:232, y:923, cid:"harumaki_harumaki"},
]

//   -------------[WARN]------------
// * xとyは1の位の桁を切り落とす
// * cidは[都市名_駅名]の形を使用する
// * 順番はあいうえお順

const lines: line[] = [
    {name:"春晴本線", color: "blue", x:[243, 208, 164, 130, 123, 123], y:[-821, -831, -831, -831, -825, -471], cid:"syunse_main"},
]

/***************
 * Main Script *
 ***************/

let LOG = console.log;

let tmp_x: number, tmp_y: number;
let isMouseDown: boolean;

// Canvas操作ユーティリティ
class CanvasHandler {
    static OFFSET_X = 1000;
    static OFFSET_Y = 1000;

    static local_x = 0;
    static local_y = 0;
    static local_size = 1;

    static cx = (ax: number) => (CanvasHandler.OFFSET_X+CanvasHandler.local_x+ax)*(CanvasHandler.local_size);
    static cy = (ay: number) => (CanvasHandler.OFFSET_Y+CanvasHandler.local_y+ay)*(CanvasHandler.local_size);

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

    static lineRender(x: number[], y: number[], color: string) {
        CanvasHandler.strokeWidth(5);
        CanvasHandler.strokeStyle(color);
        ctx.beginPath();
        ctx.moveTo(CanvasHandler.cx(x[0]), CanvasHandler.cy(y[0]));
        for (let i = 1; i < x.length; i++) {
            ctx.lineTo(CanvasHandler.cx(x[i]), CanvasHandler.cy(y[i]));
        }
        ctx.stroke();
    }

    static dragstart(e: MouseEvent) {
        isMouseDown = true;
        tmp_x = e.offsetX;
        tmp_y = e.offsetY;
    }

    static dragupdate(e: MouseEvent) {
        if(isMouseDown) {
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

    static dragend(e: MouseEvent) {
        isMouseDown = false;
    }

    static wheelzoom(e: WheelEvent) {
        CanvasHandler.local_size += e.deltaY * -0.001;
        CanvasHandler.render();
    }

    static strokeStyle = (color: string) => ctx.strokeStyle = color;
    static strokeWidth = (width: number) => ctx.lineWidth = width;
}

// 経路計算ユーティリティ
class Directions {
    static get(fromname: string, toname: string) {
        //
    }
}

// 経路結果コントロール
class DirectionsResult {
    static clear() {
        directionresults.innerHTML = "";
    }

    static add(html: string) {
        directionresults.insertAdjacentHTML('afterbegin', html)
    }
}

// テンプレート化されたHTMLの生成ユーティリティ
class HTMLBuilder {
    static directionResultCard(icon: "train" | "car", hour: number | null = null, min: number, about: string, returnmethodname: string, returnmethodparam: string = "") {
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

let pinlist = document.getElementById('pointList') as HTMLDataListElement;
let directionresults = document.getElementById('directionresults') as HTMLDivElement;
let frompoint = document.getElementById('fromPoint') as HTMLInputElement;
let topoint = document.getElementById('toPoint') as HTMLInputElement;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
let main = document.getElementById('main') as HTMLElement;

function resize() {
    canvas.width = CanvasHandler.OFFSET_X*2;
    canvas.height = CanvasHandler.OFFSET_Y*2;
    canvas.style.width = String(main.clientWidth) + "px";
    canvas.style.height = String(main.clientHeight) + "px";
    CanvasHandler.render();
}

function init() {
    resize();

    pins.forEach((v: pin, i: number, a: pin[]) => {
        pinlist.insertAdjacentHTML('afterbegin', `<option value="${v.name}" id="pin_${v.cid}"></option>`);
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
