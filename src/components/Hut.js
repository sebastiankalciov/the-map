import * as PIXI from 'pixi.js';

const Hut = {

    /**
     * # Create a PIXI object
     * @param {*} app - Pixi Application
     * @param {string} title - Name of the object
     * @param {*} texture - Image of the object
     * @param {{x: number, y: number}} position - Position for where the object should be placed
     * @returns
     */
    createObject(app, title = "", texture, position, size = {width: 100, height: 100}) {

        const object = new PIXI.Sprite(texture);

        const titleStyle = new PIXI.TextStyle({
            fontFamily: "OpenSans",
            fontSize: 22,
            fontWeight: "bold",
            fill: '#ffffff'
        });

        const objectTitle = new PIXI.Text({text: title, style: titleStyle});

        objectTitle.resolution = 3;
        object.texture.source.scaleMode = "nearest";

        // Set the position of the object

        objectTitle.position.set((app.renderer.screen.width * position.x - 2 * title.length), (app.renderer.screen.height * position.y - 35));
        object.position.set((app.renderer.screen.width * position.x), (app.renderer.screen.height * position.y));

        // Set the size of the object
		const maxHutSize = 100;
		const minHutSize = 50;
		const baseScale = Math.min(app.renderer.screen.width, app.renderer.screen.height) * 0.1;
		object.width = Math.max(minHutSize, baseScale);
		object.height = Math.max(minHutSize, baseScale);


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