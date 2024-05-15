import { pin, line } from "./common";

export const PIN_RADIUS = 7;
export const TRAIN_SPEED = 420; // m/min
export const REQ_URL = "https://script.google.com/macros/s/AKfycbwXhRv0JoSfB2uzCTbHfH8NVvv2u3tF_0EyjBe_-xLdbPbkljIYc3oFKrWHLIPg3FtM/exec";

export let pins: pin[];
export let lines: line[];

export let edit_mode: boolean = false;
export let edit_mode_set=(v:boolean)=>edit_mode=v;

export function setpins(p: pin[]) {
    pins = p;
}

export function setlines(l: line[]) {
    lines = l;
}

export let focus: pin|undefined = undefined;
export let prev_focus: pin|undefined = undefined;

export function setFocus(f: pin|undefined) {
    focus = f;
}

export function setPrevFocus(f: pin|undefined) {
    prev_focus = f;
}
