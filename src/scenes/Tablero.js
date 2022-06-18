import Button from "../js/functions/Button.js";
import Player from "../js/objects/Player.js";

// let numeroDelDado, players, player1, player2, player3, player4, textDinero;
// let casillaBody;
// let posActual;
// let casillasLayer, map, casillasGroup

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

        this.numeroDelDado = 0;
        this.posActual = this.posSalida;
        this.initTiempo = 10;
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
            salida.x,
            salida.y,
            this.player1.texture,
            null,
            this.player1.name,
            this.player1.color
        );

        this.casillasGroup = this.physics.add.group();
        this.groupCasillaConsecuencia = this.physics.add.group();
        this.groupCasillaConsecuencia = this.physics.add.group();
        this.casillasLayer.objects.forEach((casilla) => {
            switch (casilla.type) {
                case "consecuencia":
                    /*
                    1: añado una casilla en la posicion de la capa de casillas del tiled segun el type.
                    2: A la casilla que creo mediante el codigo, le descativo la gravedad y la hago no visible.
                    3: le add un overlap. Para saber cuando el jugador pisa dicha casilla. Y poder manejar la cosecuencia. 
                    4: Cuando se activa el callback del overlap. la casilla se desactiva y cuando en una variable la casilla desactivada.
                    5: La casilla desactivada. Se vuelve hacer visible cuando el jugador se mueve nuevamente
                    */
                    this.casillaInvisible =
                        this.groupCasillaConsecuencia.create(
                            casilla.x,
                            casilla.y,
                            "casillaInvisible"
                        );
                    this.casillaInvisible.body.allowGravity = false;
                    this.casillaInvisible.visible = true;

                    this.physics.add.overlap(
                        this.player1,
                        this.casillaInvisible,
                        (player, cas) => {
                            this.actualizarPos(casilla.name);
                            this.casillaConsecuencia(player, cas);
                        },
                        null,
                        this
                    );
                    break;
            }
        });
        //3: le add un overlap. Para saber cuando el jugador pisa dicha casilla. Y poder manejar la cosecuencia.
        // this.physics.add.overlap(
        //     this.player1,
        //     this.groupCasillaConsecuencia,
        //     (player, cas) => {
        //         this.actualizarPos(this.casillaId);
        //         //Duda de esto. para la clase-
        //         console.log(this.casillaId)
        //         this.casillaConsecuencia(player, cas);
        //     },
        //     null,
        //     this
        // );

        this.add.text(0, 0, this.player1.name, { color: "red" });
        this.textDinero = this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height - 100,
            `$ 0`,
            { fontFamily: "Arial", fontSize: 32, color: "red" }
        );
        const dadoPosition = objectsLayers.objects.find(
            (obj) => obj.name === "dado"
        );
        this.btnDado = this.add
            .text(dadoPosition.x, dadoPosition.y, "TirarDado")
            .setInteractive()
            .on("pointerdown", () => this.tirarDado(true));

        const btnCerrar = new Button(
            this,
            this.sys.game.config.width - 45,
            this.sys.game.config.height - (this.sys.game.config.height - 45),
            "btnCerrar",
            () => this.scene.start("Inicio")
        );

        this.tiempo = this.initTiempo;
        this.time.addEvent({
            delay: 1000,
            callback: this.cronometro,
            callbackScope: this,
            loop: true,
        });
        this.textCronometro = this.add.text(
            this.sys.game.config.width / 2,
            0,
            `Tiempo: ${this.tiempo}`,
            { color: "red" }
        );
    }

    cronometro() {
        this.tiempo -= 1;
        this.textCronometro.setText(`Tiempo: ${this.tiempo}`);
        if (this.tiempo <= 0) {
            console.log("Sin tiempo");
            this.tirarDado(false);
            this.tiempo = this.initTiempo;
        }
    }
    actualizarPos(id) {
        this.posActual = parseInt(id);
    }
    tirarDado(click = false) {
        if (click) {
            this.numeroDelDado = Phaser.Math.Between(1, 6);
            this.moverJugador(this.numeroDelDado);
            this.tiempo = this.initTiempo;
        } else {
            this.moverJugador();
            this.tiempo = this.initTiempo;
        }
    }
    moverJugador(dado = 1) {
        // console.log("----------------");
        // console.log("Posactul ", this.posActual);
        // console.log("Dado ", dado);
        // console.log("----------------");
        this.posActual += dado;

        if (this.posActual > this.posLlegada) {
            // this.numeroDelDado = 0;
            this.posActual = this.posActual - dado;
        }
        if (this.posActual === this.posLlegada) {
            this.scene.start("Ganador", this.player1);
        }
        this.soloMover(this.posActual);

        if (this.casillaDescativadaOverlap) {
            this.casillaDescativadaOverlap.enableBody(
                true,
                this.casillaDescativadaOverlap.x,
                this.casillaDescativadaOverlap.y,
                true,
                true
            );
        }
    }
    soloMover(pos) {
        // console.log(typeof pos)
        let spawnPoint = this.map.findObject(
            "casillas",
            (obj) => obj.name === pos.toString()
        );
        this.player1.setX(spawnPoint.x);
        this.player1.setY(spawnPoint.y);
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

        const numeroRandom = Phaser.Math.Between(1, 2);

        switch (numeroRandom) {
            case 1:
                console.log("Pierdes el turno");
                break;
            case 2:
                console.log("Retrocede 4 casillas");
                this.btnDado.visible = false;
                setTimeout(() => {
                    let nuevaPos = this.posActual - 4;
                    if (nuevaPos <= 0) {
                        this.posActual = 1;
                        console.warn("Ahora: ", this.posActual);
                        this.soloMover(this.posActual);
                        return;
                    }
                    this.posActual = this.posActual - 4;
                    console.warn("Ahora: ", this.posActual);
                    this.soloMover(this.posActual);
                    this.btnDado.visible = true;
                }, 3000);
                break;
        }
    }
}

//tirar dado, moverse, usar powerUp, usarCasilla, cronometro.
