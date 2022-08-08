export default class Player extends Phaser.Physics.Arcade.Sprite {
    numeroDelDado;
    constructor(
        scene,
        x,
        y,
        texture,
        frame,
        name,
        color,
        timeTurn = 15,
        map,
        posJugador, sonido
    ) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.animacion = frame;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setTint(color);

        this.timeTurn = timeTurn;
        this.isTurn = false;
        this.canThrowDice = false;
        this.canPlay = true;
        this.canMove = true;
        this.wallet = 0;
        this.canBuy = true;
        this.invetory = {
            slotOne: null,
            slotTwo: null,
        };
        this.name = name;
        this.posJugador = posJugador;
        this.map = map;
        this.countTurn = 0;
        this.afectarContricante = false;
        // this.anims.play(`${this.animacion}-idle`, false)
        this.sonidoMoverse = sonido;
        this.numeroDelDado = 0;
    }

    get getTimeTurn() {
        return this.timeTurn;
    }
    set setTimeTurn(time) {
        this.timeTurn = time;
    }
    get getCanThrowDice() {
        return this.canThrowDice;
    }
    set setCanThrowDice(bool) {
        this.canThrowDice = bool;
    }
    get getCanPlay() {
        return this.canPlay;
    }
    set setCanPlay(canPlay) {
        this.canPlay = canPlay;
    }
    get getCanMove() {
        return this.canMove;
    }
    set setCanMove(canMove) {
        this.canMove = canMove;
    }
    get getWallet() {
        return this.wallet;
    }
    set setWallet(money) {
        this.wallet = money;
    }
    get getInvetory() {
        return this.invetory;
    }
    set setInvetory(invetory) {
        const { slotOne, slotTwo } = invetory;
        this.invetory = {
            slotOne: slotOne,
            slotTwo: slotTwo,
        };
    }
    get getName() {
        return this.name;
    }
    set setName(name) {
        this.name = name;
    }
    get getIsTurn() {
        return this.isTurn;
    }
    set setIsTurn(bool) {
        this.isTurn = bool;
    }
    get getPosJugador() {
        return this.posJugador;
    }
    set setPosJugador(num) {
        this.posJugador = num;
    }
    get getCountTurn() {
        return this.countTurn;
    }
    set setCountTurn(num = 1) {
        this.countTurn += num;
    }
    get getAfectarContricante() {
        return this.afectarContricante;
    }
    set setAfectarContricante(bool) {
        this.afectarContricante = bool;
    }
    get getNumeroDelDado() {
        return this.numeroDelDado;
    }
    mover(dado = 1) {
        this.posJugador += dado;
        if (this.posJugador > 42) {
            this.posJugador -= dado;
        }
        if (this.posJugador === 42) {
            this.scene.scene.start("Ganador", this);
        }
        let spawnPoint = this.map.findObject(
            "casillas",
            (obj) => obj.name === this.posJugador.toString()
        );
        this.setX(spawnPoint.x);
        this.setY(spawnPoint.y);

        this.setIsTurn = false;
        this.setCanThrowDice = false;
        this.sonidoMoverse.play();
    }
    tirarDado(isClick = false) {
        if (this.getCanThrowDice && this.getCanMove) {
            if (isClick) {
                this.numeroDelDado = Phaser.Math.Between(1, 6)
                this.mover(this.numeroDelDado)
            } else {
                this.numeroDelDado = 1;
                this.mover(1);
            }

        }
    }
    soloMover(pos) {
        this.setPosJugador = pos;
        let spawnPoint = this.map.findObject(
            "casillas",
            (obj) => obj.name === pos.toString()
        );
        this.setX(spawnPoint.x);
        this.setY(spawnPoint.y);
    }
}
