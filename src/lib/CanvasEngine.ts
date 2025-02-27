import { singleton, inject } from "tsyringe";
import { BaseNode } from "../node/BaseNode";
import { Canvas } from "./Canvas";

@singleton()
export class CanvasEngine {
    private isPanning: boolean = false;

    private zoom: number = 1;
    private pan = { x: 0, y: 0 };
    private offset = { x: 0, y: 0 };

    public root: BaseNode;

    constructor(
        @inject(Canvas)
        private readonly canvas: Canvas
    ) {
        this.root = new BaseNode();
        this.addMouseDownEventListener();
        this.addMouseMoveEventListener();
        this.addMouseUpEventListener();
        this.addZoomEventListener();
    }

    public updateTransform(zoom: number, panX: number, panY: number) {
        this.root.transform = new DOMMatrix().translate(panX, panY).scale(zoom);
        this.render();
    }

    public render() {
        this.canvas.context.clearRect(
            0,
            0,
            this.canvas.element.width,
            this.canvas.element.height
        );

        this.root.render(this.canvas.context, new DOMMatrix());
    }

    private addZoomEventListener() {
        this.canvas.element.addEventListener("wheel", (e) => {
            e.preventDefault();

            this.zoom = e.deltaY > 0 ? this.zoom * 0.9 : this.zoom * 1.1;
            this.updateTransform(this.zoom, this.pan.x, this.pan.y);
        });
    }

    private addMouseDownEventListener() {
        this.canvas.element.addEventListener("mousedown", (e) => {
            this.isPanning = true;
            this.offset = { x: e.offsetX, y: e.offsetY };
        });
    }

    private addMouseMoveEventListener() {
        this.canvas.element.addEventListener("mousemove", (e) => {
            if (!this.isPanning) return;

            const dx = e.offsetX - this.offset.x;
            const dy = e.offsetY - this.offset.y;

            this.pan.x += dx * this.canvas.dpr;
            this.pan.y += dy * this.canvas.dpr;
            this.offset = { x: e.offsetX, y: e.offsetY };
            this.updateTransform(this.zoom, this.pan.x, this.pan.y);
        });
    }

    private addMouseUpEventListener() {
        this.canvas.element.addEventListener("mouseup", () => {
            this.isPanning = false;
        });
        this.canvas.element.addEventListener("mouseleave", () => {
            this.isPanning = false;
        });
    }
}
