import * as PIXI from 'pixi.js';

const Hut = {

    /**
     * # Create an object
     * @param {*} app - Pixi Application
     * @param {string} title - Name of the object
     * @param {*} texture - Image of the object
     * @param {{x: number, y: number}} position - Position for where the object should be placed
     * @returns
     */
    createObject(app, title = "", texture, position) {

        const object = new PIXI.Sprite(texture);

        const titleStyle = new PIXI.TextStyle({
            fontFamily: "OpenSans",
            fontSize: 22,
            //fontVariant: "small-caps",
            fontWeight: "bold",
            fill: '#ffffff'
        });

        const objectTitle = new PIXI.Text({text: title, style: titleStyle});

        objectTitle.resolution = 3;
        object.texture.source.scaleMode = "nearest";
        // Set the position of the object

        objectTitle.position.set((app.renderer.screen.width - position.x - 4 * title.length) / 2, (app.renderer.screen.height - position.y - 60) / 2);
        object.position.set((app.renderer.screen.width - position.x) / 2, (app.renderer.screen.height - position.y) / 2);

        // Set the size of the object

        object.width = 100;
        object.height = 100;

        // Make the object interactive to be able to access it

        object.interactive = true;
        object.buttonMode = true;

        // Add the components to the app

        app.stage.addChild(object);
        app.stage.addChild(objectTitle);

        return object;
    }
};

export default Hut;