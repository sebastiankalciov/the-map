
import { Container } from 'pixi.js';


export class Character { 

    constructor() {
        
        this.state = {
            walk: false,
            run: false,
            hover: false,
            jump: false,
        };

        this.view = new Container();
        this.directionalView = new Container();
    }

    // Return character's facing direction.
    get direction() {
        return this.directionalView.scale.x > 0 ? 1 : -1;
    }

    // Set character's facing direction.
    set direction(value) {
        this.directionalView.scale.x = value;
    }
}
