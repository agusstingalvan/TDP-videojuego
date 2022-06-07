export default class Precarga extends Phaser.Scene {
  constructor() {
    super("Precarga");
  }
  preload() {
    this.load.image("duck", "public/assets/images/Duck.png");
    this.load.image("btnJugar", "public/assets/images/botones/boton-jugar.png");
    this.load.image("btnAyuda", "public/assets/images/botones/boton-ayuda.png");
    this.load.image("btnFlechaDerecha", "public/assets/images/botones/boton-flecha-izquierda.png");
    this.load.image("btnFlechaIzquierda", "public/assets/images/botones/boton-flecha-derecha.png");
  }
  create() {
    this.add.text(400, 300, "Cargando!...");
    setTimeout(() => this.scene.start("Inicio"), 3000);
  }
}
