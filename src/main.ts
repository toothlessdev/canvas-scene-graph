import "reflect-metadata";
import { container } from "tsyringe";
import { bootstrap } from "./bootstrap";
import "./style.css";

import { CanvasEngine } from "./lib/CanvasEngine";
import { ImageNode } from "./node/ImageNode";

import testImage from "./assets/test.png";

bootstrap();

const engine = container.resolve(CanvasEngine);

const imageNode = new ImageNode(testImage);
engine.root.addChild(imageNode);
engine.render();
