let ganador
export default class Ganador extends Phaser.Scene{
    constructor(){
        super("Ganador");
    }
    init(data){
        ganador = data;
    }
    preload(){

    }
    create(){
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'atlas_backgrounds',"fondo-seleccionPersonajes");
        this.add.text(400, 400, `Ganador ${ganador.getName}`)
        this.add.text(400, 500, "ir a inicio", {backgroundColor: 'white', color: "black"}).setInteractive().on("pointerdown", ()=>this.scene.start("Inicio"));
    }
}