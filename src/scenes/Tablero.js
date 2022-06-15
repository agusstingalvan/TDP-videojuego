import Player from "../js/objects/Player.js";

let numeroDelDado = 0,
  textDado,
  players,
  player1,
  player2,
  player3,
  player4,
  textDinero;

export default class Tablero extends Phaser.Scene {
  constructor() {
    super("Tablero");
  }
  init(data) {
    players = data.players;
  }
  create() {
    let map = this.make.tilemap({ key: "map_tablero" });
    const tiledBackground = map.addTilesetImage(
      "fondo-tablero",
      "tiledBackground"
    );
    const tiledCasillas = map.addTilesetImage(
      "casillas-atlas",
      "tiledCasillas"
    );

    const sky = map.createLayer("fondo", tiledBackground, 0, 0);
    const casillas = map.createLayer("casillas", tiledCasillas, 0, 0);
    const objectsLayers = map.getObjectLayer("objetos");
    const casillasLayer = map.getObjectLayer("casillas");

    const salida = casillasLayer.objects.find((obj) => obj.name === "1");
    const meta = casillasLayer.objects.find((obj) => obj.name === "45");

    player1 = players.player1;
    player2 = players.player2;
    player3 = players.player3;
    player4 = players.player4;

    player1 = new Player(
      this,
      salida.x + 10,
      salida.y,
      player1.texture,
      null,
      player1.name,
      player1.color
    );

    let casillasVacias = this.physics.add.group();
    casillasLayer.objects.forEach((casilla) => {
      switch (casilla.type) {
        case "dinero":
          let casillaBody = casillasVacias.create(
            casilla.x,
            casilla.y,
            "casillaVacia"
          );
          casillaBody.body.allowGravity = false;
          casillaBody.visible = false;
          this.physics.add.overlap(
            player1,
            casillaBody,
            this.casillaVacia,
            null,
            this
          );
          break;
          case "consecuencia":
            let casillaConsecuencia = casillasVacias.create(
              casilla.x,
              casilla.y,
              "casillaVacia"
            );
            casillaConsecuencia.body.allowGravity = false;
            casillaConsecuencia.visible = false;

            this.physics.add.overlap(
              player1,
              casillaConsecuencia,
              this.casillaConsecuencia,
              null,
              this
            );
          break;
      }
    });
   
    this.add.text(0, 0, player1.name, {color: "red"});
    textDinero =  this.add.text(200, 0, `$${player1.getWallet}`, {color: "red"});
    const dadoPosition = objectsLayers.objects.find(
      (obj) => obj.name === "dado"
    );
    this.add
      .text(dadoPosition.x, dadoPosition.y, "TirarDado")
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
    this.moverJugador();
  }
  moverJugador(numeroDado = 1) {
    // let numAnterior = 0;
    let numNuevo = 0;

    let pos = {
      y: player1.y - 80,
      x: player1.x - 80,
    };

    pos.y = player1.y - 80 * numeroDado;
    pos.x = player1.x - 80 * numeroDado;

    player1.setY(pos.y);
    // if (player1.y <= 0) {
    //   player1.setX(pos.x);
    // }
  }

  casillaVacia(player, casilla){
    casilla.disableBody(true, true);
    console.log("ganaste $300");
    player.setWallet = player.getWallet + 300;
    console.log(player.getWallet);
    textDinero.setText(`$${player.getWallet}`)
  }
  casillaConsecuencia(player, casilla){
    casilla.disableBody(true, true);
    console.log('Consecuencia')
  }
}

//tirar dado, moverse, usar powerUp, usarCasilla, cronometro.
