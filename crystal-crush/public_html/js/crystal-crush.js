// Example by https://twitter.com/awapblog

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'crystal-crush', { preload: preload, create: create, update: update });

var BOARD_COLS = 6;
var BOARD_ROWS = 6;
var ELEM_SIZE;
var ELEM_SPACING;
var ELEM_SIZE_SPACED = ELEM_SIZE + ELEM_SPACING;

var CU = "CU";
var ZN = "ZN";
var NA = "NA";
var CL = "CL";

var elements;


function preload() {
    
}

function create() {
    fillBoard();
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