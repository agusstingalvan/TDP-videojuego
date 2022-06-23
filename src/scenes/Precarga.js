export default class Precarga extends Phaser.Scene {
  constructor() {
    super("Precarga");
  }
  preload() {
    this.load.image("menu_inicio", "public/assets/images/escenas/menu_inicio.png");
    this.load.image("duck", "public/assets/images/Duck.png");
    this.load.image("pato-gorro-bruja", "public/assets/images/personajes/pato-gorro-bruja.png");
    this.load.image("pato-gorro-verde", "public/assets/images/personajes/pato-gorro-verde.png");
    this.load.image("pato-galera", "public/assets/images/personajes/pato-galera.png");
    
    this.load.image("duckWhite", "public/assets/images/duck-white.png");

    this.load.atlas('botones', 'public/assets/images/botones/botones/botones.png', 'public/assets/images/botones/botones/botones_atlas.json');
    this.load.image("boton-jugar", "public/assets/images/botones/botones-rojos/boton-jugar.png");
    this.load.image("boton-ayuda", "public/assets/images/botones/botones-rojos/boton-ayuda.png");
    this.load.image("boton-listo", "public/assets/images/botones/botones-rojos/boton-listo.png");
    this.load.image("boton-opciones", "public/assets/images/botones/botones-rojos/boton-opciones.png");
    this.load.image("boton-creditos", "public/assets/images/botones/botones-rojos/boton-creditos.png");
    this.load.image("btnCerrar", "public/assets/images/botones/botones-rojos/boton-cerrar.png");
    this.load.image("boton-dado", "public/assets/images/botones/boton-dado.png");
    
    this.load.image("lapizEdit", "public/assets/images/botones/lapiz-edit.png");
    this.load.image("btnCheck", "public/assets/images/botones/boton-check.png");

    this.load.tilemapTiledJSON("map_tablero", 'public/assets/tilemaps/tablero.json');
    this.load.image('tiledBackground', 'public/assets/images/fondo-tablero.jpg');
    this.load.image('tiledCasillas', 'public/assets/images/casillas-atlas.png');
    // this.load.image("casillaVacia", 'public/assets/images/casillas/casilla-vacia.png');
    this.load.image("casillaInvisible", 'public/assets/images/casillas/casilla-invisible.png');

  }
  create() {
    this.add.text(400, 300, "Cargando!...");
    
    setTimeout(() => this.scene.start("Inicio"), 1000);
  }
}
