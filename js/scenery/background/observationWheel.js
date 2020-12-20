import { Layer } from "../../layer.js";
export class ObservationWheelBackgroundLayer extends Layer {
    constructor() {
        super();
        this.wheel = new Wheel(this.canvas);
    }
    resize(width, height) {
        super.resize(width, height);
        this.wheel.resize(width, height);
    }
    update(milliseconds) {
        const context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.wheel.update();
    }
}
class Wheel {
    constructor(canvas) {
        this.canvas = canvas;
        this.radius = 0;
        this.axisX = 0;
        this.axisY = 0;
        this.angle = 0;
    }
    resize(width, height) {
        this.radius = Math.min(width, height) * 0.9 / 2;
        this.axisX = Math.floor(width / 2);
        this.axisY = height - Math.floor(Math.min(height, width) / 2);
    }
    update() {
        const time = Date.now();
        this.angle = (function (time) {
            const ROTATION_TIME = 5;
            const min = time / (1000 * 60);
            const progress = (min % ROTATION_TIME) / ROTATION_TIME;
            return (1 - progress) * Math.PI * 2;
        })(time);
        const frameColor = "#cccccc";
        const second = new Date(time).getSeconds();
        const context = this.canvas.getContext("2d");
        const dpr = window.devicePixelRatio;
        for (let i = 1; i < 10; i++) {
            context.beginPath();
            context.arc(this.axisX, this.axisY, this.radius * i / 10, 0, Math.PI * 2);
            if (i < 9) {
                context.strokeStyle = frameColor;
                context.lineWidth = 1 * dpr;
            }
            else {
                context.strokeStyle = "#ff0000";
                context.lineWidth = 2 * dpr;
            }
            context.stroke();
        }
        context.save();
        context.translate(this.axisX, this.axisY);
        context.rotate(this.angle);
        for (let i = 0; i < 60; i++) {
            const barAngle = Math.PI * 2 / 60 * i;
            const nextBarAngle = Math.PI * 2 / 60 * (i + 1);
            this.drawCabin(i, barAngle);
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(-Math.sin(barAngle) * this.radius * 0.8, -Math.cos(barAngle) * this.radius * 0.8);
            context.strokeStyle = frameColor;
            context.lineWidth = 2 * dpr;
            context.stroke();
            const pointFrom = i % 2 == 1 ? 0.6 : 0.5;
            const pointTo = i % 2 == 1 ? 0.5 : 0.6;
            context.beginPath();
            context.moveTo(-Math.sin(barAngle) * this.radius * pointFrom, -Math.cos(barAngle) * this.radius * pointFrom);
            context.lineTo(-Math.sin(nextBarAngle) * this.radius * pointTo, -Math.cos(nextBarAngle) * this.radius * pointTo);
            context.strokeStyle = frameColor;
            context.lineWidth = 1;
            context.stroke();
            context.beginPath();
            context.moveTo(-Math.sin(barAngle) * this.radius * 0.9, -Math.cos(barAngle) * this.radius * 0.9);
            context.lineTo(-Math.sin(nextBarAngle) * this.radius * 1, -Math.cos(nextBarAngle) * this.radius * 1);
            context.strokeStyle = frameColor;
            context.lineWidth = 1;
            context.stroke();
            context.beginPath();
            context.moveTo(-Math.sin(barAngle) * this.radius * 1, -Math.cos(barAngle) * this.radius * 1);
            context.lineTo(-Math.sin(nextBarAngle) * this.radius * 0.9, -Math.cos(nextBarAngle) * this.radius * 0.9);
            context.strokeStyle = frameColor;
            context.lineWidth = 1;
            context.stroke();
            context.beginPath();
            context.moveTo(-Math.sin(barAngle) * this.radius * 0.8, -Math.cos(barAngle) * this.radius * 0.8);
            context.lineTo(-Math.sin(barAngle) * this.radius, -Math.cos(barAngle) * this.radius);
            if (59 - i > second) {
                context.strokeStyle = frameColor;
            }
            else {
                context.shadowBlur = 20;
                context.shadowColor = "#ffffff";
                context.strokeStyle = "#ffffff";
            }
            context.lineWidth = 3;
            context.stroke();
            context.shadowBlur = 0;
            context.shadowColor = "";
        }
        context.restore();
        this.drawSupportLegs(time);
    }
    drawCabin(i, barAngle) {
        const context = this.canvas.getContext("2d");
        const cabinSize = Math.tan(Math.PI * 2 / 60) * this.radius * 0.6;
        const color = (function (i) {
            let red;
            let green;
            let blue;
            switch (Math.floor(i / 10)) {
                case 0:
                    red = 255;
                    green = Math.floor((i % 10 / 10) * 255);
                    blue = 0;
                    break;
                case 1:
                    red = 255 - Math.floor((i % 10 / 10) * 255);
                    green = 255;
                    blue = 0;
                    break;
                case 2:
                    red = 0;
                    green = 255;
                    blue = Math.floor((i % 10 / 10) * 255);
                    break;
                case 3:
                    red = 0;
                    green = 255 - Math.floor((i % 10 / 10) * 255);
                    blue = 255;
                    break;
                case 4:
                    red = Math.floor((i % 10 / 10) * 255);
                    green = 0;
                    blue = 255;
                    break;
                default:
                    red = 255;
                    green = 0;
                    blue = 255 - Math.floor((i % 10 / 10) * 255);
                    break;
            }
            return `rgb(${red}, ${green}, ${blue})`;
        })(i);
        const cabinX = -Math.sin(barAngle) * this.radius + (cabinSize * 0.4) * Math.sin(this.angle);
        const cabinY = -Math.cos(barAngle) * this.radius + (cabinSize * 0.4) * Math.cos(this.angle);
        context.beginPath();
        context.arc(cabinX, cabinY, cabinSize / 2, 0, Math.PI * 2);
        context.strokeStyle = color;
        context.lineWidth = cabinSize / 10;
        context.stroke();
        context.beginPath();
        context.fillStyle = color;
        context.arc(cabinX, cabinY, cabinSize / 2, Math.PI - this.angle, 0 - this.angle, true);
        context.fill();
        context.beginPath();
        context.moveTo(cabinX + Math.cos(Math.PI * 2 / 3 - this.angle) * cabinSize / 2, cabinY + Math.sin(Math.PI * 2 / 3 - this.angle) * cabinSize / 2);
        context.lineTo(cabinX + Math.cos(Math.PI * 4 / 3 - this.angle) * cabinSize / 2, cabinY + Math.sin(Math.PI * 4 / 3 - this.angle) * cabinSize / 2);
        context.strokeStyle = color;
        context.lineWidth = cabinSize / 10;
        context.stroke();
        context.beginPath();
        context.moveTo(cabinX + Math.cos(Math.PI * 1 / 3 - this.angle) * cabinSize / 2, cabinY + Math.sin(Math.PI * 1 / 3 - this.angle) * cabinSize / 2);
        context.lineTo(cabinX + Math.cos(Math.PI * 5 / 3 - this.angle) * cabinSize / 2, cabinY + Math.sin(Math.PI * 5 / 3 - this.angle) * cabinSize / 2);
        context.strokeStyle = color;
        context.lineWidth = cabinSize / 10;
        context.stroke();
    }
    drawSupportLegs(time) {
        const LEFT = -1;
        const RIGHT = 1;
        const upper = 0.4;
        const lower = 0.7;
        const legColor = "#999999";
        const legWidth = this.radius / 30;
        const legAngle = Math.PI / 8;
        const legHeight = this.canvas.height - this.axisY;
        const context = this.canvas.getContext("2d");
        context.beginPath();
        context.arc(this.axisX, this.axisY, legWidth, 0, Math.PI * 2);
        context.fillStyle = legColor;
        context.fill();
        [LEFT, RIGHT].forEach(side => {
            context.beginPath();
            context.moveTo(this.axisX, this.axisY);
            context.lineTo(this.axisX + Math.tan(legAngle) * legHeight * side, this.canvas.height);
            context.strokeStyle = legColor;
            context.lineWidth = legWidth;
            context.stroke();
            context.beginPath();
            context.moveTo(this.axisX + Math.tan(legAngle) * legHeight * side * upper, this.axisY + legHeight * upper);
            context.lineTo(this.axisX, this.axisY + legHeight * lower);
            context.strokeStyle = legColor;
            context.lineWidth = legWidth * 0.8;
            context.stroke();
            context.beginPath();
            context.moveTo(this.axisX + Math.tan(legAngle) * legHeight * side * lower, this.axisY + legHeight * lower);
            context.lineTo(this.axisX, this.axisY + legHeight);
            context.strokeStyle = legColor;
            context.lineWidth = legWidth * 0.8;
            context.stroke();
        });
        [upper, lower].forEach(height => {
            context.beginPath();
            context.moveTo(this.axisX + Math.tan(legAngle) * legHeight * height * LEFT, this.axisY + legHeight * height);
            context.lineTo(this.axisX + Math.tan(legAngle) * legHeight * height * RIGHT, this.axisY + legHeight * height);
            context.strokeStyle = legColor;
            context.lineWidth = legWidth * 0.8;
            context.stroke();
        });
        const displayHeight = Math.floor(this.radius / 6);
        const displayWidth = displayHeight * 2;
        const offsetY = displayHeight;
        context.fillStyle = "#000000";
        context.beginPath();
        context.arc(this.axisX - displayWidth / 2, this.axisY + offsetY + displayHeight / 2, displayHeight / 2, Math.PI / 2, Math.PI * 1.5);
        context.arc(this.axisX + displayWidth / 2, this.axisY + offsetY + displayHeight / 2, displayHeight / 2, Math.PI * 1.5, Math.PI / 2);
        context.fill();
        const t = new Date(time);
        const hour = t.getHours();
        const min = ("0" + String(t.getMinutes())).slice(-2);
        const second = t.getSeconds();
        context.font = displayHeight * 0.8 + "px sans-serif";
        context.textAlign = "right";
        context.textBaseline = "top";
        context.fillStyle = "#ff9900";
        context.fillText(String(hour), this.axisX - displayHeight / 5, this.axisY + offsetY + displayHeight * 0.1);
        context.font = displayHeight * 0.8 + "px sans-serif";
        context.textAlign = "left";
        context.textBaseline = "top";
        context.fillStyle = "#ff9900";
        context.fillText(String(min), this.axisX + displayHeight / 5, this.axisY + offsetY + displayHeight * 0.1);
        if (second % 2 == 0) {
            context.font = displayHeight * 0.8 + "px sans-serif";
            context.textAlign = "center";
            context.textBaseline = "top";
            context.fillStyle = "#ff9900";
            context.fillText(":", this.axisX, this.axisY + offsetY);
        }
    }
}
