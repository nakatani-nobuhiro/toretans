import { Animation } from "./animation.js";
export class LayerManager {
    constructor(div) {
        this.div = div;
        this.layers = [];
        this.animation = new Animation();
        this.resize();
        this.animation.layers = this.layers;
        window.addEventListener("resize", () => {
            this.resize();
        }, false);
        this.div.addEventListener("click", (event) => {
            const rect = this.div.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            for (const layer of this.layers.slice().reverse()) {
                if (layer.onClick(x, y) === true) {
                    break;
                }
            }
        }, false);
    }
    addLayer(layer) {
        this.layers.push(layer);
        this.div.appendChild(layer.canvas);
        this.animation.layers = this.layers;
        this.resize();
    }
    removeAllLayers() {
        this.layers = [];
        while (this.div.firstChild) {
            this.div.removeChild(this.div.firstChild);
        }
    }
    resize() {
        for (const layer of this.layers) {
            layer.resize(window.innerWidth, window.innerHeight);
        }
    }
}
