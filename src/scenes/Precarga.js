export default class Precarga extends Phaser.Scene {
  constructor() {
    super("Precarga");
  }
  preload() {
    this.load.image("duck", "public/assets/images/Duck.png");
    this.load.image("duckWhite", "public/assets/images/duck-white.png");
    this.load.image("btnJugar", "public/assets/images/botones/boton-jugar.png");
    this.load.image("btnAyuda", "public/assets/images/botones/boton-ayuda.png");
    this.load.image("btnFlechaDerecha", "public/assets/images/botones/boton-flecha-izquierda.png");
    this.load.image("btnFlechaIzquierda", "public/assets/images/botones/boton-flecha-derecha.png");
    this.load.image("lapizEdit", "public/assets/images/lapiz-edit.png");
    this.load.image("btnCheck", "public/assets/images/boton-check.png");
  }
  create() {
    this.add.text(400, 300, "Cargando!...");
    this.scene.start("Inicio")
    // setTimeout(() => , 3000);
  }
}
