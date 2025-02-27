import { BaseNode } from "./BaseNode";

export class ImageNode extends BaseNode {
    private image: HTMLImageElement;

    constructor(src: string) {
        super();
        this.image = new Image();
        this.image.src = src;
    }

    public override draw(ctx: CanvasRenderingContext2D): void {
        this.drawImage(ctx);
        this.image.onload = () => this.drawImage(ctx);
    }

    private drawImage(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, 0, 0);
    }
}
