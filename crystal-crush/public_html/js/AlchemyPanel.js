AlchemyPanel  = function(game) {

    this.game = game;
    this.panelWidth = canvasHeight - (2 * margin);
    this.panelHeight = canvasHeight - (2 * margin);
    this.xPanel = (2 * margin + this.panelWidth) * -1;
    this.yPanel = margin;
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
        this.background = game.add.sprite(-canvasWidth / 2 + scorePanelWidth / 2 + margin, canvasHeight / 2, 'alchemyPanel');
        this.background.width = gamePanelWidth;
        this.background.height = gamePanelHeight;
        this.background.anchor.setTo(0.5, 0.5);
        this.alcElements = game.add.group();        
    },
    update: function() {
        
    }
};

// find a elem on the board according to its position on the board
function getElement(posX, posY) {
    return this.alcElements.iterate("id", calcElementId(posX, posY), Phaser.Group.RETURN_CHILD);
}

// convert world coordinates to board position
function getRelativeElementPos(coordinate, axisX) {
    if (axisX) {
        return Phaser.Math.floor((coordinate - xgamePanel) / ELEM_SIZE);
    } else {
        return Phaser.Math.floor((coordinate - (2 * margin)) / ELEM_SIZE);
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