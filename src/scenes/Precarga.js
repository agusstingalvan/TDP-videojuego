export default class Precarga extends Phaser.Scene{
    constructor(){
        super("Precarga");
    }
    preload(){
    }
    create(){
        this.add.text(400, 300, "Inicio").setInteractive().on("pointerover", ()=>this.scene.start("Inicio"));
    }
}