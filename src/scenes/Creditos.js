export default class Creditos extends Phaser.Scene{
    constructor(){
        super("Creditos");
    }
    preload(){

    }
    create(){
        this.add.text(0, 0, "Estas en creditos")
        this.add.text(760, 20, "X", {backgroundColor: 'white', color: "black"}).setInteractive().on("pointerdown", ()=>this.scene.start("Inicio"));
        
    }
}