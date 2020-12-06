import * as scenery from "./scenery.js";
export const sceneryMaster = [
    { "iconImageSrc": "img/sceneryIcon/basic.svg", "builder": new scenery.BasicSceneryBuilder() },
    { "iconImageSrc": "img/sceneryIcon/spring.png", "builder": new scenery.SpringSceneryBuilder() },
    { "iconImageSrc": "img/sceneryIcon/rain.png", "builder": new scenery.RainSceneryBuilder() },
    { "iconImageSrc": "img/sceneryIcon/wave.png", "builder": new scenery.WaveSceneryBuilder() },
    { "iconImageSrc": "img/sceneryIcon/moon.png", "builder": new scenery.MoonnightSceneryBuilder() },
    { "iconImageSrc": "img/sceneryIcon/fallingLeaves.png", "builder": new scenery.FallingLeavesSceneryBuilder() },
    { "iconImageSrc": "img/sceneryIcon/snow.png", "builder": new scenery.SnowSceneryBuilder() }
];
