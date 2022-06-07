import Precarga from "../scenes/Precarga.js";
import Inicio from "../scenes/Inicio.js";
import Ayuda from "../scenes/Ayuda.js";
import Creditos from "../scenes/Creditos.js";
import SeleccionPersonajes from "../scenes/SeleccionPersonajes.js";
import Tablero from "../scenes/Tablero.js";
import Ganador from "../scenes/Ganador.js";

export const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [Precarga, Inicio, Ayuda, Creditos, SeleccionPersonajes, Tablero, Ganador],
};