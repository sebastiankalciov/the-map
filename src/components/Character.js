import * as PIXI from 'pixi.js';

const Character = {

    /**
     * # Create a Sprite
     * @param {PIXI_APPLICATION} app - Pixi Application
     * @param {*} texture - Image of the character
     * @returns Pixi Sprite
     */
    create(app, texture) {

        const character = PIXI.Sprite.from(texture);

        // Increase the resolution of the texture
        character.width = 200;
        character.height = 200;
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
     * # Move the character using keyboard
     * @param {*} app - Pixi Application
     * @param {*} keyController - Key Controller
     * @param {*} character - Pixi Sprite
     * @param {*} hut - Hut object
     */
    move (app, keyController, character) {

        const newXPosition = character.x + 3
        const newYPosition = character.y + 3
    
        const screenWidth = app.screen.width;
        const screenHeight = app.screen.height;
    
        // Calculate the boundaries of the screen
        const minWidth = character.width / 2; // Left boundary
        const maxWidth = screenWidth - character.width / 2; // Right boundary

        const minHeight = character.height / 2; // Top boundary
        const maxHeight = screenHeight - character.height / 2; // Bottom boundary

        // Check for every key pressed if the new position is still inside the screen
        if (keyController.keys.left.pressed) {

            if (newXPosition >= minWidth)
                character.x -= 3;
        }

        else if (keyController.keys.right.pressed) {

            if (newXPosition <= maxWidth)
                character.x += 3;
        }

        else if (keyController.keys.up.pressed) {

            if (newYPosition >= minHeight)
                character.y -= 3;
        }
        
        else if (keyController.keys.down.pressed) {

            if (newYPosition < maxHeight)
                character.y += 3;
        }

    }
};

export default Character;