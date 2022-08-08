export default class Button {
    constructor(scene, x, y, atlas, texture, callback, scale) {
        const button = scene.add
            .image(x, y, atlas, texture)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => callback()).setScale(scale)
    }
}
