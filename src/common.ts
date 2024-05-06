export interface pin {
    name: string,
    x: number,
    y: number,
    pid: string,
}

export interface line {
    name: string,
    color: string,
    pid: string[],
    lid: string,
    type: "train" | "car",
}

export interface courceObject {
    lid: string,
    fpid: string,
    tpid: string,
    distance: number,
}

export interface route {
    distance: number,
    cource: courceObject[],
}

export let LOG = console.log;
export let ERROR = console.error;

export const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
