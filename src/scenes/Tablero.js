import Button from "../js/functions/Button.js";
import Player from "../js/objects/Player.js";

// let numeroDelDado, players, player1, player2, player3, player4, textDinero;
// let casillaBody;
// let posActual;
// let casillasLayer, map, casillasGroup
let jugadorActual;
export default class Tablero extends Phaser.Scene {
    initTiempo = 15;
    players;
    player1;
    player2;
    player3;
    player4;

    numeroDelDado = 0;

    textDinero;
    textCronometro;

    map;
    posSalida = 1;
    posLlegada = 45;
    posActual = this.posSalida;
    // casillaBody;
    casillaInvisible;
    casillaId;
    groupCasillaConsecuencia;
    casillasLayer;
    casillasGroup;
    casillaDescativadaOverlap;
    constructor() {
        super("Tablero");
    }
    init(data) {
        this.players = data.players;

        this.player1 = this.players.player1;
        this.player2 = this.players.player2;
        // this.player3 = this.players.player3;
        // this.player4 = this.players.player4;
        this.player1.setAfectarContricante = false;
        this.player2.setAfectarContricante = false;

        this.numeroDelDado = 0;
        this.posActual = this.posSalida;
        this.initTiempo = 15;
    }
    create() {
        this.map = this.make.tilemap({ key: "map_tablero" });
        const tiledBackground = this.map.addTilesetImage(
            "fondo-tablero",
            "tiledBackground"
        );
        const tiledCasillas = this.map.addTilesetImage(
            "casillas-atlas",
            "tiledCasillas"
        );
        const sky = this.map.createLayer("fondo", tiledBackground, 0, 0);
        const casillas = this.map.createLayer("casillas", tiledCasillas, 0, 0);
        const objectsLayers = this.map.getObjectLayer("objetos");
        this.casillasLayer = this.map.getObjectLayer("casillas");

        const salida = this.casillasLayer.objects.find(
            (obj) => obj.name === this.posSalida.toString()
        );

        // const meta = casillasLayer.objects.find((obj) => obj.name === "45");

        this.player1 = new Player(
            this,
            salida.x - 30,
            salida.y,
            this.player1.texture,
            null,
            this.player1.name,
            this.player1.color,
            this.initTiempo,
            this.map,
            this.posActual
        );
        this.player2 = new Player(
            this,
            salida.x + 30,
            salida.y - 15,
            this.player2.texture,
            null,
            this.player2.name,
            this.player2.color,
            this.initTiempo,
            this.map,
            this.posActual
        );
        // this.player3 = new Player(
        //     this,
        //     salida.x,
        //     salida.y - 30,
        //     this.player3.texture,
        //     null,
        //     this.player3.name,
        //     this.player3.color,
        //     this.initTiempo,
        //     this.map,
        //     this.posActual
        // );
        // this.player4 = new Player(
        //     this,
        //     salida.x ,
        //     salida.y + 30,
        //     this.player4.texture,
        //     null,
        //     this.player4.name,
        //     this.player4.color,
        //     this.initTiempo,
        //     this.map,
        //     this.posActual
        // );
        // for(let player in this.players){
        //     player = this.players[player];
        //     console.log(player)
        //     let indexNext = parseInt(player[player.length - 1]) + 1;
        //     let nextPlayer = this.players["player" + indexNext];
        //     nextPlayer = new Player(this,
        //             salida.x - Phaser.Math.Between(0, 64) ,
        //             salida.y - Phaser.Math.Between(0, 64),
        //             player.texture,
        //             null,
        //             player.name,
        //             player.color,
        //             this.initTiempo,
        //             this.map,
        //             this.posActual)
        // }

        this.player1.setIsTurn = true;
        this.players = { player1: this.player1, player2: this.player2 };

        this.groupCasillaConsecuencia = this.physics.add.group();
        this.casillasLayer.objects.forEach((casilla) => {
            switch (casilla.type) {
                case "consecuencia":
                    this.crearCasilla(
                        this.casillaInvisible,
                        this.groupCasillaConsecuencia,
                        casilla,
                        (player, cas) => this.casillaConsecuencia(player, cas)
                    );
                    break;
            }
        });

        this.dadoPosition = objectsLayers.objects.find(
            (obj) => obj.name === "dado"
        );
        this.btnDado = this.add
            .text(this.dadoPosition.x, this.dadoPosition.y, "TirarDado")
            .setInteractive();
        const btnCerrar = new Button(
            this,
            this.sys.game.config.width - 45,
            this.sys.game.config.height - (this.sys.game.config.height - 45),
            "btnCerrar",
            () => this.scene.start("Inicio")
        );

        this.textName = this.add.text(0, 0, this.player1.name, {
            color: "red",
        });
        this.textCronometro = this.add.text(
            this.sys.game.config.width / 2,
            0,
            `Tiempo: ${this.player1.getTimeTurn}`,
            { color: "red" }
        );
        this.tiempo = this.initTiempo;
        this.time.addEvent({
            delay: 1000,
            callback: this.cronometro,
            callbackScope: this,
            loop: true,
        });
    }

    update() {
        this.sistemaDeTurnos(this.player1, this.player2);
        this.sistemaDeTurnos(this.player2, this.player1);
    }
    sistemaDeTurnos(player1, player2, clickOnButton = true) {
        if (player1.getIsTurn && !player2.getIsTurn) {
            jugadorActual = player1;
            this.textName.setText(player1.getName);

            //Para que se pueda tirar el dado.
            player1.setCanThrowDice = true;
            player2.setCanThrowDice = false;
            //Si pierdo un turno Y el proximo turno es igual a falso == Pierdon el turno** Si no tiro el dado
            if (player1.getCountTurn >= 1 && !player1.nextTurn) {
                player1.setCountTurn = 0;
                player1.setNextTurn = true;
                player1.setIsTurn = false;
                player2.setIsTurn = true;
                console.log("Pierdiste este turno.");
                return;
            }
            //Si el jugador da click, tira el dado
            if (clickOnButton) {
                this.btnDado.on("pointerdown", () => {
                    player1.tirarDado(clickOnButton);
                    player1.setTimeTurn = this.initTiempo;
                    this.tiempo = this.initTiempo;
                    this.textCronometro.setText(`Tiempo: ${this.tiempo}`);
                    player1.setIsTurn = false;
                    player2.setIsTurn = true;
                    this.reactivarCasillaMecanica()
                });
                return;
            }
            //Si no da click, se mueve uno.
            player1.tirarDado(false);
            player1.setTimeTurn = this.initTiempo;
            this.tiempo = this.initTiempo;
            this.textCronometro.setText(`Tiempo: ${this.tiempo}`);
            player1.setIsTurn = false;
            player2.setIsTurn = true;
            if (this.casillaDescativadaOverlap)
                this.casillaDescativadaOverlap.enableBody(
                    true,
                    this.casillaDescativadaOverlap.x,
                    this.casillaDescativadaOverlap.y,
                    true,
                    true
                );
        }
    }
    crearCasilla(casillaBody, grupo, casilla, callback) {
        /*
         1: añado una casilla en la posicion de la capa de casillas del tiled segun el type.
         2: A la casilla que creo mediante el codigo, le descativo la gravedad y la hago no visible.
         3: le add un overlap. Para saber cuando el jugador pisa dicha casilla. Y poder manejar la cosecuencia. 
         4: Cuando se activa el callback del overlap. la casilla se desactiva y cuando en una variable la casilla desactivada.
         5: La casilla desactivada. Se vuelve hacer visible cuando el jugador se mueve nuevamente
        */
        casillaBody = grupo.create(casilla.x, casilla.y, "casillaInvisible");
        casillaBody.body.allowGravity = false;
        casillaBody.visible = true;
        this.physics.add.overlap(
            this.player1,
            casillaBody,
            (player, cas) => {
                this.actualizarPos(casilla.name);
                callback(player, cas);
            },
            null,
            this
        );
        this.physics.add.overlap(
            this.player2,
            casillaBody,
            (player, cas) => {
                this.actualizarPos(casilla.name);
                callback(player, cas);
            },
            null,
            this
        );
    }
    cronometro() {
        this.tiempo -= 1;
        this.textCronometro.setText(`Tiempo: ${this.tiempo}`);
        if (this.tiempo <= 0) {
            let jugadorAct, jugadorCambio;
            for (let player in this.players) {
                let playerObj = this.players[player];
                if (playerObj.getIsTurn) jugadorAct = playerObj;
                for (let player in this.players) {
                    let playerObj = this.players[player];
                    if (!playerObj.getIsTurn) jugadorCambio = playerObj;
                    this.sistemaDeTurnos(jugadorAct, jugadorCambio, false);
                }
            }
            
            
            // jugadorActual.tirarDado(false);
            // console.log(jugadorAct.getName);
            // console.log(jugadorCambio.getName);
            this.tiempo = this.initTiempo;
        }
    }
    actualizarPos(id) {
        this.posAnterior = this.posActual;
        this.posActual = parseInt(id);
    }
    casillaVacia(player, casillaBody) {
        casillaBody.disableBody(true, true);
        console.log("VACIA");
    }
    casillaConsecuencia(player, casillaBody) {
        /*
        4: Cuando se activa el callback del overlap. la casilla se desactiva y cuando en una variable la casilla desactivada.
        5: La casilla desactivada. Se vuelve hacer visible cuando el jugador se mueve nuevamente
        */
        casillaBody.disableBody(true, true);
        this.casillaDescativadaOverlap = casillaBody;

        const numeroRandom = Phaser.Math.Between(1, 3);

        switch (numeroRandom) {
            case 1:
                console.warn("Pierdes el turno");
                console.error(player.getName);
                player.setNextTurn = false;
                player.setCountTurn = 1;
                break;
            case 2:
                console.warn("Retrocede 4 casillas");
                console.error(player.getName);
                player.setIsTurn = false;
                setTimeout(() => {
                    let nuevaPos = this.posActual - 4;
                    if (nuevaPos <= 0) {
                        this.posActual = 1;
                        console.warn("Ahora: ", this.posActual);
                        player.soloMover(this.posActual);
                        this.reactivarCasillaMecanica()
                        return;
                    }
                    this.posActual = nuevaPos;
                    console.warn("Ahora: ", this.posActual);
                    player.soloMover(this.posActual);
                    this.reactivarCasillaMecanica()
                }, 3000);
                break;

            case 3:
                console.warn("Retrocede 4 casillas al CONTRICANTE");
                console.error(player.getName);
                player.setIsTurn = false;
                player.setAfectarContricante = true;
                let jugadorAfectado;
                for (let playerId in this.players) {
                    let jugador = this.players[playerId];
                    if (!jugador.getAfectarContricante) {
                        jugadorAfectado = jugador;
                        console.log(
                            "Afecta al jugador: ",
                            jugadorAfectado.getName
                        );
                        setTimeout(() => {
                            console.log(
                                "Estaba en: ",
                                jugadorAfectado.getPosJugador
                            );
                            let posicionDelContricante =
                                jugadorAfectado.getPosJugador - 4;

                            if (posicionDelContricante <= 0) {
                                posicionDelContricante = 1;
                                // console.warn("Ahora: ", posicionDelContricante);
                                console.log(
                                    "Y ahora esta en:",
                                    posicionDelContricante
                                );
                                jugadorAfectado.soloMover(
                                    posicionDelContricante
                                );
                                this.reactivarCasillaMecanica()
                                player.setAfectarContricante = false;
                                return;
                            }
                            jugadorAfectado.setPosJugador =
                                posicionDelContricante;
                            this.posActual = posicionDelContricante;
                            // console.warn("Ahora: ", this.posActual);
                            console.log(
                                "Y ahora esta en:",
                                posicionDelContricante
                            );
                            jugadorAfectado.soloMover(this.posActual);
                            this.reactivarCasillaMecanica()
                            player.setAfectarContricante = false;
                        }, 3000);
                    }
                }
                break;
            case 4:
                console.warn("Yunque en la cabeza");
                console.error(player.getName);
                setTimeout(() => {
                    player.soloMover(1);
                    this.reactivarCasillaMecanica()
                }, 3000);
                break;
        }
    }
    reactivarCasillaMecanica() {
        if (this.casillaDescativadaOverlap)
            this.casillaDescativadaOverlap.enableBody(
                true,
                this.casillaDescativadaOverlap.x,
                this.casillaDescativadaOverlap.y,
                true, false
            );
    }
}

//tirar dado, moverse, usar powerUp, usarCasilla, cronometro.
