import Button from "../js/functions/Button.js";
import Text from "../js/functions/Text.js";
import Player from "../js/objects/Player.js";

let jugadorActual;
let jugadorProximo;
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
    posLlegada = 42;
    posActual = this.posSalida;
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
        this.sonidos = data.sonidos;
        this.player1 = this.players.player1;
        this.player2 = this.players.player2;
        this.player1.setAfectarContricante = false;
        this.player2.setAfectarContricante = false;

        this.numeroDelDado = 0;
        this.posActual = this.posSalida;
        this.initTiempo = 15;
    }
    create() {
        this.sonidos.sound.musicTablero.config.volume = 0.1;
        this.sonidos.sound.musicTablero.play();
        this.map = this.make.tilemap({ key: "map_tablero" });
        const tiledBackground = this.map.addTilesetImage(
            "fondo-tablero",
            "atlas_backgrounds"
        );

        const tiledCasillas = this.map.addTilesetImage(
            "casillas-atlas",
            "atlas_casillas"
        );
        const sky = this.map.createLayer("fondo", tiledBackground, 0, 0);
        const casillas = this.map.createLayer("casillas", tiledCasillas, 0, 0);
        const objectsLayers = this.map.getObjectLayer("objetos");
        this.casillasLayer = this.map.getObjectLayer("casillas");


        const salida = this.casillasLayer.objects.find(
            (obj) => obj.name === this.posSalida.toString()
        );
        this.camara = this.cameras.main;

        this.player1 = new Player(
            this,
            salida.x - 30,
            salida.y,
            "atlas_patos_static",
            "pato-bruja",
            this.player1.name,
            this.player1.color,
            this.initTiempo,
            this.map,
            this.posActual,
            this.sonidos.sound.movimientoDadoSFX
        );
        this.player2 = new Player(
            this,
            salida.x + 30,
            salida.y - 15,
            "atlas_patos_static",
            "pato-galera",
            this.player2.name,
            this.player2.color,
            this.initTiempo,
            this.map,
            this.posActual,
            this.sonidos.sound.movimientoDadoSFX
        );

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



        this.casilleroUIPosition = objectsLayers.objects.find(
            (obj) => obj.name === "casilleroInterfaz"
        );
        this.casilleroUIPosition = this.add.image(this.casilleroUIPosition.x, this.casilleroUIPosition.y, 'casilleroUI');
        this.dadoPosition = objectsLayers.objects.find(
            (obj) => obj.name === "dado"
        );
        this.cronometroPos = objectsLayers.objects.find(
            (obj) => obj.name === "cronometro"
        );
        this.nombreJugadorPos = objectsLayers.objects.find(
            (obj) => obj.name === "nombreJugador"
        );
        this.numeroDado = new Text(this, this.dadoPosition.x, this.dadoPosition.y, "1", 30, 'bold', 0.5, "black");
        this.btnDado = this.add
            .image(this.dadoPosition.x, this.dadoPosition.y, "boton-dado")
            .setInteractive({
                useHandCursor: true,
            });
        this.btnDado.on("pointerdown", () => {
            this.tweens.add({
                targets: this.btnDado,
                duration: 1000,
                rotation: 360,
                ease: "Power3",
                repeat: 0,
                yoyo: false,
                onStart: () => {
                    jugadorActual.anims.play(
                        `${jugadorActual.animacion}-move`,
                        true
                    );
                    this.numeroDado.visible = true;
                    this.numeroDado.visible = true;
                    this.numeroDado.visible = true;
                    this.sonidos.sound.tirarDadoSFX.volume = 1;
                    this.sonidos.sound.tirarDadoSFX.play();
                    this.sonidos.sound.tirarDadoSFX.play();
                    this.sonidos.sound.tirarDadoSFX.play();
                },
                onComplete: () => {
                    jugadorActual.tirarDado(true);
                    this.numeroDado.setText(jugadorActual.getNumeroDelDado);
                    this.resetTime(jugadorActual);
                    this.textCronometro.setText(this.tiempo);
                    this.cronometro.paused = true;
                    this.cambiarTurnos(jugadorActual, jugadorProximo);
                    this.btnDado.setRotation(0);
                },
            });
        });
        const btnCerrar = new Button(
            this,
            this.sys.game.config.width - 45,
            this.sys.game.config.height - (this.sys.game.config.height - 45),
            "botones",
            "boton-cerrar",
            () => {
                this.sonidos.sound.musicTablero.stop();
                this.scene.start("Inicio");
            },
            0.5
        );

        this.textName = new Text(this, this.nombreJugadorPos.x, this.nombreJugadorPos.y, this.player1.name, 20, 'bold', 0.5, "white");
        this.fotoReloj = this.add.image(this.cronometroPos.x, this.cronometroPos.y, 'reloj').setScale(1.3)
        this.textCronometro = new Text(this, this.cronometroPos.x, this.cronometroPos.y, this.player1.getTimeTurn, 20, null, 0.5, "black");


        this.tiempo = this.initTiempo;
        this.cronometro = this.time.addEvent({
            delay: 1000,
            callback: this.onCronometro,
            callbackScope: this,
            loop: true,
            startAt: this.tiempo,
        });

        //POPUPS!!
        this.basePopUp = this.add
            .image(0, 0, "popup_contenedor")
            .setOrigin(0.5);


        this.textoTurno = this.add
            .text(0, 0 - 16, "Turno de:", { fontSize: 24, fontStyle: "bold", fontFamily: 'LSans' })
            .setOrigin(0.5);
        this.textoTurno.setShadow(3, 3, 'rgba(191, 147, 11, 1)', 5)
        this.textoTurnoNombre = this.add
            .text(0, 0 + 16, "Jugador 1", { fontSize: 20, fontFamily: 'LSans' })
            .setOrigin(0.5);
        this.textoTurno.setShadow(3, 3, 'rgba(191, 147, 11, 1)', 5);
        this.textoTurnoNombre.setShadow(3, 3, 'rgba(191, 147, 11, 1)', 5);
        this.popUpContenedor = this.add.container(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            [this.basePopUp, this.textoTurno, this.textoTurnoNombre]
        );
        this.popUpContenedor.visible = false;


        this.basePopUp2 = this.add
            .image(0, 0, "popup_contenedor")
            .setOrigin(0.5)
        this.textoConsecuencia = this.add
            .text(0, 0 + 16, "Consecuencia", { fontSize: 20, fontFamily: 'LSans' })
            .setOrigin(0.5);
        this.textoConsecuencia.setShadow(3, 3, 'rgba(191, 147, 11, 1)', 5);
        this.popUpContenedorConsecuencias = this.add.container(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            [this.basePopUp2, this.textoConsecuencia]
        );
        this.popUpContenedorConsecuencias.visible = false;
    }

    update() {
        this.sistemaDeTurnos(this.player1, this.player2, true);
        this.sistemaDeTurnos(this.player2, this.player1, true);
    }
    actualizarPos(id) {
        this.posAnterior = this.posActual;
        this.posActual = parseInt(id);
    }
    resetTime(player) {
        player.setTimeTurn = this.initTiempo;
        this.tiempo = this.initTiempo;
    }
    cambiarTurnos(player1, player2) {
        this.btnDado.visible = false;
        this.tiempo = 5;
        this.textCronometro.setText(this.tiempo);
        this.cronometro.reset({
            delay: 1000,
            callback: () => this.tiempoCronometroPopUp(player1, player2),
            callbackScope: this,
            loop: true,
            startAt: this.tiempo,
            paused: false,
        });
        player1.setIsTurn = false;
        player2.setIsTurn = true;
        this.textName.setText(player2.getName);
        this.popUpContenedor.visible = true;
    }
    pierdeTurno(player1, player2) {
        //Si el jugador1 pierde su turno, sigue jugando el jugador2.
        /*Verifico si el contador de turnos perdidos/acomulados es mayor o igual a 1. Y si  el jugador no se puede mover*/
        if (player1.getCountTurn >= 1 && player1.getCanMove === false) {
            //Reset de las propiedades.
            player1.setCountTurn = 0;
            player1.setCanMove = true;

            //Setteo la secuencia de quien sigue el turno
            this.cambiarTurnos(player1, player2);
            return;
        }
    }
    sistemaDeTurnos(player1, player2, clickOnButton = true) {
        if (player1.getIsTurn && !player2.getIsTurn) {
            jugadorActual = player1;
            jugadorProximo = player2;
            //Si perdio el turno automaticamente con esta funcion, realiza un return y sigue el proximo jugador. Evitando que se ejecute el resto del bloque de este sistemaDeTurnos!
            this.pierdeTurno(jugadorActual, player2);
            this.textoTurnoNombre.setText(`${player1.getName}`);

            //Para que se pueda tirar el dado.
            jugadorActual.setCanThrowDice = true;
            player2.setCanThrowDice = false;

            //Si el jugador da click, tira el dado.
            if (clickOnButton) return;

            this.tweens.add({
                targets: this.btnDado,
                duration: 1000,
                rotation: 360,
                ease: "Power3",
                repeat: 0,
                yoyo: false,
                onStart: () => {
                    jugadorActual.anims.play(
                        `${jugadorActual.animacion}-move`,
                        true
                    );
                    this.sonidos.sound.tirarDadoSFX.volume = 1;
                    this.sonidos.sound.tirarDadoSFX.play();
                },
                onComplete: () => {
                    jugadorActual.tirarDado(clickOnButton);
                    this.numeroDado.setText(jugadorActual.getNumeroDelDado);
                    this.resetTime(player1);
                    this.textCronometro.setText(this.tiempo);
                    this.cronometro.paused = true;
                    this.cambiarTurnos(jugadorActual, player2);
                    this.btnDado.setRotation(0);
                },
            });
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
        casillaBody.visible = false;
        casillaBody.setScale(0.5).refreshBody();
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
    tiempoCronometroPopUp(jugadorAnterior, jugadorProximo) {
        this.tiempo -= 1;
        this.textCronometro.setText(this.tiempo);
        if (this.tiempo <= 0) {
            this.tiempo = this.initTiempo;
            this.btnDado.visible = true;
            this.popUpContenedor.visible = false;
            this.cronometro.reset({
                delay: 1000,
                callback: this.onCronometro,
                callbackScope: this,
                loop: true,
                startAt: this.tiempo,
                paused: false,
            });
        }
    }
    onCronometro() {
        this.tiempo -= 1;
        this.textCronometro.setText(this.tiempo);
        if (this.tiempo <= 0) {
            let jugadorAct, jugadorCambio;
            for (let player in this.players) {
                let playerObj = this.players[player];
                if (playerObj.getIsTurn) jugadorAct = playerObj;
            }
            for (let player in this.players) {
                let playerObj = this.players[player];
                if (!playerObj.getIsTurn) jugadorCambio = playerObj;
            }
            this.sistemaDeTurnos(jugadorAct, jugadorCambio, false);
            this.tiempo = this.initTiempo;
        }
    }
    retrocederCasillas(player, num, anteriorPos, posActual) {
        let nuevaPos = this.posActual - num;
        if (nuevaPos <= 0) {
            posActual = 1;
            player.soloMover(posActual);
            this.player1.setIsTurn = false;
            this.player2.setIsTurn = true;
            return;
        }
        posActual = nuevaPos;
        player.soloMover(posActual);
        this.player1.setIsTurn = false;
        this.player2.setIsTurn = true;
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

        const numeroRandom = Phaser.Math.Between(1, 4);
        switch (numeroRandom) {
            case 1:
                console.warn("Pierdes el turno");
                this.popUpContenedorConsecuencias.visible = true;
                this.textoConsecuencia.setY(0)
                this.textoConsecuencia.setText("Pierdes el turno");
                player.setCanMove = false;
                player.setCountTurn = 1;
                setTimeout(() => {
                    this.popUpContenedorConsecuencias.visible = false;
                }, 2000);
                break;
            case 2:
                console.warn("Retrocede 4 casillas");
                this.popUpContenedorConsecuencias.visible = true;
                this.textoConsecuencia.setText("Retrocede 4 casillas");
                this.textoConsecuencia.setY(0)
                setTimeout(() => {
                    this.popUpContenedorConsecuencias.visible = false;
                }, 2000);
                player.setIsTurn = false;
                player.setCanThrowDice = false;
                this.retrocederCasillas(player, 4, null, this.posActual);
                break;

            case 3:
                console.warn("Retrocede 4 casillas al CONTRICANTE");
                console.error(player.getName);
                this.popUpContenedorConsecuencias.visible = true;
                this.textoConsecuencia.setY(0)
                this.textoConsecuencia.setText(`   Tu contricante\nretrocede 4 casillas`);
                setTimeout(() => {
                    this.popUpContenedorConsecuencias.visible = false;
                }, 2000);
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
                            this.posActual = jugadorAfectado.getPosJugador;

                            this.retrocederCasillas(
                                jugadorAfectado,
                                4,
                                null,
                                this.posActual
                            );
                            player.setAfectarContricante = false;
                        }, 3000);
                    }
                }
                break;
            case 4:
                console.warn("Yunque en la cabeza");
                this.textoConsecuencia.setY(5);
                this.popUpContenedorConsecuencias.visible = true;
                this.textoConsecuencia.setText(`Te cayo un yunque\n  en la cabeza.\n Vuelves a inicio.`);
                setTimeout(() => {
                    this.popUpContenedorConsecuencias.visible = false;
                    player.soloMover(1);
                    this.camara.shake(200);
                }, 2000);
                break;
        }
    }
    reactivarCasillaMecanica() {
        if (this.casillaDescativadaOverlap)
            this.casillaDescativadaOverlap.enableBody(
                true,
                this.casillaDescativadaOverlap.x,
                this.casillaDescativadaOverlap.y,
                true,
                false
            );
    }
}
