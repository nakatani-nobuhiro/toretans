import { CanvasLayer } from "../layer.js";
import * as sceneryMaster from "../scenery/sceneryMaster.js";
/**
 * Scenery Selection Layer
 * シーナリー選択レイヤー
 */
export class ScenerySelectionLayer extends CanvasLayer {
    constructor(observer) {
        super();
        this.observer = observer;
        this.icons = [];
        this.canvas.style.backgroundColor = "#000000";
        sceneryMaster.sceneryMaster.forEach((scenery) => {
            const icon = new SceneryButton(this.canvas);
            icon.image.src = scenery.iconImageSrc;
            icon.builder = scenery.builder;
            icon.observer = this.observer;
            this.icons.push(icon);
        });
    }
    resize(width, height) {
        super.resize(width, height);
        const iconsize = Math.floor(Math.min(height / 5.1, width / 3.1));
        const numOfColumns = Math.floor(width / iconsize);
        this.icons.forEach((icon, i) => {
            icon.size = iconsize;
            icon.x = iconsize * (i % numOfColumns);
            icon.y = iconsize * Math.floor(i / numOfColumns);
            icon.draw();
        });
    }
    onClick(x, y) {
        for (const icon of this.icons) {
            if (icon.onClick(x, y) === true) {
                break;
            }
        }
        return true;
    }
    update(milliseconds) {
    }
}
class SceneryButton {
    constructor(canvas) {
        this.canvas = canvas;
        this.image = new Image();
        this.image.onload = this.draw.bind(this);
    }
    func() {
        this.observer.update(this.builder.build());
    }
    draw() {
        const context = this.canvas.getContext("2d");
        const margin = Math.floor(this.size * 0.1);
        context.drawImage(this.image, this.x + margin, this.y + margin, this.size - margin, this.size - margin);
    }
    onClick(x, y) {
        if (x > this.x &&
            x < this.x + this.size &&
            y > this.y &&
            y < this.y + this.size) {
            this.func();
            return true;
        }
        else {
            return false;
        }
    }
}
