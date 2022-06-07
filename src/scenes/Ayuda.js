export default class Ayuda extends Phaser.Scene{
    constructor(){
        super("Ayuda");
    }
    preload(){

    }
    create(){
        this.add.text(760, 20, "X", {backgroundColor: 'white', color: "black"}).setInteractive().on("pointerdown", ()=>this.scene.start("Inicio"));
        
    }
}