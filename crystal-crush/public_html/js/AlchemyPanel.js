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
    this.elementToCombine;
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
        this.alcElements = this.game.add.group();
    },
    update: function() {

    },
    receiveElement: function(element_name) {
        elementToCombine = element_name;
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
        if (alchemyPanel.elementToCombine !== null && alchemyPanel.getElement(curX, curY) === null) {
            if (scorePanel.decreaseElement(alchemyPanel.elementToCombine)) {
                var elem = alchemyPanel.alcElements.create(curX * ELEM_SIZE + alchemyPanel.gridX,
                        curY * ELEM_SIZE + alchemyPanel.gridY, elementToCombine);

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
    }
};

