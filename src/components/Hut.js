import * as PIXI from 'pixi.js';

const Hut = {

    /**
     * # Create a hut for a domain.
     * @param {*} app - Pixi Application
     * @param {string} name - Name of the domain
     * @param {*} texture - Image of the hut
     * @param {{x: number, y: number}} position - Position for where the hut should be placed
     * @returns 
     */
    create(app, name, texture, position) {

        const hut = new PIXI.Sprite(texture);

        const titleStyle = new PIXI.TextStyle({
            fontFamily: "OpenSans",
            fontSize: 22,
            //fontVariant: "small-caps",
            fontWeight: "bold",
            fill: '#ffffff'
        });

        const hutTitle = new PIXI.Text({text: name, style: titleStyle});

        hutTitle.resolution = 3;

        // Set the position of the hut

        hutTitle.position.set((app.screen.width - position.x - 4 * name.length) / 2, (app.screen.height - position.y - 60) / 2);
        hut.position.set((app.screen.width - position.x) / 2, (app.screen.height - position.y) / 2);
        
        // Set the size of the hut

        hut.width = 100;
        hut.height = 100;
        
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