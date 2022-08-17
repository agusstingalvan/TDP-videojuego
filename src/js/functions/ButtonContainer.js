export default class ButtonContainer{
    constructor(scene, x, y, text, callback, scale){
        const txt = scene.add.text(0, 0, text, {fontSize: 30, fontStyle: 'bold'}).setOrigin(0.5)
        const img = scene.add.image(0, 0, 'btn').setInteractive({ useHandCursor: true })
        .on("pointerdown", () => callback()).on("pointerover", ()=> {img.setScale(scale - 0.02), txt.setScale(scale - 0.05)}).on("pointerout", ()=>{ img.setScale(scale), txt.setScale(scale)})
        const arr = [img, txt]
        const container = scene.add.container(x, y, arr).setScale(scale)
    }
}
