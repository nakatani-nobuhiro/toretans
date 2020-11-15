export { CanvasLayer };
class CanvasLayer {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
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
}
