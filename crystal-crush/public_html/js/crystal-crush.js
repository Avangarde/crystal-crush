// Example by https://twitter.com/awapblog
// Modified by Avantgarde

var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var scorePanelWidth = canvasWidth * 0.3;
var gamePanelWidth = canvasWidth * 0.7;

var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, '', {preload: preload, create: create});
var BOARD_COLS = 6;
var BOARD_ROWS = 6;
var ELEM_SIZE;
var ELEM_SPACING;
var ELEM_SIZE_SPACED = ELEM_SIZE + ELEM_SPACING;

var CU = "CU";
var ZN = "ZN";
var NA = "NA";
var CL = "CL";
var A = "A";
var B = "B";

var elements;

function preload() {
    game.load.image('logo', 'phaser.png');
}

function create() {
    fillBoard();
    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
}

function update() {

}

function fillBoard() {
    elements = game.add.group();
    for (var i = 0; i < BOARD_COLS; i++) {
        for (var j = 0; j < BOARD_ROWS; j++) {
            //Create random element
        }
    }
}
