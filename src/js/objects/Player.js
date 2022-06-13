export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, name, color){
        super(scene, x, y, texture);
        this.scene = scene; 
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setTint(color);


        this.timeTurn = 15;
        this.canThrowDice = true;
        this.canPlay = true;
        this.canMove = true;
        this.wallet = 0;
        this.canBuy = true;
        this.invetory = {
            slotOne: null,
            slotTwo: null,
        }
        this.name = name;
        this.isTurn = false;
    }
    
    get getTimeTurn(){
        return this.timeTurn;
    }
    set setTimeTurn(time){
        this.timeTurn = time;
    }
    get getCanThrowDice(){
        return this.canThrowDice;
    }
    set setCanThrowDice(bool){
        this.canThrowDice = bool;
    }
    get getCanPlay(){
        return this.canPlay;
    }
    set setCanPlay(canPlay){
        this.canPlay = canPlay;
    }
    get getCanMove(){
        return this.canMove;
    }
    set setCanMove(canMove){
        this.canMove = canMove;
    }
    get getWallet(){
        return this.wallet;
    }
    set setWallet(money){
        this.wallet = money;
    }
    get getInvetory(){
        return this.invetory;
    }
    set setInvetory(invetory){
        const {slotOne, slotTwo} = invetory;
        this.invetory = {
            slotOne: slotOne,
            slotTwo: slotTwo
        }
    }
    get getName(){
        return this.name;
    }
    set setName(name){
        this.name = name
    }
    get getIsTurn(){
        return this.isTurn;
    }
    set setIsTurn(bool){
        this.isTurn = bool
    }
}