import Player from "../js/objects/Player.js";

let numeroDelDado = 0,
  textDado,
  players,
  player
export default class Tablero extends Phaser.Scene {
  constructor() {
    super("Tablero");
  }
  init(data){
    players = data.players
  }
  create() {

    let map = this.make.tilemap({key: 'map_tablero'});
    const tiledBackground = map.addTilesetImage('fondo-tablero', 'tiledBackground');
    const tiledCasillas = map.addTilesetImage('casillas-atlas', 'tiledCasillas');

    const sky = map.createLayer('fondo', tiledBackground, 0, 0);
    const casillas = map.createLayer('casillas', tiledCasillas, 0, 0);

    let player1 = players.player1;
    let player2 = players.player2;
    let player3 = players.player3;
    let player4 = players.player4;

    player1 = new Player(this, 100, 500, player1.texture, null, player1.name, player1.color);
    // let player1 = new Player(this, 150, 300, "duckWhite", null)
    // player = this.add.image(100, 550, "duck");
    this.add.text(0, 0, player1.name);
    this.add
      .text(500, 500, "TirarDado")
      .setInteractive()
      .on("pointerdown", () => this.tirarDado());
    this.add
      .text(400, 300, "Ver ganador")
      .setInteractive()
      .on("pointerdown", () => this.scene.start("Ganador"));
    textDado = this.add.text(400, 100, null, {
      backgroundColor: "red",
      color: "white",
    });
  }
  tirarDado() {
    numeroDelDado = Phaser.Math.Between(1, 6);
    textDado.setText(`Numero de dado: ${numeroDelDado}`);
    this.moverJugador(numeroDelDado);
  }
  moverJugador(numeroDado = 1) {
    let numAnterior = 0;
    let numNuevo = 0;

    let pos = {
      y: player.y - 80,
      x: player.x - 80,
    };

    pos.y = player.y - 80 * numeroDado;
    pos.x = player.x - 80 * numeroDado;
    player.setY(pos.y);

    if (player.y <= 0) {
      player.setX(pos.x);
    }
  }
}

//tirar dado, moverse, usar powerUp, usarCasilla, cronometro.