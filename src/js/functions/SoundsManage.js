export default class SoundsManage{
    constructor(soundScene, volume = 0.2, sound) {
        this.sound = soundScene;
        this.sound.volume = volume;
        this.sound.musicMain = this.sound.add("musicMain", { loop: true, volume: volume });
        this.sound.musicTablero = this.sound.add("musicTablero", { loop: true, volume: volume });
        this.sound.tirarDadoSFX = this.sound.add("tirarDado");
        this.sound.movimientoDadoSFX = this.sound.add("movimiento");
    }
}
