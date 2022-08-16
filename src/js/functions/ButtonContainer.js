export default class ButtonContainer{
    constructor(scene, x, y, text, callback, scale){
        const img = scene.add.image(0, 0, 'btn').setInteractive({ useHandCursor: true })
        .on("pointerdown", () => callback()).on("pointerover", ()=> img.setScale(scale - 0.02)).on("pointerout", ()=> img.setScale(scale))
        const txt = scene.add.text(0, 0, text, {fontSize: 30, fontStyle: 'bold'}).setOrigin(0.5)
        const arr = [img, txt]
        const container = scene.add.container(x, y, arr).setScale(scale)
    }
}
