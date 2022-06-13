btnEdit = this.add
            .image(180, 350, "lapizEdit")
            .setOrigin(0.5)
            .setInteractive();
        btnReady = this.add
            .image(180, 350, "btnCheck")
            .setOrigin(0.5)
            .setInteractive();
        btnReady.visible = false;

        btnEdit.on("pointerdown", () => {
            player1.setName = "";
            namePlayer1.setText("Escriba...");
            namePlayer1.setColor("red");
            stringName = "";
            window.addEventListener("keydown", writeName);
            btnEdit.visible = false;
            btnReady.visible = true;
        });
        btnReady.on("pointerdown", () => {
            btnEdit.visible = true;
            btnReady.visible = false;
            namePlayer1.setColor("white");
            window.removeEventListener("keydown", writeName);
            console.log(player1.name);
        });

        function writeName(e) {
            namePlayer1.setColor("green");
            stringName += e.key;
            let string = stringName.charAt(0).toUpperCase() + stringName.slice(1);
            namePlayer1.setText(string);
            player1.setName = string;
        }