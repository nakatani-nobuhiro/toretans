/**
 * The manager of the layers.
 * レイヤーのマネジャー
 */
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
            const layersReversed = this.layers.slice();
            for (const layer of layersReversed.reverse()) {
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
/**
 * Animation
 */
class Animation {
    constructor(fps = 60) {
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
