import Button from "../js/functions/Button.js";

let stringName = "";
let canEdit = true;
let players = {
    player1: {
        name: "Jugador 1",
        x: 150,
        y: 300,
        color: "0x32a852",
        texture: "duckWhite",
    },
    player2: {
        name: "Jugador 2",
        x: 325,
        y: 300,
        color: "0xa8323a",
        texture: "duckWhite",
    },
    // player3: {
    //     name: "Jugador 3",
    //     x: 500,
    //     y: 300,
    //     color: "0xedd500",
    //     texture: "duckWhite",
    // },
    // player4: {
    //     name: "Jugador 4",
    //     x: 675,
    //     y: 300,
    //     color: "0x000ced",
    //     texture: "duckWhite",
    // },
};
export default class SeleccionPersonajes extends Phaser.Scene {
    constructor() {
        super("SeleccionPersonajes");
    }
    create() {
        for (let player in players) {
            let playerObj = players[player];
            let { x, y, name, color, texture } = playerObj;
            this.add.image(x, y, texture).setTint(color);
            let nameText = this.add.text(x, y + 50, name).setOrigin(0.5);
            this.createInputs(nameText, playerObj);
        }
        
        const btnCerrar = new Button(this, this.sys.game.config.width - 45, this.sys.game.config.height - (this.sys.game.config.height - 45) , "btnCerrar", () => this.scene.start("Inicio"));
        const btnListo = new Button(this, 400, 500, "btnListo", () => this.scene.start("Tablero", { players }))
    }

    createInputs(nameText, playerObj) {
        let btnEdit, btnReady;
        btnEdit = this.add
            .image(nameText.x + 80, 350, "lapizEdit")
            .setOrigin(0.5)
            .setInteractive();
        btnReady = this.add
            .image(nameText.x + 80, 350, "btnCheck")
            .setOrigin(0.5)
            .setInteractive();
        btnReady.visible = false;

        btnEdit.on("pointerdown", () => {
            //Primero verifico si no hay ningun otro editandoce.
            if (!canEdit) return;
            canEdit = false;
            // playerObj.name = "";
            nameText.setText("Escriba...");
            nameText.setColor("red");
            stringName = "";
            window.addEventListener("keydown", writeName);
            btnEdit.visible = false;
            btnReady.visible = true;
        });
        btnReady.on("pointerdown", () => {
            canEdit = true;
            btnEdit.visible = true;
            btnReady.visible = false;
            nameText.setColor("white");
            window.removeEventListener("keydown", writeName);
            if (nameText.text === "Escriba...") {
                nameText.setText(playerObj.name);
            }
        });

        function writeName(e) {
            if (stringName.length >= 9) return;
            let letters = ['q', 'w', 'e', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace', 'enter', ' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
            const isRight = letters.some((letter) => letter.toLowerCase() === e.key.toLowerCase());

            //Verifico si la tecla es correctecta
            if (!isRight) return;
            //Verifico si la tecla es el boton de borrar, entonces borra el ultima letra
            if (e.key === 'Backspace') {
                nameText.setColor("green");
                let string = stringName.charAt(0).toUpperCase() + stringName.slice(1);
                stringName = string.slice(0, string.length - 1);
                nameText.setText(stringName);
                playerObj.name = stringName;
                return;
            }
            if (e.key === 'Enter') {
                canEdit = true;
                btnEdit.visible = true;
                btnReady.visible = false;
                nameText.setColor("white");
                window.removeEventListener("keydown", writeName);
                if (nameText.text === "Escriba...") {
                    nameText.setText(playerObj.name);
                }
                return
            }
            nameText.setColor("green");
            stringName += e.key;
            let string = stringName.charAt(0).toUpperCase() + stringName.slice(1);
            nameText.setText(string);
            playerObj.name = string;
        }
    }
}
