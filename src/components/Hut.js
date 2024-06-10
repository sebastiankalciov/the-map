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
    createObject(app, title = "", texture, position, size = {width: 100, height: 100}) {

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

        objectTitle.position.set((app.renderer.screen.width - position.x - .5 * title.length) / 2, (app.renderer.screen.height - position.y - 60) / 2);
        object.position.set((app.renderer.screen.width - position.x) / 2, (app.renderer.screen.height - position.y) / 2);

        // Set the size of the object

        object.width = size.width;
        object.height = size.height;

        // Make the object interactive to be able to access it

        object.interactive = true;
        object.buttonMode = true;

        // Add the components to the app

        app.stage.addChild(object);
        app.stage.addChild(objectTitle);

        return object;
    },

    createBookObject(app, texture, position) {

        const book = new PIXI.Sprite(texture);

        book.position.set((app.renderer.screen.width - position.x) / 2, (app.renderer.screen.height - position.y) / 2);
        book.texture.source.scaleMode = "nearest";

        book.width = 1000;
        book.height = 700;

        book.interactive = true;
        book.buttonMode = true;

        book.visible = false;

        app.stage.addChild(book);
        return book;
    },


};

export default Hut;