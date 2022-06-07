export default class Inicio extends Phaser.Scene{
    constructor(){
        super("Inicio");
    }
    preload(){

    }
    create(){
        this.add.text(400, 300, "Jugar").setInteractive().on("pointerdown", ()=>this.scene.start("SeleccionPersonajes"));
        this.add.text(400, 400, "Ayuda").setInteractive().on("pointerdown", ()=>this.scene.start("Ayuda"));
        this.add.text(760, 20, "*", {backgroundColor: 'white', color: "black"}).setInteractive().on("pointerdown", ()=>this.scene.start("Ayuda"));

        // this.add.text(400, 400, "Creditos").setInteractive().on("pointerdown", ()=>this.scene.start("Creditos"));
        
    }
}