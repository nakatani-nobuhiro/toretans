export class Animation {
    constructor() {
        this.layers = [];
        this._actualFps = 0;
        this._fps = 60;
    }
    set fps(fps) {
        if (fps >= 1) {
            this._fps = fps;
        }
    }
    get fps() {
        return this._fps;
    }
    get actualFps() {
        return this._actualFps;
    }
    start() {
        let previousStartTime = Date.now();
        let measurementPeriodEnd = previousStartTime;
        let i = 0;
        const render = () => {
            const currentStartTime = Date.now();
            const actualInterval = currentStartTime - previousStartTime;
            previousStartTime = currentStartTime;
            for (const layer of this.layers) {
                layer.update(actualInterval);
            }
            const finishTime = Date.now();
            if (measurementPeriodEnd >= finishTime) {
                i++;
            }
            else {
                this._actualFps = i;
                i = 1;
                measurementPeriodEnd = Math.floor(finishTime / 1000) * 1000 + 999;
                const t = new Date(measurementPeriodEnd);
                const hh = ("0" + String(t.getHours())).slice(-2);
                const mm = ("0" + String(t.getMinutes())).slice(-2);
                const ss = ("0" + String(t.getSeconds())).slice(-2);
                console.debug(`${hh}:${mm}:${ss} ${this._actualFps} fps`);
            }
            const timeout = (1000 / this._fps) - (Date.now() - currentStartTime);
            setTimeout(render, timeout);
        };
        render();
    }
}
