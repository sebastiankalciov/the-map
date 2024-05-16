import * as PIXI from 'pixi.js';

const Hut = {

    /**
     * Create a hut for a domain.
     * @param {PIXI_APPLICATION} app - Pixi Application
     * @param {string} name - Name of the domain
     * @param {PIXI_TEXTURE} texture - Image of the hut
     * @param {[x, y]} position - Position for where the hut should be placed
     * @returns 
     */
    create(app, name, texture, position) {
        
        const hut = new PIXI.Sprite(texture);

        const titleStyle = new PIXI.TextStyle({
            fontFamily: 'monospace',
            fontSize: 15,
            fill: '#ffffff'
        });

        const hutTitle = new PIXI.Text({text: name, style: titleStyle});

        // Set the position of the hut

        hutTitle.position.set((app.screen.width - position.x - 20) / 2, (app.screen.height - position.y - 50) / 2);
        hut.position.set((app.screen.width - position.x) / 2, (app.screen.height - position.y) / 2);
        
        // Set the size of the hut

        hut.width = 100;
        hut.height = 100;
        
        // Make the hut interactive to be able to access the page

        hut.interactive = true;
        hut.buttonMode = true;

        // Add the components to the app

        app.stage.addChild(hut);
        app.stage.addChild(hutTitle);

        return hut;
    }
};

export default Hut;