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
        this.add.text(400, 400, `Ganador ${ganador.getName}`)
        this.add.text(400, 500, "ir a inicio", {backgroundColor: 'white', color: "black"}).setInteractive().on("pointerdown", ()=>this.scene.start("Inicio"));
        
    }
}