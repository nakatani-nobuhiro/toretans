import { ControlLayer } from "./controlLayer.js";
import { CharacterLayer } from "./characterLayer.js";
import * as Background from "./backgroundLayer.js";
export class BasicScenery {
    constructor(div) {
        this.div = div;
        this.animation = new Animation(60);
        this.layers = [];
        const backgroundLayer = new Background.BasicBackgroundLayer();
        const characterLayer = new CharacterLayer();
        const controlLayer = new ControlLayer();
        this.addLayer(backgroundLayer);
        this.addLayer(characterLayer);
        this.addLayer(controlLayer);
        controlLayer.displayNameButton.observerLayers.push(characterLayer);
        controlLayer.refreshButton.observerLayers.push(characterLayer);
        controlLayer.observerLayers = this.layers.reverse();
        this.animation.layers = this.layers;
        this.resize();
        window.addEventListener("resize", () => {
            this.resize();
        }, false);
    }
    resize() {
        for (const layer of this.layers) {
            layer.resize(window.innerWidth, window.innerHeight);
        }
    }
    addLayer(layer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
    }
}
export class SnowScenery {
    constructor(div) {
        this.div = div;
        this.animation = new Animation(60);
        this.layers = [];
        this.div.style.backgroundColor = "#001122";
        const backgroundLayer = new Background.SnowingBackgroundLayer();
        const characterLayer = new CharacterLayer();
        const controlLayer = new ControlLayer();
        this.addLayer(backgroundLayer);
        this.addLayer(characterLayer);
        this.addLayer(controlLayer);
        controlLayer.displayNameButton.observerLayers.push(characterLayer);
        controlLayer.refreshButton.observerLayers.push(characterLayer);
        controlLayer.observerLayers = this.layers.reverse();
        this.animation.layers = this.layers;
        this.resize();
        window.addEventListener("resize", () => {
            this.resize();
        }, false);
    }
    resize() {
        for (const layer of this.layers) {
            layer.resize(window.innerWidth, window.innerHeight);
        }
    }
    addLayer(layer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
    }
}
export class SpringScenery {
    constructor(div) {
        this.div = div;
        this.animation = new Animation(60);
        this.layers = [];
        this.div.style.backgroundColor = "#66ccff";
        const backgroundLayer = new Background.SpringBackgroundLayer();
        const characterLayer = new CharacterLayer();
        const controlLayer = new ControlLayer();
        this.addLayer(backgroundLayer);
        this.addLayer(characterLayer);
        this.addLayer(controlLayer);
        controlLayer.displayNameButton.observerLayers.push(characterLayer);
        controlLayer.refreshButton.observerLayers.push(characterLayer);
        controlLayer.observerLayers = this.layers.reverse();
        this.animation.layers = this.layers;
        this.resize();
        window.addEventListener("resize", () => {
            this.resize();
        }, false);
    }
    resize() {
        for (const layer of this.layers) {
            layer.resize(window.innerWidth, window.innerHeight);
        }
    }
    addLayer(layer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
    }
}
export class RainScenery {
    constructor(div) {
        this.div = div;
        this.animation = new Animation(60);
        this.layers = [];
        this.div.style.backgroundColor = "#337799";
        const backgroundLayer = new Background.RainBackgroundLayer();
        const characterLayer = new CharacterLayer();
        const controlLayer = new ControlLayer();
        this.addLayer(backgroundLayer);
        this.addLayer(characterLayer);
        this.addLayer(controlLayer);
        controlLayer.displayNameButton.observerLayers.push(characterLayer);
        controlLayer.refreshButton.observerLayers.push(characterLayer);
        controlLayer.observerLayers = this.layers.reverse();
        this.animation.layers = this.layers;
        this.resize();
        window.addEventListener("resize", () => {
            this.resize();
        }, false);
    }
    resize() {
        for (const layer of this.layers) {
            layer.resize(window.innerWidth, window.innerHeight);
        }
    }
    addLayer(layer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
    }
}
export class FallingLeavesScenery {
    constructor(div) {
        this.div = div;
        this.animation = new Animation(60);
        this.layers = [];
        this.div.style.backgroundImage = "linear-gradient(#d36950, #f4c14e)";
        const backgroundLayer = new Background.FallingLeavesBackgroundLayer();
        const characterLayer = new CharacterLayer();
        const controlLayer = new ControlLayer();
        this.addLayer(backgroundLayer);
        this.addLayer(characterLayer);
        this.addLayer(controlLayer);
        controlLayer.displayNameButton.observerLayers.push(characterLayer);
        controlLayer.refreshButton.observerLayers.push(characterLayer);
        controlLayer.observerLayers = this.layers.reverse();
        this.animation.layers = this.layers;
        this.resize();
        window.addEventListener("resize", () => {
            this.resize();
        }, false);
    }
    resize() {
        for (const layer of this.layers) {
            layer.resize(window.innerWidth, window.innerHeight);
        }
    }
    addLayer(layer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
    }
}
export class EveningScenery {
    constructor(div) {
        this.div = div;
        this.animation = new Animation(60);
        this.layers = [];
        const backgroundLayer = new Background.EveningBackgroundLayer();
        const characterLayer = new CharacterLayer();
        const controlLayer = new ControlLayer();
        this.addLayer(backgroundLayer);
        this.addLayer(characterLayer);
        this.addLayer(controlLayer);
        controlLayer.displayNameButton.observerLayers.push(characterLayer);
        controlLayer.refreshButton.observerLayers.push(characterLayer);
        controlLayer.observerLayers = this.layers.reverse();
        this.animation.layers = this.layers;
        this.resize();
        window.addEventListener("resize", () => {
            this.resize();
        }, false);
    }
    resize() {
        for (const layer of this.layers) {
            layer.resize(window.innerWidth, window.innerHeight);
        }
    }
    addLayer(layer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
    }
}
export class MoonnightScenery {
    constructor(div) {
        this.div = div;
        this.animation = new Animation(60);
        this.layers = [];
        this.div.style.backgroundColor = "#003366";
        const backgroundLayer = new Background.MoonnightBackgroundLayer();
        const characterLayer = new CharacterLayer();
        const controlLayer = new ControlLayer();
        this.addLayer(backgroundLayer);
        this.addLayer(characterLayer);
        this.addLayer(controlLayer);
        controlLayer.displayNameButton.observerLayers.push(characterLayer);
        controlLayer.refreshButton.observerLayers.push(characterLayer);
        controlLayer.observerLayers = this.layers.reverse();
        this.animation.layers = this.layers;
        this.resize();
        window.addEventListener("resize", () => {
            this.resize();
        }, false);
    }
    resize() {
        for (const layer of this.layers) {
            layer.resize(window.innerWidth, window.innerHeight);
        }
    }
    addLayer(layer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
    }
}
export class WaveScenery {
    constructor(div) {
        this.div = div;
        this.animation = new Animation(60);
        this.layers = [];
        this.div.style.backgroundColor = "#3399dd";
        const backgroundLayer = new Background.WaveBackgroundLayer();
        const characterLayer = new CharacterLayer();
        const controlLayer = new ControlLayer();
        this.addLayer(backgroundLayer);
        this.addLayer(characterLayer);
        this.addLayer(controlLayer);
        controlLayer.displayNameButton.observerLayers.push(characterLayer);
        controlLayer.refreshButton.observerLayers.push(characterLayer);
        controlLayer.observerLayers = this.layers.reverse();
        this.animation.layers = this.layers;
        this.resize();
        window.addEventListener("resize", () => {
            this.resize();
        }, false);
    }
    resize() {
        for (const layer of this.layers) {
            layer.resize(window.innerWidth, window.innerHeight);
        }
    }
    addLayer(layer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
    }
}
/**
 * Animation Class
 */
class Animation {
    constructor(fps) {
        this.layers = [];
        this.timeoutId = null;
        this.actualFps = 0;
        this.fps = fps;
    }
    set fps(fps) {
        if (fps > 1) {
            this.interval = 1000 / fps;
        }
        else {
            this.interval = 1000;
        }
    }
    get fps() {
        return this.actualFps;
    }
    start() {
        let priorBeginTime = Date.now();
        let measurementPeriodEnd = priorBeginTime;
        let i = 0;
        const render = () => {
            const beginTime = Date.now();
            const actualInterval = beginTime - priorBeginTime;
            priorBeginTime = beginTime;
            for (const layer of this.layers) {
                layer.update(actualInterval);
            }
            // mesure the actual fps
            const finishTime = Date.now();
            if (measurementPeriodEnd >= finishTime) {
                i++;
            }
            else {
                this.actualFps = i;
                i = 1;
                const t = new Date(measurementPeriodEnd);
                const hh = ("0" + String(t.getHours())).slice(-2);
                const mm = ("0" + String(t.getMinutes())).slice(-2);
                const ss = ("0" + String(t.getSeconds())).slice(-2);
                console.debug(`${hh}:${mm}:${ss} ${this.actualFps} fps`);
                measurementPeriodEnd = Math.floor(finishTime / 1000) * 1000 + 999;
            }
            const timeout = this.interval - (finishTime - beginTime);
            this.timeoutId = setTimeout(render, timeout);
        };
        render();
    }
    stop() {
        if (this.timeoutId != null) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
}
