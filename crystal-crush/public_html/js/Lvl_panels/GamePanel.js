var LOST_MENU_WIDTH = 1500;
var LOST_MENU_HEIGHT = 751;

GamePanel = function(game, x, y, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.background;
    this.internalX = this.x + margin;
    this.internalY = this.y + margin;
    this.internalWidth = this.width - 2 * margin;
    this.internalHeight = this.height - 2 * margin;
    this.selectedPower;
    this.beginningGame = true;
    this.rightMove = false;
    this.sequence = 0;
    //this.fx;

};

GamePanel.prototype = {
    preload: function() {
        //this.game.load.audio('coinFx', ['assets/audio/coin.ogg','assets/audio/smw_coin.wav'] );
    },
    create: function() {
        //this.fx = this.game.add.audio('coinFx');

        //this.fx.addMarker('dogui', 0.0, 1.0);

        this.background = game.add.sprite(this.x, this.y, 'gamePanel');
        this.background.width = this.width;
        this.background.height = this.height;
        selectedElementStartPos = {x: 0, y: 0};
        this.selectedPower = null;
        fillBoard();
        allowInput = true;
    },
    update: function() {

        if (game.input.activePointer.justReleased() && allowInput) {
            if (this.selectedPower !== null && typeof this.selectedPower !== 'undefined') {
                if (this.selectedPower.x !== this.selectedPower.startX || this.selectedPower.y !== this.selectedPower.startY) {
                    if (this.selectedPower.x + (this.selectedPower.width / 2) >= this.internalX && this.selectedPower.x + (this.selectedPower.width / 2) <= this.internalX + this.internalWidth
                            && this.selectedPower.y + this.selectedPower.height / 2 >= this.internalY && this.selectedPower.y + this.selectedPower.height / 2 <= this.internalY + this.internalHeight) {
                        var elem = getElement(getRelativeElementPos(this.selectedPower.x, true), getRelativeElementPos(this.selectedPower.y, false));
                        this.runPower(elem);
                    }
                    alchemyPanel.tweenElemPos(this.selectedPower, this.selectedPower.startX, this.selectedPower.startY,
                            Phaser.Math.distance(this.selectedPower.startX, this.selectedPower.startY, this.selectedPower.x, this.selectedPower.y) / canvasWidth);
                    this.selectedPower = null;
                }
            }
        }

        if (game.input.activePointer.isDown && allowInput) {
            if (selectedElement !== null && typeof selectedElement !== 'undefined') {

                var cursorGemPosX = getRelativeElementPos(game.input.activePointer.x, true);
                var cursorGemPosY = getRelativeElementPos(game.input.activePointer.y, false);

                if (canMove(selectedElementStartPos.x, selectedElementStartPos.y, cursorGemPosX, cursorGemPosY)) {
                    if (cursorGemPosX !== selectedElement.posX || cursorGemPosY !== selectedElement.posY) {
                        tempShiftedElem = getElement(cursorGemPosX, cursorGemPosY);

                        allowInput = false;

                        //Swap animation
                        swapElements(selectedElement, tempShiftedElem);
                        //Check game logic
                        game.time.events.add(300, checkGame);
                    }
                }
            }
        }
    },
    //we receive the power element from the score panel
    receivePower: function(element) {
        if (selection !== null && typeof selection !== 'undefined') {
            selection.kill();
            //selection = null;
        }
        this.selectedPower = element;
        this.selectedPower.startX = element.x;
        this.selectedPower.startY = element.y;
    },
    runPower: function(element) {
        if (this.selectedPower.name === SALT || this.selectedPower.name === CORUNDUM) {
            PowerA(element);
        }
        else if (this.selectedPower.name === ICE || this.selectedPower.name === RUBY) {
            PowerB(element);
        }
        else if (this.selectedPower.name === SUGAR || this.selectedPower.name === SAPPHIRE || this.selectedPower.name === QUARTZ) {
            PowerC(element);
        }

    },
    checkWinLose: function() {
        if (scorePanel.score_general >= this.game.targetScore) {
            this.game.state.start("win");
        } else if (this.game.numMoves === 0) {
            this.game.state.start("lost");
        }
    }
};

//Power A
function PowerA(element) {
    allowInput = false;
    var rowElem = element.posY;
    for (var i = 0; i < BOARD_COLS; i++) {
        var elem = getElement(i, rowElem);
        elem.kill();
    }
    removeKilledElems();
    scorePanel.score_general += BOARD_COLS * MATCH_MIN;
    game.time.events.add(300, dropAndRefill);
    var idx = panelElements.indexOf(gamePanel.selectedPower.name);
    scorePanel.decreaseElement(idx);
}

//Power B
function PowerB(element) {
    allowInput = false;
    var colElem = element.posX;
    for (var i = 0; i < BOARD_ROWS; i++) {
        var elem = getElement(colElem, i);
        elem.kill();
    }
    removeKilledElems();
    scorePanel.score_general += BOARD_ROWS * MATCH_MIN;
    game.time.events.add(300, dropAndRefill);
    var idx = panelElements.indexOf(gamePanel.selectedPower.name);
    scorePanel.decreaseElement(idx);
}

//Power C
function PowerC(element) {
    allowInput = false;
    var rowElem = element.posY;
    for (var i = 0; i < BOARD_COLS; i++) {
        var elem = getElement(i, rowElem);
        elem.kill();
    }
    var colElem = element.posX;
    for (var i = 0; i < BOARD_ROWS; i++) {
        var elem = getElement(colElem, i);
        elem.kill();
    }
    removeKilledElems();
    scorePanel.score_general += (BOARD_COLS * MATCH_MIN) + (BOARD_ROWS * MATCH_MIN);
    game.time.events.add(300, dropAndRefill);
    var idx = panelElements.indexOf(gamePanel.selectedPower.name);
    console.log(idx);
    scorePanel.decreaseElement(idx);
}

// find a elem on the board according to its position on the board
function getElement(posX, posY) {
    return elements.iterate("id", calcElementId(posX, posY), Phaser.Group.RETURN_CHILD);
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

function fillBoard() {
    elements = game.add.group();
    var boardRowsAndColumns = (gamePanel.internalWidth) / BOARD_ROWS;
    for (var i = 0; i < BOARD_COLS; i++) {
        for (var j = 0; j < BOARD_ROWS; j++) {
            var rndIndex = game.rnd.integerInRange(0, elemNames.length - 1);
            var element = elements.create(i * ELEM_SIZE + gamePanel.internalX,
                    j * ELEM_SIZE + gamePanel.internalY, elemNames[rndIndex]);
            element.name = elemNames[rndIndex];
            element.width = boardRowsAndColumns;
            element.height = boardRowsAndColumns;
            element.inputEnabled = true;

            element.events.onInputDown.add(selectElement);
            setElementPosition(element, i, j);
        }
    }
    boardRefilled();
//    selectedElement = getElement(0, 0);
}

// select an element and remember its starting position
function selectElement(element) {
    if (allowInput) {
        if (gamePanel.selectedPower !== null) {
            if (this.selectedPower.name === SALT || this.selectedPower.name === CORUNDUM) {
                PowerA(element);
            }
            else if (this.selectedPower.name === ICE || this.selectedPower.name === RUBY) {
                PowerB(element);
            }
            else if (this.selectedPower.name === SUGAR || this.selectedPower.name === SAPPHIRE || this.selectedPower.name === QUARTZ) {
                PowerC(element);
            }

            gamePanel.selectedPower = null;
        }
        else {
            if (selectedElement !== null && typeof selectedElement !== 'undefined') {
                if (canMove(selectedElementStartPos.x, selectedElementStartPos.y, element.posX, element.posY)) {
                    if (element.posX !== selectedElement.posX || element.posY !== selectedElement.posY) {
                        tempShiftedElem = element;
                        allowInput = false;
                        //Swap animation
                        swapElements(selectedElement, tempShiftedElem);
                        //Check game logic
                        game.time.events.add(300, checkGame);
                    }
                } else {
                    if (selection !== null && typeof selection !== 'undefined') {
                        selection.kill();
                    }
                    selectedElement = element;
                    selectedElementStartPos.x = element.posX;
                    selectedElementStartPos.y = element.posY;
                    selection = game.add.sprite(selectedElement.posX * ELEM_SIZE + gamePanel.internalX, selectedElement.posY * ELEM_SIZE + gamePanel.internalY, SELECT);
                    selection.width = selectedElement.width;
                    selection.height = selectedElement.height;
                }
            } else {
                if (selection !== null && typeof selection !== 'undefined') {
                    selection.kill();
                }
                selectedElement = element;
                selectedElementStartPos.x = element.posX;
                selectedElementStartPos.y = element.posY;
                selection = game.add.sprite(selectedElement.posX * ELEM_SIZE + gamePanel.internalX, selectedElement.posY * ELEM_SIZE + gamePanel.internalY, SELECT);
                selection.width = selectedElement.width;
                selection.height = selectedElement.height;
            }
        }
    }
}

// Elements can only be moved 1 square up/down or left/right
function canMove(fromPosX, fromPosY, toPosX, toPosY) {
    if (toPosX < 0 || toPosX >= BOARD_COLS || toPosY < 0 || toPosY >= BOARD_ROWS) {
        return false;
    }
    if (fromPosX === toPosX && fromPosY >= toPosY - 1 && fromPosY <= toPosY + 1) {
        return true;
    }
    if (fromPosY === toPosY && fromPosX >= toPosX - 1 && fromPosX <= toPosX + 1) {
        return true;
    }
    return false;
}

function swapElements(elem1, elem2) {
    selection.kill();
    tweenElemPos(elem1, elem2.posX, elem2.posY, 3);
    tweenElemPos(elem2, elem1.posX, elem1.posY, 3);
    swapElemPosition(elem1, elem2);
}

function checkGame() {
    checkAndKillElemMatches(tempShiftedElem);
    checkAndKillElemMatches(selectedElement);
    selectedElement = null;
    removeKilledElems();
    game.time.events.add(300, dropAndRefill);
}

// animated element movement
function tweenElemPos(elem, newPosX, newPosY, durationMultiplier) {
    if (durationMultiplier === null) {
        durationMultiplier = 1;
    }
    return game.add.tween(elem).to(
            {x: newPosX * ELEM_SIZE + gamePanel.internalX, y: newPosY * ELEM_SIZE + gamePanel.internalY}, 100 * durationMultiplier,
            Phaser.Easing.Linear.None, true);
}

// swap the position of 2 elements when the player drags the selected element into a new location
function swapElemPosition(elem1, elem2) {
    var tempPosX = elem1.posX;
    var tempPosY = elem1.posY;
    setElementPosition(elem1, elem2.posX, elem2.posY);
    setElementPosition(elem2, tempPosX, tempPosY);
}

function checkAndKillElemMatches(elem) {

    if (elem !== null) {
        var countUp = countSameElemElements(elem, 0, -1);
        var countDown = countSameElemElements(elem, 0, 1);
        var countLeft = countSameElemElements(elem, -1, 0);
        var countRight = countSameElemElements(elem, 1, 0);

        var countHoriz = countLeft + countRight + 1;
        var countVert = countUp + countDown + 1;

        if (countVert >= MATCH_MIN && countHoriz >= MATCH_MIN) {
            killElemRange(elem.posX, elem.posY - countUp, elem.posX, elem.posY + countDown);
            killElemRange(elem.posX - countLeft, elem.posY, elem.posX + countRight, elem.posY);
            matched = true;
            gamePanel.rightMove = true;
            stillGame = true;
            gamePanel.sequence++;
            scorePanel.addMatch(countHoriz, countVert, elem.key, gamePanel.sequence);
        } else if (countHoriz >= MATCH_MIN) {
            killElemRange(elem.posX - countLeft, elem.posY, elem.posX + countRight, elem.posY);
            matched = true;
            gamePanel.rightMove = true;
            stillGame = true;
            gamePanel.sequence++;
            scorePanel.addMatch(countHoriz, countVert, elem.key, gamePanel.sequence);
        } else if (countVert >= MATCH_MIN) {
            killElemRange(elem.posX, elem.posY - countUp, elem.posX, elem.posY + countDown);
            matched = true;
            gamePanel.rightMove = true;
            stillGame = true;
            gamePanel.sequence++;
            scorePanel.addMatch(countHoriz, countVert, elem.key, gamePanel.sequence);
        }
        else {
            if (elem.posX !== selectedElementStartPos.x || elem.posY !== selectedElementStartPos.y) {
                if (!matched && tempShiftedElem !== null) {
                    game.time.events.add(300, swapNoMatch, this, elem);
                    gamePanel.rightMove = false;
                }
            }
            matched = false;
        }
    }
}

function swapNoMatch(elem) {
    if (selectedElemTween !== null) {
        game.tweens.remove(selectedElemTween);
    }
    selectedElemTween = tweenElemPos(elem, selectedElementStartPos.x, selectedElementStartPos.y, 3);
    if (tempShiftedElem !== null) {
        tweenElemPos(tempShiftedElem, elem.posX, elem.posY, 3);
        swapElemPosition(elem, tempShiftedElem);
    }
}

// count how many elements of the same color lie in a given direction
// eg if moveX=1 and moveY=0, it will count how many elements of the same color lie to the right of the element
// stops counting as soon as a element of a different color or the board end is encountered
function countSameElemElements(elem, moveX, moveY) {
    var curX = elem.posX + moveX;
    var curY = elem.posY + moveY;
    var count = 0;
    while (curX >= 0 && curY >= 0 && curX < BOARD_COLS && curY < BOARD_ROWS
            && getElement(curX, curY) !== null &&
            getElement(curX, curY).key === elem.key) {
        count++;
        curX += moveX;
        curY += moveY;
    }

    return count;
}

// kill all elements from a starting position to an end position
function killElemRange(fromX, fromY, toX, toY) {
    //gamePanel.fx.play('dogui');
    fromX = Phaser.Math.clamp(fromX, 0, BOARD_COLS - 1);
    fromY = Phaser.Math.clamp(fromY, 0, BOARD_ROWS - 1);
    toX = Phaser.Math.clamp(toX, 0, BOARD_COLS - 1);
    toY = Phaser.Math.clamp(toY, 0, BOARD_ROWS - 1);
    for (var i = fromX; i <= toX; i++) {
        for (var j = fromY; j <= toY; j++) {
            var elem = getElement(i, j);
            elem.kill();
        }
    }
}

// move elements that have been killed off the board
function removeKilledElems() {
    elements.forEach(function(element) {
        if (!element.alive) {
            setElementPosition(element, -1, -1);
        }
    });
}

function dropAndRefill() {
    var dropElementDuration = dropElements();
    game.time.events.add(dropElementDuration * 10 + 100, refillBoard);
}

// look for elements with empty space beneath them and move them down
function dropElements() {
    var dropRowCountMax = 0;
    for (var i = 0; i < BOARD_COLS; i++) {
        var dropRowCount = 0;
        for (var j = BOARD_ROWS - 1; j >= 0; j--) {
            var elem = getElement(i, j);
            if (elem === null) {
                dropRowCount++;
            } else if (dropRowCount > 0) {
                setElementPosition(elem, elem.posX, elem.posY + dropRowCount);
                tweenElemPos(elem, elem.posX, elem.posY, dropRowCount);
            }
        }
        dropRowCountMax = Math.max(dropRowCount, dropRowCountMax);
    }
    return dropRowCountMax;
}

// look for any empty spots on the board and spawn new gems in their place that fall down from above
function refillBoard() {
    var maxElementsMissingFromCol = 0;
    var boardRowsAndColumns = (gamePanel.internalWidth) / BOARD_ROWS;
    for (var i = 0; i < BOARD_COLS; i++) {
        var elementsMissingFromCol = 0;
        for (var j = BOARD_ROWS - 1; j >= 0; j--) {
            var elem = getElement(i, j);
            if (elem === null) {
                elementsMissingFromCol++;
                var rndIndex = game.rnd.integerInRange(0, elemNames.length - 1);
                var elem = elements.create(i * ELEM_SIZE + gamePanel.internalX,
                        -elementsMissingFromCol * ELEM_SIZE, elemNames[rndIndex]);
                elem.name = elemNames[rndIndex];
                elem.width = boardRowsAndColumns;
                elem.height = boardRowsAndColumns;
                elem.inputEnabled = true;
                elem.events.onInputDown.add(selectElement);
                setElementPosition(elem, i, j);
                tweenElemPos(elem, elem.posX, elem.posY, elementsMissingFromCol * 2);
            }
        }
        maxElementsMissingFromCol = Math.max(maxElementsMissingFromCol, elementsMissingFromCol);
    }
    game.time.events.add(maxElementsMissingFromCol * 2 * 100, boardRefilled);
}

// when the board has finished refilling, re-enable player input
function boardRefilled() {
    tempShiftedElem = null;
    stillGame = false;
    for (var j = 0; j < BOARD_ROWS; j++) {
        for (var i = 0; i < BOARD_COLS; i++) {
            var elem = getElement(i, j);
            checkAndKillElemMatches(elem);
        }
    }
    removeKilledElems();
    if (stillGame) {
        game.time.events.add(300, dropAndRefill);
    }
    else {
        allowInput = true;
        gamePanel.sequence = 0;
        if (gamePanel.beginningGame) {
            scorePanel.score_general = 0;
            gamePanel.beginningGame = false;
        } else if (gamePanel.rightMove) {
            --(this.game.numMoves);
            gamePanel.rightMove = false;
        }
        gamePanel.checkWinLose();                
    }    
}
