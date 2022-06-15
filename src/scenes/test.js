import Player from "../js/objects/Player.js";

let numeroDelDado = 0,
  textDado,
  players,
  player,
  listCasillas = [];
  let player1;
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
    const objectLayer = map.getObjectLayer("objetos");
    const sky = map.createLayer('fondo', tiledBackground, 0, 0)
    const casillas = map.createLayer('casillas', tiledCasillas, 0, 0)
    // casillas.setOverlap
    objectLayer.objects.forEach(obj=>{
      switch(obj.type){
        case "casilla":
          
          listCasillas.push(obj);
         
        break;
      }
    })
    this.physics.add.overlap(map.findObject('objetos', (obj1) => obj1.name === 'casilla'), player1, ()=>{
      console.log(obj.id);
      
    }, null, this)
    console.log(listCasillas)
    player1 = players.player1;
    let player2 = players.player2;
    let player3 = players.player3;
    let player4 = players.player4;
    player1 = new Player(this, listCasillas[0].x, listCasillas[0].y, player1.texture, null, player1.name, player1.color);
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
      y: player1.y - 80,
      x: player1.x - 80,
    };

    pos.y = player1.y - 80 * numeroDado;
    pos.x = player1.x - 80 * numeroDado;
    player1.setY(pos.y);

    // if (player.y <= 0) {
    //   player.setX(pos.x);
    // }
  }
}

//tirar dado, moverse, usar powerUp, usarCasilla, cronometro.
