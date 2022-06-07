export default class SeleccionPersonajes extends Phaser.Scene{
    constructor(){
        super("SeleccionPersonajes");
    }
    preload(){

    }
    create(){
        this.add.text(760, 20, "X", {backgroundColor: 'white', color: "black"}).setInteractive().on("pointerdown", ()=>this.scene.start("Inicio"));
        this.add.text(400, 500, "Listo").setInteractive().on("pointerdown", ()=>this.scene.start("Tablero"));

    }
}