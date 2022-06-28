import Button from "../js/functions/Button.js";
import SoundsManage from "../js/functions/SoundsManage.js";

export default class Inicio extends Phaser.Scene{
    constructor(){
        super("Inicio");
    }
    create(){
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'atlas_backgrounds',"menu-inicio");

        const sonidos = new SoundsManage(this.sound, 0.3);
        // sonidos.sound.musicMain.config = 1
        sonidos.sound.musicMain.play();

        const btnJugar = new Button(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'botones',"boton-jugar", ()=>this.scene.start("SeleccionPersonajes", {sonidos}), 1.15)
        const btnAyuda = new Button(this,  this.sys.game.config.width / 2,  this.sys.game.config.height / 2 + 80, 'botones', "boton-ayuda", ()=>this.scene.start("Ayuda"), 0.85)
        const btnCreditos = new Button(this, this.sys.game.config.width / 2 - 100,  this.sys.game.config.height / 2 + 150, 'botones',  "boton-creditos", ()=>this.scene.start("Creditos"), 0.65)
        const btnOpciones = new Button(this, this.sys.game.config.width / 2 + 100 ,  this.sys.game.config.height / 2 + 150, 'botones', "boton-opciones", ()=>this.scene.start("Creditos"), 0.65)
    }
}