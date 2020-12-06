import { CharacterLayer } from "./characterLayer.js";
import * as Background from "./backgroundLayer.js";
/**
 * Scenery Class
 * シーナリー・クラス
 */
export class Scenery {
    constructor() {
        this.layers = [];
        this.characterLayer = null;
    }
    addLayer(layer) {
        this.layers.push(layer);
        if (layer instanceof CharacterLayer) {
            this.characterLayer = layer;
        }
    }
}
/**
 * Default Scenery Builder
 * デフォルト・シーナリーのビルダー
 */
export class DefaultSceneryBuilder {
    constructor() { }
    build() {
        return new BasicSceneryBuilder().build();
    }
}
/**
 * Basic Scenery Builder
 * 基本シーナリーのビルダー
 */
export class BasicSceneryBuilder {
    constructor() { }
    build() {
        const scenery = new Scenery();
        scenery.addLayer(new Background.BasicBackgroundLayer());
        scenery.addLayer(new CharacterLayer());
        return scenery;
    }
}
/**
 * Snow Scenery Builder
 * 雪景色のビルダー
 */
export class SnowSceneryBuilder {
    constructor() { }
    build() {
        const scenery = new Scenery();
        const background = new Background.SnowingBackgroundLayer();
        background.canvas.style.backgroundColor = "#001122";
        scenery.addLayer(background);
        scenery.addLayer(new CharacterLayer());
        return scenery;
    }
}
/**
 * Spring Scenery Builder
 * 春景色のビルダー
 */
export class SpringSceneryBuilder {
    constructor() { }
    build() {
        const scenery = new Scenery();
        const background = new Background.SpringBackgroundLayer();
        background.canvas.style.backgroundColor = "#66ccff";
        scenery.addLayer(background);
        scenery.addLayer(new CharacterLayer());
        return scenery;
    }
}
/**
 * Rain Scenery Builder
 * 雨模様のビルダー
 */
export class RainSceneryBuilder {
    constructor() { }
    build() {
        const scenery = new Scenery();
        const background = new Background.RainBackgroundLayer();
        background.canvas.style.backgroundColor = "#337799";
        scenery.addLayer(background);
        scenery.addLayer(new CharacterLayer());
        return scenery;
    }
}
/**
 * Falling Leaves Scenery Builder
 * 落葉の景色のビルダー
 */
export class FallingLeavesSceneryBuilder {
    constructor() { }
    build() {
        const scenery = new Scenery();
        const background = new Background.FallingLeavesBackgroundLayer();
        background.canvas.style.backgroundImage = "linear-gradient(#d36950, #f4c14e)";
        scenery.addLayer(background);
        scenery.addLayer(new CharacterLayer());
        return scenery;
    }
}
/**
 * Moonnight Scenery Builder
 * 月夜のビルダー
 */
export class MoonnightSceneryBuilder {
    constructor() { }
    build() {
        const scenery = new Scenery();
        const background = new Background.MoonnightBackgroundLayer();
        background.canvas.style.backgroundColor = "#003366";
        scenery.addLayer(background);
        scenery.addLayer(new CharacterLayer());
        return scenery;
    }
}
/**
 * Wave Scenery Builder
 * 海のビルダー
 */
export class WaveSceneryBuilder {
    constructor() { }
    build() {
        const scenery = new Scenery();
        const background = new Background.WaveBackgroundLayer();
        background.canvas.style.backgroundColor = "#3399dd";
        scenery.addLayer(background);
        scenery.addLayer(new CharacterLayer());
        return scenery;
    }
}
/**
 * Evening Scenery Builder
 * 男鹿の夕景のビルダー
 */
/*
 export class EveningSceneryBuilder implements ISceneryBuilder {
    constructor() {}
    build(): Scenery{
        const scenery = new Scenery();

        const background = new Background.EveningBackgroundLayer();

        scenery.addLayer(background);
        scenery.addLayer(new CharacterLayer());

        return scenery;
    }
}
*/
