const app = new PIXI.Application();

await app.init({ width: 1000, height:600 })

document.body.appendChild(app.canvas);

await PIXI.Assets.load('../img.png');

let sprite = PIXI.Sprite.from('../img.png');

app.stage.addChild(sprite);