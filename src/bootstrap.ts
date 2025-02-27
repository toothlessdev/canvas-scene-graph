import { container } from "tsyringe";
import { Canvas } from "./lib/Canvas";
import { CanvasEngine } from "./lib/CanvasEngine";

export function bootstrap() {
    container.register(Canvas, { useValue: new Canvas(800, 600) });
    container.register(CanvasEngine, { useClass: CanvasEngine });
}
