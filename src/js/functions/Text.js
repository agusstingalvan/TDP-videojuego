export default class Text {
    texto
    constructor(scene, x, y, text, size = 16, style, origin = 0.5, color = 'white') {
        this.texto = scene.add.text(x, y, text, { fontSize: size, fontStyle: style, fontFamily: 'Lsans', color: color }).setOrigin(origin);
    }
    setText(text) {
        this.texto.setText(text);
    }
}