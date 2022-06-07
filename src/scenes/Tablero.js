export default class Tablero extends Phaser.Scene{
    constructor(){
        super("Tablero");
    }
    preload(){

    }
    create(){
        this.add.text(0,0, "Estas en el tablero")
        this.add.text(400, 300, "Ver ganador").setInteractive().on("pointerdown", ()=>this.scene.start("Ganador"));
        
    }
}