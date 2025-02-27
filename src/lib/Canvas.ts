import { singleton } from "tsyringe";

@singleton()
export class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private devicePixelRatio: number;

    constructor(
        width: number,
        height: number,
        devicePixelRatio: number = window.devicePixelRatio || 1
    ) {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;

        this.devicePixelRatio = devicePixelRatio;
        this.canvas.width = width * devicePixelRatio;
        this.canvas.height = height * devicePixelRatio;

        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;

        this.ctx = this.canvas.getContext("2d")!;
    }

    public get element() {
        return this.canvas;
    }

    public get context() {
        return this.ctx;
    }

    public get dpr() {
        return this.devicePixelRatio;
    }
}
