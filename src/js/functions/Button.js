export default class Button {
    constructor(scene, x, y, texture, callback) {
        const button = scene.add
            .image(x, y, texture)
            .setOrigin(0.5)
            .setInteractive()
            .on("pointerdown", ()=>callback())
    }
}
