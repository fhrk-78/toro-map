import { pin, line, LOG, ERROR, canvas, ctx } from "./common";
import { pins, lines } from "./Config"

let tmp_x: number, tmp_y: number;
let isMouseDown: boolean;

// Canvas操作ユーティリティ
export class CanvasHandler {
    static OFFSET_X = 1000;
    static OFFSET_Y = 1000;

    static local_x = 0;
    static local_y = 0;
    static local_size = 1;

    static cx = (ax: number) => (CanvasHandler.OFFSET_X+CanvasHandler.local_x+ax)*(CanvasHandler.local_size);
    static cy = (ay: number) => (CanvasHandler.OFFSET_Y+CanvasHandler.local_y+ay)*(CanvasHandler.local_size);

    static render() {
        LOG('Render Updated');
        CanvasHandler.clear();
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
    }

    static clear() {
        LOG('Canvas Clear');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(230, 230, 230)";
        ctx.fillRect(0, 0, CanvasHandler.OFFSET_X * 2, CanvasHandler.OFFSET_Y * 2);
    }

    static lineRender(x: number[], y: number[], color: string) {
        LOG("RenderLine", x, y, color);
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
        CanvasHandler.local_size += e.deltaY * -0.001;
        CanvasHandler.render();
    }

    static strokeStyle = (color: string) => ctx.strokeStyle = color;
    static strokeWidth = (width: number) => ctx.lineWidth = width;
}