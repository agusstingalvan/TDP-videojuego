// import Player from "../js/objects/Player.js";

// let player1, player2, player3, player4;

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
    player3: {
        name: "Jugador 3",
        x: 500,
        y: 300,
        color: "0xedd500",
        texture: "duckWhite",
    },
    player4: {
        name: "Jugador 4",
        x: 675,
        y: 300,
        color: "0x000ced",
        texture: "duckWhite",
    },
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
        // player1 = new Player(this, 150, 300, "duckWhite", null, "Jugador 1").setTint('0x32a852')
        // player2 = new Player(this, 325, 300, "duckWhite", null, "Jugador 2").setTint('0xa8323a')
        // player3 = new Player(this, 500, 300, "duckWhite", null, "Jugador 3").setTint('0xedd500')
        // player4 = new Player(this, 675, 300, "duckWhite", null, "Jugador 4").setTint('0x000ced')

        // let namePlayer1 = this.add.text(150, 350, player1.getName).setOrigin(0.5);
        // let namePlayer2 = this.add.text(325, 350, player2.getName).setOrigin(0.5);
        // let namePlayer3 = this.add.text(500, 350, player3.getName).setOrigin(0.5);
        // let namePlayer4 = this.add.text(675, 350, player4.getName).setOrigin(0.5);
        // // namePlayer2 = this.add.text(100, 350, player1.getName).setOrigin(0.5);
        // this.createInputs(namePlayer1, player1);
        // this.createInputs(namePlayer2, player2);
        // this.createInputs(namePlayer3, player3);
        // this.createInputs(namePlayer4, player4);
        this.add
            .text(760, 20, "X", { backgroundColor: "white", color: "black" })
            .setInteractive()
            .on("pointerdown", () => this.scene.start("Inicio"));
        this.add
            .text(400, 500, "Listo")
            .setInteractive()
            .on("pointerdown", () => this.scene.start("Tablero", { players }));
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
            nameText.setColor("green");
            stringName += e.key;
            let string =
                stringName.charAt(0).toUpperCase() + stringName.slice(1);
            nameText.setText(string);
            playerObj.name = string;
        }
    }
}
