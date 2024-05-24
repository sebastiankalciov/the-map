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
    createBook(app, {left: textLeftPart, right: textRightPart}, texture, position) {

        const book = new PIXI.Sprite(texture);

        // Add text
        const textStyle = new PIXI.TextStyle({
            fontFamily: "OpenSans",
            fontSize: 15,
            fontWeight: "bold",
            wordWrap: true,
            wordWrapWidth: 390,
            fill: '#161616'
        });

        let textLeftObject = new PIXI.Text({
            text: textLeftPart,
            style: textStyle
        });

        let textRightObject = new PIXI.Text({
            text: textRightPart,
            style: textStyle
        });

        // Set the resolution of the text
        textLeftObject.resolution = 3;
        textRightObject.resolution = 3;

        // Set the position of the text
        textLeftObject.position.set((app.renderer.screen.width - position.x) / 2 + 55, (app.renderer.screen.height - position.y) / 2 + 20);
        textRightObject.position.set((app.renderer.screen.width + position.x) / 2 - 420, (app.renderer.screen.height - position.y) / 2 + 20);

        // Set the position of the book
        book.position.set((app.renderer.screen.width - position.x) / 2, (app.renderer.screen.height - position.y) / 2);

        // Set the size of the book
        book.texture.source.scaleMode = "nearest";
        book.width = 1000;
        book.height = 700;

        // Make the book interactive to be able to access it

        book.interactive = true;
        book.buttonMode = true;

        // Add the components to the app
        book.visible = false;
        //textLeftObject.visible = false;
        //textRightObject.visible = false;

        app.stage.addChild(book);
        app.stage.addChild(textLeftObject);
        app.stage.addChild(textRightObject);
        return book;
    },

};

export default Hut;