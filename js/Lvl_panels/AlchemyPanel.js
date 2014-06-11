var CREATE_BUTTON_WIDTH = 394;
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
    this.elementToAdd;
};

AlchemyPanel.prototype = {
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
        if (game.input.activePointer.justReleased() && allowInput) {
            if (this.elementToAdd !== null && typeof this.elementToAdd !== 'undefined') {
                if (this.elementToAdd.x !== this.elementToAdd.startX || this.elementToAdd.y !== this.elementToAdd.startY) {
                    if (this.elementToAdd.x + (this.elementToAdd.width/2) >= this.gridX && this.elementToAdd.x + (this.elementToAdd.width/2) <= this.gridX + this.gridWidth
                            && this.elementToAdd.y + this.elementToAdd.height/2 >= this.gridY  && this.elementToAdd.y + this.elementToAdd.height/2 <= this.gridY + this.gridHeight) {
                        this.addElementToGrid();                        
                    } else {
                        if (this.elementToAdd.isIntern) {
                            scorePanel.addMatch2(this.elementToAdd.name, 1);
                            this.elementToAdd.kill();
                            this.setElementPosition(this.elementToAdd, -1, -1);                            
                        }
                    }
                    if (!this.elementToAdd.isIntern) {
                        this.tweenElemPos(this.elementToAdd, this.elementToAdd.startX, this.elementToAdd.startY,
                                Phaser.Math.distance(this.elementToAdd.startX, this.elementToAdd.startY, this.elementToAdd.x, this.elementToAdd.y) / canvasWidth);
                    } else {
                        this.elementToAdd = null;
                    }
                }
            }
        }
    },
    receiveElement: function(element) {
        this.elementToAdd = element;
        this.elementToAdd.startX = element.x;
        this.elementToAdd.startY = element.y;
        this.elementToAdd.isIntern = false;
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
        if (curX < alchemyPanel.columns && curY < alchemyPanel.rows) {
            if (alchemyPanel.elementToAdd !== null && alchemyPanel.getElement(curX, curY) === null) {
                
                if (alchemyPanel.elementToAdd.isIntern || scorePanel.decreaseElement(alchemyPanel.elementToAdd.index)) {
                    var elem = alchemyPanel.alcElements.create(curX * ELEM_SIZE + alchemyPanel.gridX,
                            curY * ELEM_SIZE + alchemyPanel.gridY, alchemyPanel.elementToAdd.key);

                    elem.width = ELEM_SIZE;
                    elem.height = ELEM_SIZE;
                    elem.name = elem.key;
                    elem.index = alchemyPanel.elementToAdd.index;
                    elem.inputEnabled = true;
                    elem.input.enableDrag(false, true);
                    elem.events.onInputDown.add(alchemyPanel.selectInternalElement);
                    alchemyPanel.setElementPosition(elem, curX, curY);
                    if (alchemyPanel.elementToAdd.isIntern) {
                        alchemyPanel.elementToAdd.kill();
                        alchemyPanel.setElementPosition(alchemyPanel.elementToAdd, -1, -1);
                    }
                } else {
                    //alchemyPanel.elementToAdd = null;
                }
            } else { 
                if (alchemyPanel.elementToAdd.isIntern) {
                    alchemyPanel.tweenElemPos(alchemyPanel.elementToAdd, alchemyPanel.elementToAdd.startX, alchemyPanel.elementToAdd.startY,
                                Phaser.Math.distance(alchemyPanel.elementToAdd.startX, alchemyPanel.elementToAdd.startY, alchemyPanel.elementToAdd.x, alchemyPanel.elementToAdd.y) / alchemyPanel.gridWidth);
                }
            }
        }
    },
    selectInternalElement: function(element) {
        alchemyPanel.elementToAdd = element;
        alchemyPanel.elementToAdd.startX = element.x;
        alchemyPanel.elementToAdd.startY = element.y;        
        alchemyPanel.elementToAdd.isIntern = true;
    },
    createCrystal: function() {
        var grille = [];
        for(var i = 0; i < alchemyPanel.columns; i++){
           var toAdd = "";
           for(var j = 0; j < alchemyPanel.rows; j++){
               var elem = alchemyPanel.getElement(j,i);
               if(elem === null){
                   toAdd += 'X-';
               }
               else{
                   toAdd += elem.key;
               }
           }
           grille.push(toAdd);
        }
        var guest = "no match";
        for(var i=0; i < crystals.length; i+=4){
            var match = true;
            for(var j=0; j < 3; j++){
                if(grille[j].trim() !== crystals[i+j+1].trim()){
                    match = false;
                }
            }
            if(match){
                guest = crystals[i];
                break;
            }
        }
        if (guest !== "no match") {
            scorePanel.score_general += 200;
            scorePanel.addMatch2(guest.trim(), 1);
        }
        console.log(guest);
        console.log(crystals);
        console.log(grille);
        alchemyPanel.killElemRange(0, 0, 3, 3);
        alchemyPanel.removeKilledElems();
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
    },
    tweenElemPos: function(elem, newPosX, newPosY, durationMultiplier) {
        if (durationMultiplier === null) {
            durationMultiplier = 1;
        }
        return game.add.tween(elem).to(
                {x: newPosX, y: newPosY}, 100 * durationMultiplier, Phaser.Easing.Linear.None, true);
    }
};

