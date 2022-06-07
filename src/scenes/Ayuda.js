export default class Ayuda extends Phaser.Scene{
    constructor(){
        super("Ayuda");
    }
    preload(){

    }
    create(){
        this.add.image(760, 20, "btnFlechaDerecha", {backgroundColor: 'white', color: "black"}).setInteractive().on("pointerdown", ()=>this.scene.start("Inicio")).setScale(0.4)
        
    }
}