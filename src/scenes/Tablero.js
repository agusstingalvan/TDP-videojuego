import Button from "../js/functions/Button.js";
import Player from "../js/objects/Player.js";

let numeroDelDado, players, player1, player2, player3, player4, textDinero;
let casillaBody;
let posActual;
let casillasLayer, map;
export default class Tablero extends Phaser.Scene {
    constructor() {
        super("Tablero");
    }
    init(data) {
        players = data.players;
        numeroDelDado = 0;
        posActual = 1;
    }
    create() {
        map = this.make.tilemap({ key: "map_tablero" });
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
        casillasLayer = map.getObjectLayer("casillas");

        const salida = casillasLayer.objects.find((obj) => obj.name === "1");
        // const meta = casillasLayer.objects.find((obj) => obj.name === "45");

        player1 = players.player1;
        player2 = players.player2;
        player3 = players.player3;
        player4 = players.player4;

        player1 = new Player(
            this,
            salida.x,
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
                    casillaBody = casillasVacias.create(
                        casilla.x,
                        casilla.y,
                        "casillaVacia"
                    );
                    casillaBody.body.allowGravity = false;
                    casillaBody.visible = false;
                    this.physics.add.overlap(
                        player1,
                        casillaBody,
                        (player, cas) => {
                            let id = casilla.name;
                            this.actualizarPos(id);
                            this.casillaDinero(player, cas);
                        },
                        null,
                        this
                    );
                    break;
                case "consecuencia":
                    casillaBody = casillasVacias.create(
                        casilla.x,
                        casilla.y,
                        "casillaVacia"
                    );
                    casillaBody.body.allowGravity = false;
                    casillaBody.visible = false;

                    this.physics.add.overlap(
                        player1,
                        casillaBody,
                        (player, cas) => {
                            let id = casilla.name;
                            this.actualizarPos(id);
                            this.casillaConsecuencia(player, cas);
                        },
                        null,
                        this
                    );
                    break;
                case "vacia":
                    casillaBody = casillasVacias.create(
                        casilla.x,
                        casilla.y,
                        "casillaVacia"
                    );
                    casillaBody.body.allowGravity = false;
                    casillaBody.visible = false;

                    this.physics.add.overlap(
                        player1,
                        casillaBody,
                        (player, cas) => {
                            let id = casilla.name;
                            this.actualizarPos(id);
                            this.casillaVacia(player, cas);
                        },
                        null,
                        this
                    );
                    break;
                case "tienda":
                    casillaBody = casillasVacias.create(
                        casilla.x,
                        casilla.y,
                        "casillaVacia"
                    );
                    casillaBody.body.allowGravity = false;
                    casillaBody.visible = false;

                    this.physics.add.overlap(
                        player1,
                        casillaBody,
                        (player, cas) => {
                            let id = casilla.name;
                            this.actualizarPos(id);
                            this.casillaTienda(player, cas);
                        },
                        null,
                        this
                    );
                    break;
            }
        });

        this.add.text(0, 0, player1.name, { color: "red" });
        const dadoPosition = objectsLayers.objects.find(
            (obj) => obj.name === "dado"
        );
        this.add
            .text(dadoPosition.x, dadoPosition.y, "TirarDado")
            .setInteractive()
            .on("pointerdown", () => this.tirarDado());

        const btnCerrar = new Button(
            this,
            this.sys.game.config.width - 45,
            this.sys.game.config.height - (this.sys.game.config.height - 45),
            "btnCerrar",
            () => this.scene.start("Inicio")
        );
    }
    tirarDado() {
        numeroDelDado = Phaser.Math.Between(1, 6);
        this.moverJugador(numeroDelDado);
    }
    moverJugador(dado = 1) {
        posActual += dado;

        
        let spawnPoint = map.findObject(
            "casillas",
            (obj) => obj.name === posActual.toString()
        );
        player1.setX(spawnPoint.x);
        player1.setY(spawnPoint.y);
    }

    actualizarPos(id) {
        posActual = id * 1;
    }
    casillaVacia(player, casillaBody) {
        casillaBody.disableBody(true, true);
        console.log("VACIA");
        // console.log(casilla)
    }
    casillaDinero(player, casillaBody) {
        casillaBody.disableBody(true, true);
        console.log("dinero");
        // console.log("ganaste $300");
        // player.setWallet = player.getWallet + 300;
        // console.log(player.getWallet);
        // textDinero.setText(`$${player.getWallet}`);
    }
    casillaConsecuencia(player, casillaBody) {
        casillaBody.disableBody(true, true);
        console.log("Consecuencia");
    }
    casillaTienda(player, casillaBody) {
        casillaBody.disableBody(true, true);
        console.log("Tienda");
    }
}

//tirar dado, moverse, usar powerUp, usarCasilla, cronometro.
// let pos = {
//   y: player1.y - 80,
//   x: player1.x - 80,
// };

// pos.y = player1.y - 80 * numeroDado;
// pos.x = player1.x - 80 * numeroDado;

// player1.setY(pos.y);
