export default class Precarga extends Phaser.Scene {
  constructor() {
    super("Precarga");
  }
  preload() {
    this.load.image("duck", "public/assets/images/Duck.png");
    this.load.image("pato-gorro-bruja", "public/assets/images/personajes/pato-gorro-bruja.png");
    this.load.image("pato-gorro-verde", "public/assets/images/personajes/pato-gorro-verde.png");
    this.load.image("pato-galera", "public/assets/images/personajes/pato-galera.png");
    this.load.image("duckWhite", "public/assets/images/duck-white.png");
    this.load.image("btnJugar", "public/assets/images/botones/botonesMenu/boton-jugar.png");
    this.load.image("btnAyuda", "public/assets/images/botones/botonesMenu/boton-ayuda.png");
    this.load.image("btnFlechaDerecha", "public/assets/images/botones/boton-flecha-izquierda.png");
    this.load.image("btnFlechaIzquierda", "public/assets/images/botones/boton-flecha-derecha.png");
    this.load.image("lapizEdit", "public/assets/images/botones/lapiz-edit.png");
    this.load.image("btnCheck", "public/assets/images/botones/boton-check.png");

    this.load.tilemapTiledJSON("map_tablero", 'public/assets/tilemaps/tablero.json');
    this.load.image('tiledBackground', 'public/assets/images/fondo-tablero.jpg');
    this.load.image('tiledCasillas', 'public/assets/images/casillas-atlas.png');
    this.load.image("casillaVacia", 'public/assets/images/casillas/casilla-vacia.png')
  }
  create() {
    this.add.text(400, 300, "Cargando!...");
    
    setTimeout(() => this.scene.start("Inicio"), 1000);
  }
}
