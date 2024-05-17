import * as PIXI from 'pixi.js';

const Hut = {

    /**
     * # Create a hut for a domain.
     * @param {PIXI_APPLICATION} app - Pixi Application
     * @param {string} name - Name of the domain
     * @param {PIXI_TEXTURE} texture - Image of the hut
     * @param {[x, y]} position - Position for where the hut should be placed
     * @returns 
     */
    create(app, name, texture, position) {

        const hut = new PIXI.Sprite(texture);


        const titleStyle = new PIXI.TextStyle({
            fontFamily: "Pixellari",
            fontSize: 20,
            fontVariant: "small-caps",
            fontWeight: "bold",
            fill: '#ffffff'
        });

        const hutTitle = new PIXI.Text({text: name, style: titleStyle});

        hutTitle.resolution = 3;
        // Set the position of the hut
        hutTitle.position.set((app.screen.width - position.x - 4 * name.length) / 2, (app.screen.height - position.y - 30) / 2);
        hut.position.set((app.screen.width - position.x) / 2, (app.screen.height - position.y) / 2);
        
        // Set the size of the hut

        hut.width = 75;
        hut.height = 75;
        
        // Make the hut interactive to be able to access it

        hut.interactive = true;
        hut.buttonMode = true;

        // Add the components to the app

        app.stage.addChild(hut);
        app.stage.addChild(hutTitle);

        return hut;
    }
};

export default Hut;