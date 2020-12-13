import { BasicCharacterLayer } from "./characterLayer.js";
import { Scenery } from "./scenery.js";
import * as Background from "./backgroundLayer.js";
export class DefaultSceneryBuilder {
    constructor() { }
    build() {
        const date = new Date();
        switch (date.getMonth() + 1) {
            case 12:
                return new StarryNightSceneryBuilder().build();
            case 1:
            case 2:
                return new SnowSceneryBuilder().build();
            case 4:
                return new SpringSceneryBuilder().build();
            case 6:
                return new RainSceneryBuilder().build();
            case 7:
            case 8:
                return new WaveSceneryBuilder().build();
            case 9:
                return new MoonnightSceneryBuilder().build();
            case 10:
            case 11:
                return new FallingLeavesSceneryBuilder().build();
            default:
                return new BasicSceneryBuilder().build();
        }
    }
}
export class BasicSceneryBuilder {
    constructor() { }
    build() {
        const scenery = new Scenery();
        const background = new Background.BasicBackgroundLayer();
        background.canvas.style.backgroundColor = "#66ccff";
        scenery.addLayer(background);
        scenery.addLayer(new BasicCharacterLayer());
        return scenery;
    }
}
export class SnowSceneryBuilder {
    constructor() { }
    build() {
        const scenery = new Scenery();
        const background = new Background.SnowingBackgroundLayer();
        background.canvas.style.backgroundColor = "#001122";
        scenery.addLayer(background);
        scenery.addLayer(new BasicCharacterLayer());
        return scenery;
    }
}
export class SpringSceneryBuilder {
    constructor() { }
    build() {
        const scenery = new Scenery();
        const background = new Background.SpringBackgroundLayer();
        background.canvas.style.backgroundColor = "#66ccff";
        scenery.addLayer(background);
        scenery.addLayer(new BasicCharacterLayer());
        return scenery;
    }
}
export class RainSceneryBuilder {
    constructor() { }
    build() {
        const scenery = new Scenery();
        const background = new Background.RainBackgroundLayer();
        background.canvas.style.backgroundColor = "#337799";
        scenery.addLayer(background);
        scenery.addLayer(new BasicCharacterLayer());
        return scenery;
    }
}
export class FallingLeavesSceneryBuilder {
    constructor() { }
    build() {
        const scenery = new Scenery();
        const background = new Background.FallingLeavesBackgroundLayer();
        background.canvas.style.backgroundImage = "linear-gradient(#d36950, #f4c14e)";
        scenery.addLayer(background);
        scenery.addLayer(new BasicCharacterLayer());
        return scenery;
    }
}
export class MoonnightSceneryBuilder {
    constructor() { }
    build() {
        const scenery = new Scenery();
        const background = new Background.MoonnightBackgroundLayer();
        background.canvas.style.backgroundColor = "#003366";
        scenery.addLayer(background);
        scenery.addLayer(new BasicCharacterLayer());
        return scenery;
    }
}
export class WaveSceneryBuilder {
    constructor() { }
    build() {
        const scenery = new Scenery();
        const background = new Background.WaveBackgroundLayer();
        background.canvas.style.backgroundColor = "#3399dd";
        scenery.addLayer(background);
        scenery.addLayer(new BasicCharacterLayer());
        return scenery;
    }
}
export class StarryNightSceneryBuilder {
    constructor() { }
    build() {
        const scenery = new Scenery();
        const background = new Background.StarryNightBackgroundLayer();
        background.canvas.style.backgroundColor = "#003366";
        scenery.addLayer(background);
        scenery.addLayer(new BasicCharacterLayer());
        return scenery;
    }
}
