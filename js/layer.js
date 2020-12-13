export { Layer };
class Layer {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.style.position = "absolute";
        this.canvas.style.left = "0px";
        this.canvas.style.top = "0px";
    }
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    onClick(x, y) {
        return false;
    }
    update(milliseconds) {
    }
}
