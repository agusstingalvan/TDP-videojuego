import Button from "../js/functions/Button.js";

export default class Inicio extends Phaser.Scene{
    constructor(){
        super("Inicio");
    }
    create(){
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "bg_menu_inicio")

        // this.add.image(200, 300, "botones", "boton-jugar");
        // this.add.image(300, 400, "botones", "boton-ayuda")

        const btnJugar = new Button(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'botones',"boton-jugar", ()=>this.scene.start("SeleccionPersonajes"))
        const btnAyuda = new Button(this,  this.sys.game.config.width / 2,  this.sys.game.config.height / 2 + 100, 'botones', "boton-ayuda", ()=>this.scene.start("Ayuda"))
        const btnCreditos = new Button(this, this.sys.game.config.width / 2 - 140,  this.sys.game.config.height / 2 + 150, 'botones',  "boton-creditos", ()=>this.scene.start("Creditos"))
        const btnOpciones = new Button(this, this.sys.game.config.width / 2 + 140 ,  this.sys.game.config.height / 2 + 150, 'botones', "boton-opciones", ()=>this.scene.start("Creditos"))
    }
}