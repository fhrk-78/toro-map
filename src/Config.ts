import { pin, line } from "./common";

export const PIN_RADIUS = 7;
export const TRAIN_SPEED = 420; // m/min

export let pins: pin[];
export let lines: line[];

export function setpins(p: pin[]) {
    pins = p;
}

export function setlines(l: line[]) {
    lines = l;
}
