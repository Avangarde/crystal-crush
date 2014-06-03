AlchemyPanel = function(game, x, y, width, height) {

    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.background;
    this.grid;
    this.alcElements;
    this.columns = 4;
    this.rows = 4;
    this.widthGrid = this.columns * ELEM_SIZE;
    this.heightGrid = this.rows * ELEM_SIZE;
    this.gridX = this.x + this.width / 2 - this.widthGrid / 2;
    this.gridY = this.y + margin;
    this.widthButton = 2 * ELEM_SIZE;
    this.heightButton = ELEM_SIZE;
    this.buttonX = this.gridX + this.widthGrid / 2;
    this.buttonY = this.gridY + this.heightGrid + this.heightButton;
    this.selectedElement;
};

AlchemyPanel.prototype = {
    preload: function() {
        this.game.load.image('alchemyPanel', 'assets/alchemyPanel.png');
        this.game.load.image('grid', 'assets/sprites/Grille2.png');
        this.game.load.spritesheet('createButton2', 'assets/buttons/button_create.png', 193, 71);
    },
    create: function() {
        this.background = game.add.sprite(this.x, this.y, 'alchemyPanel');
        this.background.width = this.width;
        this.background.height = this.height;
        this.grid = game.add.sprite(this.gridX, this.gridY, 'grid');
        this.grid.width = this.widthGrid;
        this.grid.height = this.heightGrid;
        this.grid.inputEnabled = true;
        this.grid.events.onInputDown.add(this.addElementToGrid);
        var createButton = game.add.button(this.buttonX, this.buttonY, 'createButton2', this.createCrystal, this, 2, 1, 0);
        createButton.width = this.widthButton;
        createButton.height = this.heightButton;
        createButton.anchor.setTo(0.5, 0.5);
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

    },
    calcElementId: function(posX, posY) {
        return posX + posY * BOARD_COLS;
    },
    // find a elem on the board according to its position on the board
    getElement: function(posX, posY) {
        return this.alcElements.iterate("id", calcElementId(posX, posY), Phaser.Group.RETURN_CHILD);
    },
    // convert world coordinates to board position
    getRelativeElementPos: function(coordinate, axisX) {
        if (axisX) {
            return Phaser.Math.floor((coordinate - this.gridX + game.camera.x) / ELEM_SIZE);
        } else {
            return Phaser.Math.floor((coordinate - this.gridY) / ELEM_SIZE);
        }
    },
    setElementPosition: function(elem, posX, posY) {
        elem.posX = posX;
        elem.posY = posY;
        elem.id = calcElementId(posX, posY);
    },
    addElementToGrid: function() {
        var cursorPosX = alchemyPanel.getRelativeElementPos(game.input.activePointer.x, true);
        var cursorPosY = alchemyPanel.getRelativeElementPos(game.input.activePointer.y, false);

        if (alchemyPanel.getElement(cursorPosX, cursorPosY) === null) {
            //console.log("Can place");
        } else {
            //console.log("Can't place");
        }
    },
    createCrystal:function () {
        //console.log("create");
    }
};

