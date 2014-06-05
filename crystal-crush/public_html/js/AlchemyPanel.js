var CREATE_BUTTON_WIDTH = 408;
var CREATE_BUTTON_HEIGHT = 80;

AlchemyPanel = function(game, x, y, width, height) {

    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.background;
    this.grid;
    this.alcElements;
    this.columns = 3;
    this.rows = 3;
    this.gridWidth = this.columns * ELEM_SIZE;
    this.gridHeight = this.rows * ELEM_SIZE;
    this.gridX = this.x + this.width / 2 - this.gridWidth / 2;
    this.gridY = this.y + margin;
    this.buttonWidth = this.columns * ELEM_SIZE;
    this.buttonHeight = this.buttonWidth * CREATE_BUTTON_HEIGHT / CREATE_BUTTON_WIDTH;
    this.buttonX = this.gridX + this.gridWidth / 2;
    this.buttonY = this.gridY + this.gridHeight + this.buttonHeight;
    this.elementToCombine;
};

AlchemyPanel.prototype = {
    preload: function() {
        this.game.load.image('alchemyPanel', 'assets/alchemyPanel.png');
        this.game.load.image('grid', 'assets/sprites/Grille2.png');
        this.game.load.spritesheet('createButton2', 'assets/buttons/button_create.png', 394, 80);
    },
    create: function() {
        this.background = game.add.sprite(this.x, this.y, 'alchemyPanel');
        this.background.width = this.width;
        this.background.height = this.height;
        this.grid = game.add.sprite(this.gridX, this.gridY, 'grid');
        this.grid.width = this.gridWidth;
        this.grid.height = this.gridHeight;
        this.grid.inputEnabled = true;
        this.grid.events.onInputDown.add(this.addElementToGrid);
        var createButton = game.add.button(this.buttonX, this.buttonY, 'createButton2', this.createCrystal, this, 2, 1, 0);
        createButton.width = this.buttonWidth;
        createButton.height = this.buttonHeight;
        createButton.anchor.setTo(0.5, 0.5);
        this.alcElements = this.game.add.group();
        this.elementToAdd;
    },
    update: function() {

    },
    receiveElement: function(element) {
        this.elementToAdd = element;
    },
    calcElementId: function(posX, posY) {
        return posX + posY * BOARD_COLS;
    },
    // find a elem on the board according to its position on the board
    getElement: function(posX, posY) {
        return alchemyPanel.alcElements.iterate("id", calcElementId(posX, posY), Phaser.Group.RETURN_CHILD);
    },
    // convert world coordinates to board position
    getRelativeElementPos: function(coordinate, axisX) {
        if (axisX) {
            return Phaser.Math.floor((coordinate - alchemyPanel.gridX + game.camera.x) / ELEM_SIZE);
        } else {
            return Phaser.Math.floor((coordinate - alchemyPanel.gridY) / ELEM_SIZE);
        }
    },
    setElementPosition: function(elem, posX, posY) {
        elem.posX = posX;
        elem.posY = posY;
        elem.id = calcElementId(posX, posY);
    },
    addElementToGrid: function() {
        var curX = alchemyPanel.getRelativeElementPos(game.input.activePointer.x, true);
        var curY = alchemyPanel.getRelativeElementPos(game.input.activePointer.y, false);
        if (alchemyPanel.elementToAdd !== null && alchemyPanel.getElement(curX, curY) === null) {
            if (scorePanel.decreaseElement(alchemyPanel.elementToAdd.key)) {
                var elem = alchemyPanel.alcElements.create(curX * ELEM_SIZE + alchemyPanel.gridX,
                        curY * ELEM_SIZE + alchemyPanel.gridY, alchemyPanel.elementToAdd.key);

                elem.width = ELEM_SIZE;
                elem.height = ELEM_SIZE;
                alchemyPanel.setElementPosition(elem, curX, curY);
            }
        } else {
            //console.log("Can't place");
        }
    },
    createCrystal: function() {
        //console.log("create");
        //TODO Compare structure new element
        alchemyPanel.killElemRange(0, 0, 3, 3);
        alchemyPanel.removeKilledElems();
        scorePanel.createElement("NaCl");
    },
    killElemRange: function(fromX, fromY, toX, toY) {
        fromX = Phaser.Math.clamp(fromX, 0, BOARD_COLS - 1);
        fromY = Phaser.Math.clamp(fromY, 0, BOARD_ROWS - 1);
        toX = Phaser.Math.clamp(toX, 0, BOARD_COLS - 1);
        toY = Phaser.Math.clamp(toY, 0, BOARD_ROWS - 1);
        for (var i = fromX; i <= toX; i++) {
            for (var j = fromY; j <= toY; j++) {
                var elem = alchemyPanel.getElement(i, j);
                if (elem !== null) {
                    elem.kill();
                }
            }
        }
    },
    removeKilledElems: function() {
        alchemyPanel.alcElements.forEach(function(element) {
            if (!element.alive) {
                alchemyPanel.setElementPosition(element, -1, -1);
            }
        });
    }
};

