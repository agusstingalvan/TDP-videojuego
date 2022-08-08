import Button from "../js/functions/Button.js";
import SoundsManage from "../js/functions/SoundsManage.js";

export default class Inicio extends Phaser.Scene {
    constructor() {
        super("Inicio");
    }
    create() {
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'atlas_backgrounds', "menu-inicio");

        const sonidos = new SoundsManage(this.sound, 0.3);
        sonidos.sound.musicMain.play();


        const btnJugar = new Button(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'botones', "boton-jugar", () => this.scene.start("SeleccionPersonajes", { sonidos }), 1.15)
        const btnAyuda = new Button(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 80, 'botones', "boton-ayuda", () => {
            this.ayudaPop.visible = true;
            btnJugar.visible = false;
            btnCreditos.visible = false;
            btnOpciones.visible = false;
            setTimeout(() => {
                btnJugar.visible = true;
                btnCreditos.visible = true;
                btnOpciones.visible = true;
                this.ayudaPop.visible = false
            }, 15000)
        }, 0.85)
        const btnCreditos = new Button(this, this.sys.game.config.width / 2 - 100, this.sys.game.config.height / 2 + 150, 'botones', "boton-creditos", () => {
            this.creditosPop.visible = true;
            btnJugar.visible = false;
            btnCreditos.visible = false;
            btnOpciones.visible = false;
            setTimeout(() => {
                btnJugar.visible = true;
                btnCreditos.visible = true;
                btnOpciones.visible = true;
                this.creditosPop.visible = false
            }, 5000)
        }, 0.65)
        const btnOpciones = new Button(this, this.sys.game.config.width / 2 + 100, this.sys.game.config.height / 2 + 150, 'botones', "boton-opciones", () => {
            this.opcionesPop.visible = true;
            btnJugar.visible = false;
            btnCreditos.visible = false;
            btnOpciones.visible = false;
            setTimeout(() => {
                btnJugar.visible = true;
                btnCreditos.visible = true;
                btnOpciones.visible = true;
                this.opcionesPop.visible = false;
            }, 5000)
        }, 0.65)
        this.creditosPop = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 60, "popup-creditos").setScale(1.3);
        this.creditosPop.visible = false;
        this.ayudaPop = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 60, "popup-ayuda").setScale(1)
        this.ayudaPop.visible = false;
        this.opcionesPop = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 60, "popup-opciones").setScale(1.7)
        this.opcionesPop.visible = false;
    }
}