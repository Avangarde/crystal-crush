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

    game.load.image('background', 'assets/background.png');
    game.load.image('scorePanel', 'assets/scorePanel.png');
    game.load.image('gamePanel', 'assets/gamePanel.png');
}

function create() {
    var background = game.add.sprite(0, 0, 'background');
    background.width = canvasWidth;
    background.height = canvasHeight;
    var scorePanel = game.add.sprite(margin, margin, 'scorePanel');
    scorePanel.width = scorePanelWidth;
    scorePanel.height = scorePanelHeight;
    var gamePanel = game.add.sprite(game.world.centerX + scorePanelWidth/2 + margin, game.world.centerY, 'gamePanel');
    gamePanel.width = gamePanelWidth;
    gamePanel.height = gamePanelHeight;
    gamePanel.anchor.setTo(0.5, 0.5);
    fillBoard();
    
}

function update() {

}

function fillBoard() {
    elements = game.add.group();
    var boardRowsAndColumns = (gamePanelHeight - (2*margin)) / BOARD_ROWS;
    var xgamePanel = game.world.centerX + scorePanelWidth/2 + 2*margin - gamePanelWidth/2;
    for (var i = 0; i < BOARD_COLS; i++) {
        for (var j = 0; j < BOARD_ROWS; j++) {
            var rndIndex = game.rnd.integerInRange(0, elemNames.length-1);
            var element = elements.create(i * ELEM_SIZE_SPACED + xgamePanel, j * ELEM_SIZE_SPACED + (2*margin), elemNames[rndIndex]);
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