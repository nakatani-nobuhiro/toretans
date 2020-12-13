import { ControlPanelLayer } from "./controlLayer.js";
import { DefaultSceneryBuilder } from "../scenery/sceneryBuilder.js";
import { ScenerySelectionLayer } from "./scenerySelection.js";
export class Controller {
    constructor(layerManager) {
        this.layerManager = layerManager;
        this.controlPanel = new ControlPanelLayer();
        this.controlPanel.scenerySelectionButton.observers.push(new ScenerySelectionButtonObserver(this));
        this.controlPanel.characterChangingButton.observers.push(new CharacterChangingButtonObserver(this));
        this.controlPanel.characterNameButton.observers.push(new CharacterNameButtonObserver(this));
        this.scenery = new DefaultSceneryBuilder().build();
        new ScenerySelectionObserver(this).update(this.scenery);
    }
}
export class ScenerySelectionObserver {
    constructor(controller) {
        this.controller = controller;
    }
    update(scenery) {
        this.controller.layerManager.removeAllLayers();
        this.controller.scenery = scenery;
        scenery.layers.forEach((layer) => {
            this.controller.layerManager.addLayer(layer);
        });
        this.controller.layerManager.addLayer(this.controller.controlPanel);
    }
}
class ScenerySelectionButtonObserver {
    constructor(controller) {
        this.controller = controller;
    }
    update() {
        const scenerySelectionLayer = new ScenerySelectionLayer(new ScenerySelectionObserver(this.controller));
        this.controller.layerManager.addLayer(scenerySelectionLayer);
    }
}
class CharacterChangingButtonObserver {
    constructor(controller) {
        this.controller = controller;
    }
    update() {
        if (this.controller.scenery.characterLayer != null) {
            this.controller.scenery.characterLayer.changeAllCharacters();
        }
    }
}
class CharacterNameButtonObserver {
    constructor(controller) {
        this.controller = controller;
    }
    update() {
        if (this.controller.scenery.characterLayer != null) {
            this.controller.scenery.characterLayer.characterNameVisible =
                !this.controller.scenery.characterLayer.characterNameVisible;
        }
    }
}
