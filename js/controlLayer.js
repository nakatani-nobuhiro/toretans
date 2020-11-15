export { ControlLayer };
import { CanvasLayer } from "./layer.js";
/*
 * Control Layer Class
 * this layer should be at the top of layers.
 */
class ControlLayer extends CanvasLayer {
    constructor() {
        super();
        this.observerLayers = [];
        this.refreshButton = new RefreshButton(this.canvas);
        this.displayNameButton = new DisplayNameButton(this.canvas);
        //    public readonly selectSceneryButton: SelectSceneryButton = new SelectSceneryButton(this.canvas);
        this.icons = [];
        this.icons.push(this.refreshButton);
        this.icons.push(this.displayNameButton);
        //        this.icons.push(this.selectSceneryButton);
    }
    resize(width, height) {
        super.resize(width, height);
        const iconsize = Math.floor(Math.min(height / 10, width / 5));
        // Control Panel
        const context = this.canvas.getContext("2d");
        const dpr = window.devicePixelRatio;
        const r = 10 * dpr;
        context.beginPath();
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.moveTo(0, this.canvas.height);
        context.arc(r, this.canvas.height - iconsize + r, r, Math.PI, Math.PI * 3 / 2);
        context.arc(this.canvas.width - r, this.canvas.height - iconsize + r, r, Math.PI * 3 / 2, 0);
        context.lineTo(this.canvas.width, this.canvas.height);
        context.lineTo(0, this.canvas.height);
        context.closePath();
        context.fill();
        // put icons
        this.icons.forEach((icon, i) => {
            icon.x = (this.canvas.width - this.icons.length * iconsize) / 2 + iconsize * i;
            icon.y = this.canvas.height - iconsize;
            icon.size = iconsize;
            icon.draw();
        });
        this.canvas.addEventListener("click", (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            for (const layer of this.observerLayers) {
                if (layer.onClick(x, y) === true) {
                    break;
                }
            }
        }, false);
    }
    onClick(x, y) {
        for (const icon of this.icons) {
            if (icon.onClick(x, y) === true) {
                return true;
            }
        }
        return false;
    }
    update(milliseconds) {
    }
}
class ControlButton {
    constructor(canvas) {
        this.canvas = canvas;
        this.observerLayers = [];
        this.image = new Image();
        this.image.onload = this.draw.bind(this);
    }
    draw() {
        const context = this.canvas.getContext("2d");
        const margin = Math.floor(this.size * 0.2);
        context.drawImage(this.image, this.x + margin, this.y + margin / 2, this.size - margin * 2, this.size - margin * 2);
        context.font = Math.floor(this.size / 5) + "px sans-serif";
        context.textAlign = "center";
        context.textBaseline = "top";
        context.fillStyle = "#ffffff";
        context.fillText(this.title, this.x + this.size / 2, this.y + this.size - margin * 3 / 2);
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
class RefreshButton extends ControlButton {
    constructor(canvas) {
        super(canvas);
        this.sound = new Audio("audio/control/refresh.mp3");
        this.title = 'いれかえ';
        this.image.src = "img/control/icon-refresh.svg";
    }
    func() {
        this.sound.play();
        for (const layer of this.observerLayers) {
            layer.refresh();
        }
    }
}
class DisplayNameButton extends ControlButton {
    constructor(canvas) {
        super(canvas);
        this.title = 'なまえ';
        this.image.src = "img/control/icon-tag.svg";
    }
    func() {
        for (const layer of this.observerLayers) {
            layer.characterNameVisible = !layer.characterNameVisible;
        }
    }
}
class SelectSceneryButton extends ControlButton {
    constructor(canvas) {
        super(canvas);
        this.title = 'はいけい';
        this.image.src = "img/control/icon-image.svg";
    }
    func() {
        for (const layer of this.observerLayers) {
            //            layer.characterNameVisible = !layer.characterNameVisible;
        }
    }
}
