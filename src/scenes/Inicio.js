import Button from "../js/functions/Button.js";

export default class Inicio extends Phaser.Scene{
    constructor(){
        super("Inicio");
    }
    create(){
        this.add.image(400, 100, "duck")

        const btnJugar = new Button(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, "btnJugar", ()=>this.scene.start("SeleccionPersonajes"))
        const btnAyuda = new Button(this,  this.sys.game.config.width / 2,  this.sys.game.config.height / 2 + 100, "btnAyuda", ()=>this.scene.start("Ayuda"))
        const btnCreditos = new Button(this, this.sys.game.config.width / 2 - 140,  this.sys.game.config.height / 2 + 150, "btnCreditos", ()=>this.scene.start("Creditos"))
        const btnOpciones = new Button(this, this.sys.game.config.width / 2 + 140 ,  this.sys.game.config.height / 2 + 150, "btnOpciones", ()=>this.scene.start("Creditos"))
    }
}