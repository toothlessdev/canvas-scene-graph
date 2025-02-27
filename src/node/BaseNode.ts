export interface SceneNode {
    children: SceneNode[];
    transform: DOMMatrix;
    render(ctx: CanvasRenderingContext2D, parentTransform: DOMMatrix): void;
}

export class BaseNode implements SceneNode {
    children: SceneNode[] = [];
    transform: DOMMatrix = new DOMMatrix();

    public addChild(child: SceneNode) {
        this.children.push(child);
    }

    public render(ctx: CanvasRenderingContext2D, parentTransform: DOMMatrix) {
        ctx.save();

        const globalTransform = parentTransform.multiply(this.transform);

        ctx.setTransform(
            globalTransform.a,
            globalTransform.b,
            globalTransform.c,
            globalTransform.d,
            globalTransform.e,
            globalTransform.f
        );

        this.draw(ctx);
        this.children.forEach((child) => child.render(ctx, globalTransform));
        ctx.restore();
    }

    public draw(_ctx: CanvasRenderingContext2D): void {}
}
