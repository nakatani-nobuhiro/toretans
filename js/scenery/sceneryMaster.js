import * as sceneryBuilder from "./sceneryBuilder.js";
export const sceneryMaster = [
    { "iconImageSrc": "img/sceneryIcon/basic.png", "builder": new sceneryBuilder.BasicSceneryBuilder() },
    { "iconImageSrc": "img/sceneryIcon/spring.png", "builder": new sceneryBuilder.SpringSceneryBuilder() },
    { "iconImageSrc": "img/sceneryIcon/rain.png", "builder": new sceneryBuilder.RainSceneryBuilder() },
    { "iconImageSrc": "img/sceneryIcon/wave.png", "builder": new sceneryBuilder.WaveSceneryBuilder() },
    { "iconImageSrc": "img/sceneryIcon/moon.png", "builder": new sceneryBuilder.MoonnightSceneryBuilder() },
    { "iconImageSrc": "img/sceneryIcon/fallingLeaves.png", "builder": new sceneryBuilder.FallingLeavesSceneryBuilder() },
    { "iconImageSrc": "img/sceneryIcon/starryNight.png", "builder": new sceneryBuilder.StarryNightSceneryBuilder() },
    { "iconImageSrc": "img/sceneryIcon/snow.png", "builder": new sceneryBuilder.SnowSceneryBuilder() }
];
