// Example by https://twitter.com/awapblog
// Modified by Avantgarde

var canvasWidth=window.innerWidth;
var canvasHeight=window.innerHeight;

var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, '', {preload: preload, create: create});

function preload() {
    game.load.image('logo', 'phaser.png');
}

function create() {
    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
}

function update() {

}
