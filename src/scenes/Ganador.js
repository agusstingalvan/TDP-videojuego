export default class Ganador extends Phaser.Scene{
    constructor(){
        super("Ganador");
    }
    preload(){

    }
    create(){
        this.add.text(400, 400, "Gano X")
        this.add.text(400, 500, "ir a inicio", {backgroundColor: 'white', color: "black"}).setInteractive().on("pointerdown", ()=>this.scene.start("Inicio"));
        
    }
}