export { CharacterLayer };
import { CanvasLayer } from "./layer.js";
import { characterMaster } from "./characterMaster.js";
class CharacterLayer extends CanvasLayer {
    constructor() {
        super();
        this.characters = [];
        this._characterNameVisible = false;
    }
    set characterNameVisible(bool) {
        this._characterNameVisible = bool;
        for (const character of this.characters) {
            character.nameVisible = bool;
        }
    }
    get characterNameVisible() {
        return this._characterNameVisible;
    }
    onClick(x, y) {
        for (const character of this.characters.slice().reverse()) {
            const isClicked = character.onClick(x, y);
            if (isClicked === true) {
                return true;
            }
        }
        return false;
    }
    refresh() {
        this.characters = [];
        const specs = (arr, num) => {
            const copyArr = arr.slice();
            const l = arr.length;
            // randamize
            for (let i = 0; i < l; i++) {
                const j = Math.floor(Math.random() * l);
                const tmp = copyArr[i];
                copyArr[i] = copyArr[j];
                copyArr[j] = tmp;
            }
            // num of records to return (if not specified, all records are returned)
            if (num === undefined) {
                num = l;
            }
            return copyArr.slice(0, num);
        };
        for (let spec of specs(characterMaster, 5)) {
            this.characters.push(new Character(this.canvas, spec));
        }
    }
    resize(width, height) {
        super.resize(width, height);
        for (const character of this.characters) {
            character.resize();
        }
    }
    update(milliseconds) {
        const context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const character of this.characters) {
            character.update(milliseconds);
        }
    }
}
class Character {
    constructor(canvas, master) {
        this.canvas = canvas;
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
        this.image = new Image();
        this.nameVisible = false;
        this.id = parseInt(master["id"]);
        this.name = master["name"];
        this.action = new CharacterMovement(this);
        this.image.onload = () => {
            this.resize();
            this.x = (this.canvas.width - this.width) / 2;
            this.y = (this.canvas.height - this.width) / 2;
        };
        this.image.src = `img/main/img${("00" + master["id"]).slice(-3)}.png`;
        this.sound = new Audio(`audio/main/${master["sound"]}.mp3`);
        if (this.id === 14) {
            this.characterActionOnClickFactory = new CharacterActionJumpingFactory(this);
            this.characterActionOnClickFactory.times = 2;
        }
        else if (this.id === 43) {
            this.characterActionOnClickFactory = new CharacterActionShakingFactory(this);
            this.characterActionOnClickFactory.times = 2;
        }
        else if (this.id === 44) {
            this.characterActionOnClickFactory = new CharacterActionPuffingFactory2(this);
        }
        else if (master["sound"] === "shinkansen") {
            this.characterActionOnClickFactory = new CharacterActionRevolvingFactory(this);
        }
        else if (master["sound"] === "cat") {
            this.characterActionOnClickFactory = new CharacterActionShakingFactory(this);
        }
        else if (master["sound"] === "locomotive") {
            this.characterActionOnClickFactory = new CharacterActionPuffingFactory1(this);
        }
        else {
            this.characterActionOnClickFactory = new CharacterActionJumpingFactory(this);
        }
    }
    onClick(x, y) {
        if (x > this.x &&
            x < this.x + this.width &&
            y > this.y &&
            y < this.y + this.height) {
            this.action = this.characterActionOnClickFactory.create();
            return true;
        }
        else {
            return false;
        }
    }
    resize() {
        this.width = Math.floor((this.canvas.width + this.canvas.height) / 10);
        this.height = Math.floor(this.image.height * (this.width / this.image.width));
    }
    update(milliseconds) {
        this.action.update(milliseconds);
        if (this.nameVisible === true) {
            const context = this.canvas.getContext("2d");
            context.font = Math.floor(this.width / 8) + "px sans-serif";
            context.textAlign = "center";
            context.textBaseline = "top";
            context.fillStyle = "#ffffff";
            context.fillText(this.name, this.x + this.width / 2, this.y + this.height);
        }
    }
}
class CharacterMovement {
    constructor(character) {
        this.character = character;
        this.dx = 0;
        this.dy = 0;
        this._angle = 0;
        this._velocity = 0;
        this.setRandomAngle();
        this.setRandomVelocity();
    }
    set angle(angle) {
        if (angle > Math.PI * 2) {
            this._angle = angle - (Math.PI * 2);
        }
        else if (angle < 0) {
            this._angle = angle + (Math.PI * 2);
        }
        else {
            this._angle = angle;
        }
        this.dx = Math.cos(this.angle) * this.velocity;
        this.dy = Math.sin(this.angle) * this.velocity;
    }
    get angle() {
        return this._angle;
    }
    set velocity(velocity) {
        this._velocity = velocity;
        this.dx = Math.cos(this.angle) * this.velocity;
        this.dy = Math.sin(this.angle) * this.velocity;
    }
    get velocity() {
        return this._velocity;
    }
    setRandomAngle() {
        this.angle = Math.random() * Math.PI * 2;
    }
    setRandomVelocity() {
        const maxVelocity = (this.character.canvas.width + this.character.canvas.height) / 5 / 1000;
        const minVelocity = (this.character.canvas.width + this.character.canvas.height) / 15 / 1000;
        this.velocity = (maxVelocity - minVelocity) * Math.random() + minVelocity;
    }
    update(milliseconds) {
        this.dx = Math.cos(this.angle) * this.velocity;
        this.dy = Math.sin(this.angle) * this.velocity;
        this.character.x += this.dx * milliseconds;
        this.character.y += this.dy * milliseconds;
        if (this.character.x < 0) {
            this.character.x *= -1;
            this.angle = Math.PI - this.angle;
        }
        else if (this.character.x > this.character.canvas.width - this.character.width) {
            this.character.x = ((this.character.canvas.width - this.character.width) * 2) - this.character.x;
            this.angle = Math.PI - this.angle;
        }
        if (this.character.y < 0) {
            this.character.y *= -1;
            this.angle = -this.angle;
        }
        else if (this.character.y > this.character.canvas.height - this.character.height) {
            this.character.y = ((this.character.canvas.height - this.character.height) * 2) - this.character.y;
            this.angle = -this.angle;
        }
        const context = this.character.canvas.getContext("2d");
        context.drawImage(this.character.image, this.character.x, this.character.y, this.character.width, this.character.height);
    }
}
class CharacterActionJumping {
    constructor(character) {
        this.character = character;
        this.times = 1;
        this.elapsedTime = 0;
        this.startY = this.character.y;
        this.character.sound.play();
    }
    update(milliseconds) {
        const actionTime = 700;
        const jumpingMaxHeight = this.character.width / 2;
        this.elapsedTime += milliseconds;
        if (this.elapsedTime < actionTime * this.times) {
            const t = this.elapsedTime % actionTime;
            this.character.y = (t - actionTime) * t * jumpingMaxHeight / (Math.pow(actionTime, 2) / 4)
                + this.startY;
        }
        else {
            this.character.y = this.startY;
            this.character.action = new CharacterMovement(this.character);
        }
        const context = this.character.canvas.getContext("2d");
        context.drawImage(this.character.image, this.character.x, this.character.y, this.character.width, this.character.height);
    }
}
class CharacterActionRevolving {
    constructor(character) {
        this.character = character;
        this.times = 1;
        this.elapsedTime = 0;
        this.character.sound.play();
        if (Math.random() > 0.5) {
            this.direction = 1;
        }
        else {
            this.direction = -1;
        }
    }
    update(milliseconds) {
        const actionTime = 800;
        const context = this.character.canvas.getContext("2d");
        this.elapsedTime += milliseconds;
        if (this.elapsedTime < actionTime * this.times) {
            context.save();
            context.translate(this.character.x + (this.character.width / 2), this.character.y + (this.character.height / 2));
            context.rotate((Math.PI * this.elapsedTime * 2 * this.direction) / actionTime);
            context.drawImage(this.character.image, -this.character.width / 2, -this.character.height / 2, this.character.width, this.character.height);
            context.restore();
        }
        else {
            context.drawImage(this.character.image, this.character.x, this.character.y, this.character.width, this.character.height);
            this.character.action = new CharacterMovement(this.character);
        }
    }
}
class CharacterActionShaking {
    constructor(character) {
        this.character = character;
        this.times = 1;
        this.elapsedTime = 0;
        this.character.sound.play();
        if (Math.random() > 0.5) {
            this.direction = 1;
        }
        else {
            this.direction = -1;
        }
    }
    update(milliseconds) {
        const actionTime = 800;
        const context = this.character.canvas.getContext("2d");
        this.elapsedTime += milliseconds;
        if (this.elapsedTime < actionTime * this.times) {
            context.save();
            context.translate(this.character.x + (this.character.width / 2), this.character.y + this.character.height);
            context.rotate((Math.sin(Math.PI * 2 * this.elapsedTime / actionTime) * this.direction / 2));
            context.drawImage(this.character.image, -this.character.width / 2, -this.character.height, this.character.width, this.character.height);
            context.restore();
        }
        else {
            context.drawImage(this.character.image, this.character.x, this.character.y, this.character.width, this.character.height);
            this.character.action = new CharacterMovement(this.character);
        }
    }
}
class CharacterActionPuffing1 {
    constructor(character) {
        this.character = character;
        this.times = 3;
        this.elapsedTime = 0;
        this.puffs = [];
        this.character.sound.play();
    }
    update(milliseconds) {
        const context = this.character.canvas.getContext("2d");
        const actionTime = 500;
        this.elapsedTime += milliseconds;
        if (this.elapsedTime < actionTime * this.times) {
            if (this.elapsedTime < actionTime * (this.times - 1)) {
                this.puffs.push({ elapsedTime: 0, subtense: (Math.random() - 0.5) * this.character.width });
            }
            for (const puff of this.puffs) {
                puff.elapsedTime += milliseconds;
                const progress = puff.elapsedTime < actionTime ? puff.elapsedTime / actionTime : 1;
                const r = this.character.width / 10 + (this.character.width / 5) * progress;
                const y = this.character.y - this.character.width * Math.sin(Math.PI / 2 * progress);
                const x = this.character.x + this.character.width / 2 + puff.subtense * progress;
                const alpha = 1 - progress;
                context.fillStyle = "#ffffff";
                context.globalAlpha = alpha;
                context.beginPath();
                context.arc(x, y, r, 0, Math.PI * 2);
                context.closePath();
                context.fill();
            }
            context.globalAlpha = 1;
            context.drawImage(this.character.image, this.character.x, this.character.y, this.character.width, this.character.height);
        }
        else {
            context.drawImage(this.character.image, this.character.x, this.character.y, this.character.width, this.character.height);
            this.character.action = new CharacterMovement(this.character);
        }
    }
}
class CharacterActionPuffing2 {
    constructor(character) {
        this.character = character;
        this.times = 3;
        this.elapsedTime = 0;
        this.puffs = [];
        this.character.sound.play();
    }
    update(milliseconds) {
        const context = this.character.canvas.getContext("2d");
        const actionTime = 800;
        this.elapsedTime += milliseconds;
        if (this.elapsedTime < (actionTime / 2) * (this.times + 1)) {
            if (this.elapsedTime * 2 / actionTime > this.puffs.length
                && this.puffs.length < this.times + 1) {
                this.puffs.push({ elapsedTime: 0 });
            }
            for (const puff of this.puffs) {
                puff.elapsedTime += milliseconds;
                const progress = puff.elapsedTime < actionTime ? puff.elapsedTime / actionTime : 1;
                const r = this.character.width / 10 + (this.character.width / 5) * progress;
                const y = this.character.y - this.character.width * Math.sin(Math.PI / 2 * progress);
                const x = this.character.x + this.character.width / 2;
                const alpha = 1 - progress;
                context.fillStyle = "#ffffff";
                context.globalAlpha = alpha;
                context.beginPath();
                context.arc(x, y, r, 0, Math.PI * 2);
                context.closePath();
                context.fill();
            }
            context.globalAlpha = 1;
            context.drawImage(this.character.image, this.character.x, this.character.y, this.character.width, this.character.height);
        }
        else {
            context.drawImage(this.character.image, this.character.x, this.character.y, this.character.width, this.character.height);
            this.character.action = new CharacterMovement(this.character);
        }
    }
}
class CharacterActionJumpingFactory {
    constructor(character) {
        this.character = character;
    }
    create() {
        const action = new CharacterActionJumping(this.character);
        if (this.times != undefined) {
            action.times = this.times;
        }
        return action;
    }
}
class CharacterActionRevolvingFactory {
    constructor(character) {
        this.character = character;
    }
    create() {
        const action = new CharacterActionRevolving(this.character);
        if (this.times != undefined) {
            action.times = this.times;
        }
        return action;
    }
}
class CharacterActionShakingFactory {
    constructor(character) {
        this.character = character;
    }
    create() {
        const action = new CharacterActionShaking(this.character);
        if (this.times != undefined) {
            action.times = this.times;
        }
        return action;
    }
}
class CharacterActionPuffingFactory1 {
    constructor(character) {
        this.character = character;
    }
    create() {
        const action = new CharacterActionPuffing1(this.character);
        if (this.times != undefined) {
            action.times = this.times;
        }
        return action;
    }
}
class CharacterActionPuffingFactory2 {
    constructor(character) {
        this.character = character;
    }
    create() {
        const action = new CharacterActionPuffing2(this.character);
        if (this.times != undefined) {
            action.times = this.times;
        }
        return action;
    }
}
