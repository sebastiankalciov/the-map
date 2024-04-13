
import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js';

const PixiCanvas = () => {
    useEffect(() => {

        const app = new PIXI.Application();

        app.init({ background: '#1099bb', resizeTo: window });

        document.getElementById('pixi-container').appendChild(app.view);


        const texture = Assets.load('https://pixijs.com/assets/bunny.png');

     
        const bunny = new Sprite(texture);


        bunny.anchor.set(0.5);

      
        bunny.x = app.screen.width / 2;
        bunny.y = app.screen.height / 2;
        
        app.stage.addChild(bunny);
        return () => {
           
            app.destroy(true);
        };
    }, []);

    return <div id="pixi-container" />;
};

export default PixiCanvas;