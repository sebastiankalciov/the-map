import * as PIXI from 'pixi.js';


const Character = {

    /**
     * Create a Sprite
     * @param {PIXI_APPLICATION} app - Pixi Application
     * @param {*} texture - Image of the character
     * @returns Pixi Sprite
     */
    create(app, texture) {

        const character = PIXI.Sprite.from(texture);

        // Increase the resolution of the texture

        character.texture.source.scaleMode = "nearest";

        // Set the position of the character
        
        character.anchor.set(0.5);

        character.position.set(
            app.renderer.screen.width / 2,
            app.renderer.screen.height / 2
        );

        // Add the component to the app

        app.stage.addChild(character);
        
        return character;
    },
    

    /**
     * Move the character
     * @param {*} keyController 
     * @param {*} character 
     * @param {*} hut 
     */
    move (app, keyController, character) {

        const newX = character.x + 3
        const newY = character.y + 3
    
        // Get the dimensions of the screen
        const screenWidth = app.screen.width;
        const screenHeight = app.screen.height;
    
        // Calculate the boundaries of the screen
        const minX = character.width / 2; // Left boundary
        const maxX = screenWidth - character.width / 2; // Right boundary
        const minY = character.height / 2; // Top boundary
        const maxY = screenHeight - character.height / 2; // Bottom boundary

        if (keyController.keys.left.pressed) {
            if (newX >= minX)
                character.x -= 3;
    
        }
        else if (keyController.keys.right.pressed) {
            if (newX <= maxX)
                character.x += 3;
        }
        else if (keyController.keys.up.pressed) {
            if (newY >= minY)
                character.y -= 3;
            else
            alert("UNDE FUGI???")
        }
        else if (keyController.keys.down.pressed) {
            if (newY < maxY)
                character.y += 3;
        }

    }
};

export default Character;