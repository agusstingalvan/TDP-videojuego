export default class Precarga extends Phaser.Scene{
    constructor(){
        super("Precarga");
    }
    preload(){
    }
    create(){
        this.add.text(400, 300, "Cargando!...");
        setTimeout(()=>this.scene.start("Inicio"), 3000)
    }
}