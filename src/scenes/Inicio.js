export default class Inicio extends Phaser.Scene{
    constructor(){
        super("Inicio");
    }
    create(){
        this.add.image(400, 100, "duck")
        this.add.image(400, 300, "btnJugar").setInteractive().on("pointerdown", ()=>this.scene.start("SeleccionPersonajes")).setOrigin(0.5)
        this.add.image(400, 400, "btnAyuda").setInteractive().on("pointerdown", ()=>this.scene.start("Ayuda"));
        this.add.text(400, 500, "Creditos").setInteractive().on("pointerdown", ()=>this.scene.start("Creditos"));
        // this.add.text(760, 20, "*", {backgroundColor: 'white', color: "black"}).setInteractive().on("pointerdown", ()=>this.scene.start("Ayuda"));

        const btnOptions = this.add.text(760, 20, "*", {backgroundColor: 'white', color: "black"}).setInteractive().on("pointerdown", ()=>this.scene.start("Ayuda"));
    }
}