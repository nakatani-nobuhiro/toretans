export class Scenery {
    constructor() {
        this.layers = [];
        this.characterLayer = null;
    }
    addLayer(layer) {
        this.layers.push(layer);
        if (isICharacterLayer(layer)) {
            this.characterLayer = layer;
        }
    }
}
function isICharacterLayer(arg) {
    return arg != null &&
        typeof arg === "object" &&
        typeof arg.characterNameVisible === "boolean" &&
        "changeAllCharacters" in arg;
}
