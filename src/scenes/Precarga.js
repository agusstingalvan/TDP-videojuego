export default class Precarga extends Phaser.Scene {
    constructor() {
        super("Precarga");
    }
    preload() {
        //Sprite para tests
        this.load.image("duckWhite", "public/assets/images/duck-white.png");

        //Mapas
        this.load.tilemapTiledJSON(
            "map_tablero",
            "public/assets/tilemaps/tablero.json"
        );

        //Atlas
        this.load.atlas('atlas_backgrounds', 'public/assets/images/atlas/escenas/atlas_backgrounds.png', 'public/assets/images/atlas/escenas/atlas_backgrounds.json');
        this.load.atlas('atlas_casillas', 'public/assets/images/atlas/casillas/atlas_casillas.png', 'public/assets/images/atlas/casillas/atlas_casillas.json');

        //Atlas de patos
        this.load.atlas(
            "atlas_patos_static",
            "public/assets/images/atlas/atlas_patos_static.png",
            "public/assets/images/atlas/atlas_patos_static.json"
        );
        this.load.atlas(
            "atlas_patos_spritesheet",
            "public/assets/images/atlas/atlas_patos_spritesheet.png",
            "public/assets/images/atlas/atlas_patos_spritesheet.json"
        );

        //Sprites de personajess
        this.load.spritesheet(
            "spritesheet-pato-bruja",
            "public/assets/images/spritesheet/spritesheet-pato-bruja.png",
            { frameWidth: 64, frameHeight: 64 }
        );
        this.load.spritesheet(
            "spritesheet-pato-galera",
            "public/assets/images/spritesheet/spritesheet-pato-galera.png",
            { frameWidth: 64, frameHeight: 64 }
        );

        //Botones
        this.load.atlas(
            "botones",
            "public/assets/images/atlas/botones/atlas_botones_amarrillos.png",
            "public/assets/images/atlas/botones/atlas_botones_amarrillos.json"
        );
        this.load.image(
            "boton-dado",
            "public/assets/images/botones/boton-dado.png"
        );
        this.load.image(
            "lapizEdit",
            "public/assets/images/botones/lapiz-edit.png"
        );
        this.load.image(
            "btnCheck",
            "public/assets/images/botones/boton-check.png"
        );


        //UI - Interfaz de usuario
        this.load.image('casilleroUI', 'public/assets/images/casillero-interfaz.png');
        this.load.image('reloj', 'public/assets/images/reloj.png');

        //Utilidades
        this.load.image(
            "casillaInvisible",
            "public/assets/images/casillas/casilla-invisible.png"
        );
        this.load.image(
            "cargandoEstatico",
            "public/cargandoUltimo-19.png"
        );

        //Audios - SFX
        this.load.audio('movimiento', 'public/assets/sounds/movimiento3.mp3');
        this.load.audio('tirarDado', 'public/assets/sounds/sonido-dado.mp3');
        this.load.audio('musicTablero', 'public/assets/sounds/music-tablero.mp3');
        this.load.audio('musicMain', 'public/assets/sounds/music-main-menu.mp3');

        //PopUps
        this.load.image('popup_contenedor', 'public/assets/images/popups/popup_contenedor.png');
        this.load.image('popup-ayuda', 'public/assets/images/popups/popup-ayuda.png');
        this.load.image('popup-opciones', 'public/assets/images/popups/popup-opciones.png');
        this.load.image('popup-creditos', 'public/assets/images/popups/popup-creditos.png');
    }
    create() {
        this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, "cargandoEstatico");
        this.anims.create({
            key: "pato-bruja-move",
            frames: this.anims.generateFrameNumbers("spritesheet-pato-bruja", {
                start: 0,
                end: 29,
            }),
            frameRate: 15,
            repeat: 0,
        });
        this.anims.create({
            key: "pato-galera-move",
            frames: this.anims.generateFrameNumbers("spritesheet-pato-galera", {
                start: 0,
                end: 25,
            }),
            frameRate: 15,
            repeat: 0,
        });
        setTimeout(() => this.scene.start("Inicio"), 1000)
    }

}
