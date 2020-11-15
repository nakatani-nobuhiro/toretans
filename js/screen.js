export { Screen };
import * as Scenery from "./scenery.js";
/*
 * Screen Class
 */
class Screen {
    constructor(div) {
        this.div = div;
    }
    run() {
        const date = new Date();
        let scenery;
        switch (date.getMonth() + 1) {
            case 12:
            case 1:
            case 2:
                scenery = new Scenery.SnowScenery(this.div);
                break;
            case 4:
                scenery = new Scenery.SpringScenery(this.div);
                break;
            case 6:
                scenery = new Scenery.RainScenery(this.div);
                break;
            case 7:
            case 8:
                scenery = new Scenery.WaveScenery(this.div);
                break;
            case 9:
                scenery = new Scenery.MoonnightScenery(this.div);
                break;
            case 10:
            case 11:
                scenery = new Scenery.FallingLeavesScenery(this.div);
                break;
            default:
                scenery = new Scenery.BasicScenery(this.div);
                break;
        }
        //        scenery = new Scenery.EveningScenery(this.div);
        //        scenery = new Scenery.FallingLeavesScenery(this.div);
        scenery.animation.start();
    }
}
