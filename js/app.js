function Furry (){
   this.x = 0;
   this.y = 0;
   this.direction = 'right';

}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);

}

function Game() {

    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function(x,y) {
        return x + (y * 10);
    };
    this.showFurry = function () {
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
    };


    this.showCoin = function () {
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    };


    this.moveFurry = function() {
        this.gameOver();
        this.hideVisibleFurry();

        if(this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
            } else if (this.furry.direction === "left"){
                this.furry.x = this.furry.x -1;
            } else if (this.furry.direction === "up"){
                this.furry.y = this.furry.y - 1;
            } else if (this.furry.direction === "down"){
                this.furry.y = this.furry.y  + 1;
        }

        this.showFurry();
        this.checkCoinCollision();
        // return this.gameOver();
    };

    this.hideVisibleFurry = function () {

        var removeFurry = document.querySelector(".furry");
        removeFurry.classList.remove("furry");

    };


    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    };
    
    this.checkCoinCollision = function () {

        if(this.furry.x === this.coin.x && this.furry.y === this.coin.y){
            var removeCoin = document.querySelector('.coin');
            removeCoin.classList.remove('coin');

            this.score = this.score +1;
            var scoreTable = document.querySelector('#score strong');
            scoreTable.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();

        }

    };

    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9){

            this.hideVisibleFurry();
            clearInterval(this.idSetInterval);
            alert('GAME OVER YOUR SCORE =' + this.score);

        }
    };

    this.startGame = function () {

        var self = this;

        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);
        return this.idSetInterval;
    };



}

document.addEventListener('keydown', function(event){
    game.turnFurry(event);
});

var game = new Game;

game.showFurry();
game.showCoin();
game.startGame();

