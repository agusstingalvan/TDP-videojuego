import Button from "../js/functions/Button.js";
import Text from "../js/functions/Text.js";

let ganador
export default class Ganador extends Phaser.Scene {
    constructor() {
        super("Ganador");
    }
    init(data) {
        this.ganador = data.getName;
    }
    preload() {

    }
    create() {
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'atlas_backgrounds', "fondo-ganador");
        this.textName = new Text(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 220, this.ganador, 20, 'bold', 0.5, "white");

        const btnVolver = new Button(this, this.sys.game.config.width / 2 - 5, this.sys.game.config.height - 45, 'botones', "boton-volver", () => {
            this.scene.start("Inicio")
        });
    }
}