import { pin, line, LOG, ERROR, canvas, ctx, DIG_ARC } from "./../common";
import { pins, lines, PIN_RADIUS } from "./../Config"

let tmp_x: number, tmp_y: number;
let isMouseDown: boolean;

// Canvas操作ユーティリティ
export class CanvasHandler {
    static OFFSET_X = 2000;
    static OFFSET_Y = 2000;

    static local_x = 0;
    static local_y = 0;
    static local_size = 1;

    static clickFlag: Array<[number,number,number,number,(x: number, y: number, radius: number) => void]> = [];
    static pinRenderFlag: Array<{x:number, y:number, r:number, c:string}> = [];
    static lineRenderFlag: Array<{x:number[], y:number[], c:string}> = [];

    static cx = (ax: number) => (CanvasHandler.OFFSET_X+CanvasHandler.local_x+ax)*(CanvasHandler.local_size);
    static cy = (ay: number) => (CanvasHandler.OFFSET_Y+CanvasHandler.local_y+ay)*(CanvasHandler.local_size);

    static render() {
        LOG('Render Updated');
        CanvasHandler.clear();
        // Line Render
        for (let j = 0; j < lines.length; j++) {
            let x: number[] = [], y: number[] = [];
            const e = lines[j];
            for (let k of e.pid) {
                for (let l = 0; l < pins.length; l++) {
                    if (pins[l].pid == k) {
                        x.push(pins[l].x);
                        y.push(pins[l].y);
                    }
                }
            }
            CanvasHandler.lineRender(x, y, e.color);
        }
        // Pin Render
        if (CanvasHandler.pinRenderFlag != undefined) {
            for (let e of CanvasHandler.pinRenderFlag) {
                CanvasHandler.pinRender(e.x, e.y, e.r, e.c);
            }
        }
    }

    static clear() {
        LOG('Canvas Clear');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(230, 230, 230)";
        ctx.fillRect(0, 0, CanvasHandler.OFFSET_X * 2, CanvasHandler.OFFSET_Y * 2);
    }

    static lineRender(x: number[], y: number[], color: string) {
        LOG("RenderLine", x, y, color);
        CanvasHandler.strokeWidth(10);
        CanvasHandler.strokeStyle(color);
        ctx.beginPath();
        ctx.moveTo(CanvasHandler.cx(x[0]), CanvasHandler.cy(y[0]));
        for (let i = 1; i < x.length; i++) {
            ctx.lineTo(CanvasHandler.cx(x[i]), CanvasHandler.cy(y[i]));
        }
        ctx.stroke();
    }
    
    static pinRender(x: number, y: number, radius: number, color: string) {
        LOG("RenderPin", x, y, radius, color);
        CanvasHandler.fillStyle(color);
        ctx.beginPath();
        ctx.arc(CanvasHandler.cx(x), CanvasHandler.cy(y), radius, DIG_ARC(0), DIG_ARC(360), false);
        ctx.fill();
        LOG(CanvasHandler.cx(x), CanvasHandler.cy(y), radius, DIG_ARC(0), DIG_ARC(360), false);
    }

    static dragstart(e: MouseEvent) {
        LOG("Start Drag");
        isMouseDown = true;
        tmp_x = e.offsetX;
        tmp_y = e.offsetY;
    }

    static dragupdate(e: MouseEvent) {
        if(isMouseDown) {
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

    static dragend(e: MouseEvent) {
        LOG("End Drag");
        isMouseDown = false;
    }

    static wheelzoom(e: WheelEvent) {
        LOG("Update WheelZoom");

        let scale = e.deltaY * -0.002;
        CanvasHandler.local_size += scale;

        CanvasHandler.render();
    }

    static addClickEvent = (x: number, y: number, radius: number, onclick: (x: number, y: number, radius: number) => void, id?: string) => {
        CanvasHandler.clickFlag.push([x-radius, y-radius, x+radius, y+radius, onclick]);
        canvas.addEventListener('click', (e: MouseEvent) => {
            let rect = canvas.getBoundingClientRect();
            let canvasX = (e.clientX - rect.left) * (canvas.width / rect.width);
            let canvasY = (e.clientY - rect.top) * (canvas.height / rect.height);
            if (
                canvasX > CanvasHandler.cx(x-radius) &&
                canvasY > CanvasHandler.cy(y-radius) &&
                canvasX < CanvasHandler.cx(x+radius) &&
                canvasY < CanvasHandler.cy(y+radius)
            ) {
                onclick(x, y, radius);
            }
        })
    };
    static addPinFlag = (x: number, y: number, c: string) => CanvasHandler.pinRenderFlag.push({x:x, y:y, r:PIN_RADIUS, c:c});

    static strokeStyle = (color: string) => ctx.strokeStyle = color;
    static strokeWidth = (width: number) => ctx.lineWidth = width;
    static fillStyle = (color: string) => ctx.fillStyle = color;
}