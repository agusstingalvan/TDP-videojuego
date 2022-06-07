let numeroDelDado = 0,
  textDado,
  player;
export default class Tablero extends Phaser.Scene {
  constructor() {
    super("Tablero");
  }
  preload() {}
  create() {
    player = this.add.image(100, 550, "duck");
    this.add.text(0, 0, "Estas en el tablero");
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

//tirar dado, moverse, usar powerUp, usarCasilla.
