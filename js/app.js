// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //enemy image width and height for collision detection
    this.width = 100;
    this.height = 65;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 101 * 5) {
        this.x += this.speed * dt;
    }
    else {
        this.x = -101; //smooth transition
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //ctx.strokeRect(this.x, this.y + 77, this.width, this.height);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 101 * 2; //each grid cell is 101 pixels in width (as defined in render method in engine.js)
    this.y = 81 * 5 - 15; //each grid cell is 83 pixels in height; -15 is to center the player in the grid cell
    this.sprite = 'images/char-boy.png';

    //player image width and height for collision detection
    this.width = 65;
    this.height = 75;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //ctx.strokeRect(this.x + 20, this.y + 65, this.width, this.height);
};

Player.prototype.handleInput = function(input) {
    switch(input) {
        case 'left':
            if(this.x > 0) {
                this.x -= 101; //each block is 101 pixels wide.
            }
            break;

        case 'right':
        if(this.x < 101 * 4) {
            this.x += 101; 
        }
        break;

        case 'up':
        // y > 81 to prevent player going into the water
        //if(this.y > 81) { 
            this.y -= 81; 
            //console.log(this.y);
        //}
        break;

        case 'down':
        if(this.y < 81 * 4) { 
            this.y += 81; 
        }
        break;
    }
};

Player.prototype.update = function() {

};


Player.prototype.reset = function() {
    this.x =  101 * 2;
    this.y = 81 * 5 - 15;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const enemy1 = new Enemy(-101, 81 - 18, 200); //-18 to center the enemy inside the block
const enemy2 = new Enemy(-101, 81 - 18, 100);
const enemy3 = new Enemy(-101, 81 * 2 - 18, 150);
const enemy4 = new Enemy(-101, 81 * 3 - 18, 125);
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
