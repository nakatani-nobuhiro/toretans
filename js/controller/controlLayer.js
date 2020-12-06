import { CanvasLayer } from "../layer.js";
/**
 * Control Panel Layer Class
 * コントロール・パネル・レイヤー
 */
export class ControlPanelLayer extends CanvasLayer {
    constructor() {
        super();
        this.characterChangingButton = new CharacterChangingButton(this.canvas);
        this.characterNameButton = new CharacterNameButton(this.canvas);
        this.scenerySelectionButton = new ScenerySelectionButton(this.canvas);
        this.icons = [];
        this.icons.push(this.characterChangingButton);
        this.icons.push(this.characterNameButton);
        this.icons.push(this.scenerySelectionButton);
    }
    resize(width, height) {
        super.resize(width, height);
        const iconsize = Math.floor(Math.min(height / 10, width / 5));
        // Draw the base of the control panel
        // コントロール・パネルの背景描画
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
        // Put the icons
        // アイコンの設置
        this.icons.forEach((icon, i) => {
            icon.x = (this.canvas.width - this.icons.length * iconsize) / 2 + iconsize * i;
            icon.y = this.canvas.height - iconsize;
            icon.size = iconsize;
            icon.draw();
        });
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
/**
 * Abstract Class of Control Button
 * コントロール・ボタンの抽象クラス
 */
class ControlButton {
    constructor(canvas) {
        this.canvas = canvas;
        this.observers = [];
        this.image = new Image();
        this.sound = null;
        this.image.onload = this.draw.bind(this);
    }
    func() {
        if (this.sound != null) {
            this.sound.play();
        }
        this.observers.forEach((observer) => { observer.update(); });
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
/**
 * Character Changing Button Class
 * キャラクター入替ボタン・クラス
 */
class CharacterChangingButton extends ControlButton {
    constructor(canvas) {
        super(canvas);
        this.title = 'いれかえ';
        this.sound = new Audio("audio/control/refresh.mp3");
        this.image.src = "img/control/icon-refresh.svg";
    }
}
/**
 * Character Name Button Class
 * キャラクター名ボタン・クラス
 */
class CharacterNameButton extends ControlButton {
    constructor(canvas) {
        super(canvas);
        this.title = 'なまえ';
        this.image.src = "img/control/icon-tag.svg";
    }
}
/**
 * Scenery Selection Button Class
 * シーナリー選択ボタン・クラス
 */
class ScenerySelectionButton extends ControlButton {
    constructor(canvas) {
        super(canvas);
        this.title = 'はいけい';
        this.image.src = "img/control/icon-image.svg";
    }
}
