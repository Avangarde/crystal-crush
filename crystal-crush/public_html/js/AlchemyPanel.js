AlchemyPanel  = function(game, x, y, width, height) {

    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.background;
    this.alcElements;
    this.internX = this.xPanel + margin;
    this.internY = this.yPanel + margin;
    
};

AlchemyPanel.prototype = {
    preload: function() {
        this.game.load.image('alchemyPanel', 'assets/alchemyPanel.png');
    },
    create: function() {
        this.background = game.add.sprite(this.x, this.y, 'alchemyPanel');
        this.background.width = this.width;
        this.background.height = this.height;
        this.alcElements = game.add.group();        
    },
    update: function() {
        
    },
receiveElement: function(element_name){
    // TODO
    }
};
/*
// find a elem on the board according to its position on the board
function getElement(posX, posY) {
    return this.alcElements.iterate("id", calcElementId(posX, posY), Phaser.Group.RETURN_CHILD);
}

// convert world coordinates to board position
function getRelativeElementPos(coordinate, axisX) {
    if (axisX) {
        return Phaser.Math.floor((coordinate - gamePanel.internalX) / ELEM_SIZE);
    } else {
        return Phaser.Math.floor((coordinate - gamePanel.internalY) / ELEM_SIZE);
    }
}

function setElementPosition(elem, posX, posY) {
    elem.posX = posX;
    elem.posY = posY;
    elem.id = calcElementId(posX, posY);
}

function calcElementId(posX, posY) {
    return posX + posY * BOARD_COLS;
}
*/
