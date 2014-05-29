// Example by https://twitter.com/awapblog
// Modified by Avantgarde


var game = new Phaser.Game(canvasWidth, canvasHeight, Phaser.AUTO, '', {preload: preload, create: create});

function preload() {
    game.load.image(CU, 'assets/sprites/Cu.png');
    game.load.image(ZN, 'assets/sprites/Zn.png');
    game.load.image(NA, 'assets/sprites/Na.png');
    game.load.image(CL, 'assets/sprites/Cl.png');
    game.load.image(A, 'assets/sprites/A.png');
    game.load.image(B, 'assets/sprites/B.png');

}

function create() {
    fillBoard();
}

function update() {

}

function fillBoard() {
    elements = game.add.group();
    var boardRowsAndColumns = canvasWidth > canvasHeight ?
            canvasHeight / BOARD_ROWS :
            canvasWidth / BOARD_COLS;
    for (var i = 0; i < BOARD_COLS; i++) {
        for (var j = 0; j < BOARD_ROWS; j++) {
            var rndIndex = game.rnd.integerInRange(0, elemNames.length-1);
            var element = elements.create(i * ELEM_SIZE_SPACED, j * ELEM_SIZE_SPACED, elemNames[rndIndex]);
            element.width = boardRowsAndColumns;
            element.height = boardRowsAndColumns;
            setElementPosition(element, i, j);
            selectedGemStartPos = {x: 0, y: 0};
        }
    }
}

function setElementPosition(elem, posX, posY) {
    elem.posX = posX;
    elem.posY = posY;
    elem.id = calcGemId(posX, posY);
}

function calcGemId(posX, posY) {
    return posX + posY * BOARD_COLS;
}