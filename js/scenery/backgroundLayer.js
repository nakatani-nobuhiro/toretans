import { CanvasLayer } from "../layer.js";
/**
 * Basic Background Layer Class
 * Simple blue screen.
 **/
export class BasicBackgroundLayer extends CanvasLayer {
    constructor() {
        super();
        this.canvas.style.backgroundColor = "#66ccff";
    }
    update(milliseconds) {
    }
}
/**
 * Falloing Objects Background Layer Abstract Class
 * Abstract class for the background falling something.
 **/
class FallingObjectsBackgroundLayer extends CanvasLayer {
    constructor() {
        super(...arguments);
        this.objects = [];
    }
    update(milliseconds) {
        if (Math.random() < milliseconds * this.canvas.width / this.frequencyFactor) {
            this.objects.push(this.object.newInstance(this.canvas));
        }
        const context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const flake of this.objects) {
            flake.update(milliseconds);
        }
        this.objects = this.objects.filter(flake => flake.hasGoneOutsideCanvas === false);
    }
}
export class SnowingBackgroundLayer extends FallingObjectsBackgroundLayer {
    constructor() {
        super();
        this.object = new FallingObject(this.canvas);
        this.frequencyFactor = 300000;
        this.object.newInstance = (canvas) => {
            const object = new FallingObject(canvas);
            const dpr = window.devicePixelRatio;
            let size;
            let speed;
            const type = Math.ceil(Math.random() * 3);
            const subType = Math.ceil(Math.random() * 3);
            switch (Math.floor(Math.random() * 4)) {
                case 0: // near
                    size = 16 * dpr;
                    speed = 0.03;
                    break;
                case 1: // mid
                    size = 12 * dpr;
                    speed = 0.025;
                    break;
                default: // far
                    size = 8 * dpr;
                    speed = 0.02;
                    break;
            }
            object.width = size;
            object.height = size;
            object.dy = ((Math.random() - 0.5) * 0.005 + speed) * dpr;
            object.img.src = `img/background/snow/flake${type}_${subType}.png`;
            object.dx = (size * (Math.random() - 0.5)) / 1000;
            object.x = (canvas.width - size) * Math.random();
            object.y = object.dy * -1000;
            object.dAngle = (Math.random() - 0.5) * Math.PI / 1000;
            // rare item
            if (Math.random() < 0.001) {
                object.img.src = "img/background/star.png";
                object.width = 16 * dpr;
                object.height = 16 * dpr;
                object.dy = 0.03 * dpr;
            }
            return object;
        };
    }
}
export class SpringBackgroundLayer extends FallingObjectsBackgroundLayer {
    constructor() {
        super();
        this.object = new FallingObject(this.canvas);
        this.frequencyFactor = 100000;
        this.object.newInstance = (canvas) => {
            const object = new FallingObject(canvas);
            const dpr = window.devicePixelRatio;
            let size;
            let speed;
            const type = Math.ceil(Math.random() * 3);
            let subType;
            switch (Math.floor(Math.random() * 4)) {
                case 0: // near
                    subType = "1";
                    size = 16 * dpr;
                    speed = 0.06;
                    break;
                case 1: // mid
                    subType = "2";
                    size = 12 * dpr;
                    speed = 0.05;
                    break;
                default: // far
                    subType = "3";
                    size = 8 * dpr;
                    speed = 0.04;
                    break;
            }
            object.width = size;
            object.height = size;
            object.dy = ((Math.random() - 0.5) * 0.01 + speed) * dpr;
            object.img.src = `img/background/spring/petal${type}_${subType}.png`;
            object.dx = (size * (-5 - 2 * Math.random())) / 1000;
            const initPosition = Math.random() * (canvas.width + canvas.height);
            if (initPosition < this.canvas.width) {
                object.x = initPosition;
                object.y = object.dy * -1000;
            }
            else {
                object.x = canvas.width + -object.dx * 1000;
                object.y = initPosition - canvas.width;
            }
            object.dAngle = (Math.random() - 0.5) * Math.PI / 1000;
            // rare item
            if (Math.random() < 0.001) {
                object.img.src = "img/background/star.png";
                object.width = 16 * dpr;
                object.height = 16 * dpr;
                object.dy = 0.06 * dpr;
            }
            return object;
        };
    }
}
export class RainBackgroundLayer extends FallingObjectsBackgroundLayer {
    constructor() {
        super();
        this.object = new FallingObject(this.canvas);
        this.frequencyFactor = 200000;
        this.object.newInstance = (canvas) => {
            const object = new FallingObject(canvas);
            const dpr = window.devicePixelRatio;
            let size;
            let speed;
            const type = "1";
            let subType;
            switch (Math.floor(Math.random() * 3)) {
                case 0: // far
                    subType = "1";
                    size = 12 * dpr;
                    speed = 0.2;
                    break;
                case 1: // mid
                    subType = "2";
                    size = 18 * dpr;
                    speed = 0.3;
                    break;
                default: // near
                    subType = "3";
                    size = 24 * dpr;
                    speed = 0.4;
                    break;
            }
            object.width = size;
            object.height = size;
            object.dy = ((Math.random() - 0.5) * 0.1 + speed) * dpr;
            object.img.src = `img/background/rain/raindrop${type}_${subType}.svg`;
            object.x = (canvas.width - size) * Math.random();
            object.y = object.dy * -1000;
            // rare item
            if (Math.random() < 0.001) {
                object.img.src = "img/background/star.png";
                object.width = 24 * dpr;
                object.height = 24 * dpr;
                object.dy = 0.4 * dpr;
                object.dAngle = (Math.random() - 0.5) * Math.PI / 1000;
            }
            return object;
        };
    }
}
export class FallingLeavesBackgroundLayer extends FallingObjectsBackgroundLayer {
    constructor() {
        super();
        this.object = new FallingObject(this.canvas);
        this.frequencyFactor = 300000;
        this.object.newInstance = (canvas) => {
            const object = new FallingObject(canvas);
            const dpr = window.devicePixelRatio;
            let size;
            let speed;
            const type = Math.ceil(Math.random() * 3);
            let subType;
            switch (Math.floor(Math.random() * 4)) {
                case 0: // near
                    subType = "1";
                    size = 32 * dpr;
                    speed = 0.10;
                    break;
                case 1: // mid
                    subType = "2";
                    size = 26 * dpr;
                    speed = 0.08;
                    break;
                default: // far
                    subType = "3";
                    size = 20 * dpr;
                    speed = 0.06;
                    break;
            }
            object.width = size;
            object.height = size;
            object.dy = ((Math.random() - 0.5) * 0.02 + speed) * dpr;
            object.img.src = `img/background/fallingleaves/leaf${type}_${subType}.svg`;
            object.dx = (size * (-2 - 1 * Math.random())) / 1000;
            const initPosition = Math.random() * (canvas.width + canvas.height);
            if (initPosition < this.canvas.width) {
                object.x = initPosition;
                object.y = object.dy * -1000;
            }
            else {
                object.x = canvas.width + -object.dx * 1000;
                object.y = initPosition - canvas.width;
            }
            object.dAngle = (Math.random() - 0.5) * Math.PI / 1000;
            // rare item
            if (Math.random() < 0.001) {
                object.img.src = "img/background/star.png";
                object.width = 32 * dpr;
                object.height = 32 * dpr;
                object.dy = 0.1 * dpr;
            }
            return object;
        };
    }
}
export class MoonnightBackgroundLayer extends FallingObjectsBackgroundLayer {
    constructor() {
        super();
        this.object = new FallingObject(this.canvas);
        this.frequencyFactor = 50000000;
        const moon = new FallingObject(this.canvas);
        moon.img.src = "img/background/moonnight/moon.svg";
        this.objects.push(moon);
        this.object.newInstance = (canvas) => {
            const object = new FallingObject(canvas);
            const dpr = window.devicePixelRatio;
            object.img.src = `img/background/moonnight/cloud.svg`;
            const randomFactor = Math.random();
            object.y = this.canvas.height * 2 * randomFactor / 5;
            object.x = this.canvas.width;
            object.dx = (1 + randomFactor * 2) * dpr * -0.01;
            object.height = (this.canvas.height + this.canvas.height * randomFactor) / 20;
            object.width = object.height * (10 + randomFactor * 5);
            object.alpha = 0.2 + randomFactor * 0.1;
            return object;
        };
    }
    resize(width, height) {
        super.resize(width, height);
        const moonSize = Math.min(this.canvas.width / 3, this.canvas.height / 5);
        this.objects[0].x = moonSize / 2;
        this.objects[0].y = moonSize / 2;
        this.objects[0].width = moonSize;
        this.objects[0].height = moonSize;
    }
}
class FallingObject {
    constructor(canvas) {
        this.canvas = canvas;
        this.img = new Image();
        this.width = 0;
        this.height = 0;
        this.dx = 0;
        this.dy = 0;
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.dAngle = 0;
        this.alpha = 1;
        this.hasGoneOutsideCanvas = false;
    }
    newInstance(canvas) {
        return new FallingObject(canvas);
    }
    update(milliseconds) {
        if (this.y > this.canvas.height ||
            (this.dx <= 0 && this.x + this.width <= 0) ||
            (this.dx >= 0 && this.x >= this.canvas.width)) {
            this.hasGoneOutsideCanvas = true;
        }
        this.x += this.dx * milliseconds;
        this.y += this.dy * milliseconds;
        this.angle += this.dAngle * milliseconds;
        const context = this.canvas.getContext("2d");
        context.save();
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(this.angle);
        context.globalAlpha = this.alpha;
        context.drawImage(this.img, this.width / -2, this.height / -2, this.width, this.height);
        context.restore();
    }
}
export class WaveBackgroundLayer extends CanvasLayer {
    constructor() {
        super();
        this.wave1 = new Wave(this.canvas, "rgba(40, 64, 198, 0.3)");
        this.wave2 = new Wave(this.canvas, "rgba(40, 64, 198, 0.5)");
        this.wave3 = new Wave(this.canvas, "rgba(40, 64, 198, 0.7)");
        this.resize(this.canvas.width, this.canvas.height);
    }
    resize(width, height) {
        super.resize(width, height);
        this.wave1.amplitude = height / 100;
        this.wave1.velocity = Math.PI / 10000;
        this.wave1.waveLength = width * 1.5;
        this.wave1.waveTop = height * 2 / 3;
        this.wave2.amplitude = height / 90;
        this.wave2.velocity = Math.PI / 2500;
        this.wave2.waveLength = width;
        this.wave2.waveTop = height * 2 / 3 + this.canvas.height / 25;
        this.wave3.amplitude = height / 60;
        this.wave3.velocity = Math.PI / 1500;
        this.wave3.waveLength = width * 0.7;
        this.wave3.waveTop = height * 2 / 3 + this.canvas.height / 12.5;
    }
    update(milliseconds) {
        const context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.wave1.update(milliseconds);
        this.wave2.update(milliseconds);
        this.wave3.update(milliseconds);
    }
}
class Wave {
    constructor(canvas, color) {
        this.canvas = canvas;
        this.color = color;
        this.startAngle = Math.random() * 2 - 1;
        this.density = this.canvas.width / 100;
    }
    update(milliseconds) {
        this.startAngle += this.velocity * milliseconds;
        const context = this.canvas.getContext("2d");
        context.fillStyle = this.color;
        context.beginPath();
        context.moveTo(0, this.getSurface(0));
        for (let x = 0; x < this.canvas.width + this.density; x += this.density) {
            const y = this.getSurface(x);
            context.lineTo(x, y);
        }
        context.lineTo(this.canvas.width, this.canvas.height);
        context.lineTo(0, this.canvas.height);
        context.closePath();
        context.fill();
    }
    getSurface(x) {
        return Math.sin(x * 2 * Math.PI / this.waveLength + this.startAngle) * this.amplitude + this.amplitude + this.waveTop;
    }
}
export class EveningBackgroundLayer extends CanvasLayer {
    constructor() {
        super();
        this.background1 = new Image();
        this.background2 = new Image();
        this.canvas.style.backgroundImage = "linear-gradient(#082343, #b7282e, #fe8246)";
        this.background1.onload = () => {
            this.resize(this.canvas.width, this.canvas.height);
        };
        this.background2.onload = () => {
            this.resize(this.canvas.width, this.canvas.height);
        };
        this.background1.src = "img/background/evening/oga1.svg";
        this.background2.src = "img/background/evening/oga2.svg";
    }
    resize(width, height) {
        super.resize(width, height);
        const context = this.canvas.getContext("2d");
        context.drawImage(this.background1, 0, height * 2 / 3, width, width);
        context.drawImage(this.background2, 0, height * 2 / 3, width, width);
    }
    update(milliseconds) {
    }
}
