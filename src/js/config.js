import Precarga from "../scenes/Precarga.js";
import Inicio from "../scenes/Inicio.js";
import SeleccionPersonajes from "../scenes/SeleccionPersonajes.js";
import Tablero from "../scenes/Tablero.js";
import Ganador from "../scenes/Ganador.js";

export const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 768,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 800,
            height: 600,
        },
        max: {
            width: 1280,
            height: 768,
        },
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scene: [
        Precarga,
        Inicio,
        SeleccionPersonajes,
        Tablero,
        Ganador,
    ],
};
