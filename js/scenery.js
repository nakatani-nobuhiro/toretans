import { CharacterLayer } from "./characterLayer.js";
import * as Background from "./backgroundLayer.js";
/**
 * Scenery Class
 **/
export class Scenery {
    constructor(div) {
        this.div = div;
        this.layers = [];
    }
    remove() {
        this.layers.forEach((layer) => { this.div.removeChild(layer.canvas); });
    }
    addLayer(layer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
        if (layer instanceof CharacterLayer) {
            this.characterLayer = layer;
        }
    }
}
export class BasicSceneryBuilder {
    constructor(div) {
        this.div = div;
    }
    build() {
        const scenery = new Scenery(this.div);
        scenery.addLayer(new Background.BasicBackgroundLayer());
        scenery.addLayer(new CharacterLayer());
        return scenery;
    }
}
export class SnowSceneryBuilder {
    constructor(div) {
        this.div = div;
    }
    build() {
        const scenery = new Scenery(this.div);
        scenery.addLayer(new Background.SnowingBackgroundLayer());
        scenery.addLayer(new CharacterLayer());
        return scenery;
    }
}
/*
export class SpringScenery implements IScenery{
    public animation: Animation = new Animation(60);

    private layers: ILayer[] = [];

    constructor(private div: HTMLDivElement) {
        this.div.style.backgroundColor = "#66ccff";

        const backgroundLayer: CanvasLayer = new Background.SpringBackgroundLayer();
        const characterLayer: ICharacterLayer = new CharacterLayer();
        const controlLayer: ControlLayer = new ControlLayer();

        this.addLayer(backgroundLayer);
        this.addLayer(characterLayer);
        this.addLayer(controlLayer);

        controlLayer.displayNameButton.observerLayers.push(characterLayer)
        controlLayer.refreshButton.observerLayers.push(characterLayer)
        controlLayer.observerLayers = this.layers.reverse();

        this.animation.layers = this.layers;

        this.resize();

        window.addEventListener("resize", () => {
            this.resize();
        }, false);
    }
    private resize() {
        for (const layer of this.layers) {
            layer.resize(window.innerWidth, window.innerHeight);
        }
    }
    private addLayer(layer: ILayer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
    }
}

export class RainScenery implements IScenery{
    public animation: Animation = new Animation(60);

    private layers: ILayer[] = [];

    constructor(private div: HTMLDivElement) {
        this.div.style.backgroundColor = "#337799";

        const backgroundLayer: CanvasLayer = new Background.RainBackgroundLayer();
        const characterLayer: ICharacterLayer = new CharacterLayer();
        const controlLayer: ControlLayer = new ControlLayer();

        this.addLayer(backgroundLayer);
        this.addLayer(characterLayer);
        this.addLayer(controlLayer);

        controlLayer.displayNameButton.observerLayers.push(characterLayer)
        controlLayer.refreshButton.observerLayers.push(characterLayer)
        controlLayer.observerLayers = this.layers.reverse();

        this.animation.layers = this.layers;

        this.resize();

        window.addEventListener("resize", () => {
            this.resize();
        }, false);
    }
    private resize() {
        for (const layer of this.layers) {
            layer.resize(window.innerWidth, window.innerHeight);
        }
    }
    private addLayer(layer: ILayer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
    }
}

export class FallingLeavesScenery implements IScenery{
    public animation: Animation = new Animation(60);

    private layers: ILayer[] = [];

    constructor(private div: HTMLDivElement) {
        this.div.style.backgroundImage = "linear-gradient(#d36950, #f4c14e)";

        const backgroundLayer: CanvasLayer = new Background.FallingLeavesBackgroundLayer();
        const characterLayer: ICharacterLayer = new CharacterLayer();
        const controlLayer: ControlLayer = new ControlLayer();

        this.addLayer(backgroundLayer);
        this.addLayer(characterLayer);
        this.addLayer(controlLayer);

        controlLayer.displayNameButton.observerLayers.push(characterLayer)
        controlLayer.refreshButton.observerLayers.push(characterLayer)
        controlLayer.observerLayers = this.layers.reverse();

        this.animation.layers = this.layers;

        this.resize();

        window.addEventListener("resize", () => {
            this.resize();
        }, false);
    }
    private resize() {
        for (const layer of this.layers) {
            layer.resize(window.innerWidth, window.innerHeight);
        }
    }
    private addLayer(layer: ILayer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
    }
}

export class EveningScenery implements IScenery{
    public animation: Animation = new Animation(60);

    private layers: ILayer[] = [];

    constructor(private div: HTMLDivElement) {
        const backgroundLayer: CanvasLayer = new Background.EveningBackgroundLayer();
        const characterLayer: ICharacterLayer = new CharacterLayer();
        const controlLayer: ControlLayer = new ControlLayer();

        this.addLayer(backgroundLayer);
        this.addLayer(characterLayer);
        this.addLayer(controlLayer);

        controlLayer.displayNameButton.observerLayers.push(characterLayer)
        controlLayer.refreshButton.observerLayers.push(characterLayer)
        controlLayer.observerLayers = this.layers.reverse();

        this.animation.layers = this.layers;

        this.resize();

        window.addEventListener("resize", () => {
            this.resize();
        }, false);
    }
    private resize() {
        for (const layer of this.layers) {
            layer.resize(window.innerWidth, window.innerHeight);
        }
    }
    private addLayer(layer: ILayer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
    }
}

export class MoonnightScenery implements IScenery{
    public animation: Animation = new Animation(60);

    private layers: ILayer[] = [];

    constructor(private div: HTMLDivElement) {
        this.div.style.backgroundColor = "#003366";

        const backgroundLayer: CanvasLayer = new Background.MoonnightBackgroundLayer();
        const characterLayer: ICharacterLayer = new CharacterLayer();
        const controlLayer: ControlLayer = new ControlLayer();

        this.addLayer(backgroundLayer);
        this.addLayer(characterLayer);
        this.addLayer(controlLayer);

        controlLayer.displayNameButton.observerLayers.push(characterLayer)
        controlLayer.refreshButton.observerLayers.push(characterLayer)
        controlLayer.observerLayers = this.layers.reverse();

        this.animation.layers = this.layers;

        this.resize();

        window.addEventListener("resize", () => {
            this.resize();
        }, false);
    }
    private resize() {
        for (const layer of this.layers) {
            layer.resize(window.innerWidth, window.innerHeight);
        }
    }
    private addLayer(layer: ILayer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
    }
}

export class WaveScenery implements IScenery{
    public animation: Animation = new Animation(60);

    private layers: ILayer[] = [];

    constructor(private div: HTMLDivElement) {
        this.div.style.backgroundColor = "#3399dd";

        const backgroundLayer: CanvasLayer = new Background.WaveBackgroundLayer();
        const characterLayer: ICharacterLayer = new CharacterLayer();
        const controlLayer: ControlLayer = new ControlLayer();

        this.addLayer(backgroundLayer);
        this.addLayer(characterLayer);
        this.addLayer(controlLayer);

        controlLayer.displayNameButton.observerLayers.push(characterLayer)
        controlLayer.refreshButton.observerLayers.push(characterLayer)
        controlLayer.observerLayers = this.layers.reverse();

        this.animation.layers = this.layers;

        this.resize();

        window.addEventListener("resize", () => {
            this.resize();
        }, false);
    }
    private resize() {
        for (const layer of this.layers) {
            layer.resize(window.innerWidth, window.innerHeight);
        }
    }
    private addLayer(layer: ILayer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
    }
}

*/
