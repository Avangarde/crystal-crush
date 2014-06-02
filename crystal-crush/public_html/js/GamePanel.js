GamePanel = function(game) {

    this.game = game;
    this.xgamePanel;
    this.ygamePanel;
    this.background;
};

GamePanel.prototype = {
    preload: function() {
        this.game.load.image(CU, 'assets/sprites/Cu.png');
        this.game.load.image(ZN, 'assets/sprites/Zn.png');
        this.game.load.image(NA, 'assets/sprites/Na.png');
        this.game.load.image(CL, 'assets/sprites/Cl.png');
        this.game.load.image(A, 'assets/sprites/A.png');
        this.game.load.image(B, 'assets/sprites/B.png');
        this.game.load.image(SELECT, 'assets/sprites/selection.png');
        this.game.load.image('gamePanel', 'assets/gamePanel.png');
    },
    create: function() {
        this.background = game.add.sprite(canvasWidth / 2 + scorePanelWidth / 2 + margin, canvasHeight / 2, 'gamePanel');
        this.background.width = gamePanelWidth;
        this.background.height = gamePanelHeight;
        this.background.anchor.setTo(0.5, 0.5);
        fillBoard();
        selectedElementStartPos = {x: 0, y: 0};
        allowInput = true;
    },
    update: function() {
        if (game.input.mousePointer.isDown) {
            if (selectedElement !== null && typeof selectedElement !== 'undefined') {

                var cursorGemPosX = getRelativeElementPos(game.input.mousePointer.x, true);
                var cursorGemPosY = getRelativeElementPos(game.input.mousePointer.y, false);

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
    }
};



// find a elem on the board according to its position on the board
function getElement(posX, posY) {
    return elements.iterate("id", calcElementId(posX, posY), Phaser.Group.RETURN_CHILD);
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

function fillBoard() {
    elements = game.add.group();
    var boardRowsAndColumns = (gamePanelHeight - (2 * margin)) / BOARD_ROWS;
    xgamePanel = canvasWidth / 2 + scorePanelWidth / 2 + 2 * margin - gamePanelWidth / 2;
    ygamePanel = 2 * margin;
    for (var i = 0; i < BOARD_COLS; i++) {
        for (var j = 0; j < BOARD_ROWS; j++) {
            var rndIndex = game.rnd.integerInRange(0, elemNames.length - 1);
            var element = elements.create(i * ELEM_SIZE + xgamePanel,
                    j * ELEM_SIZE + ygamePanel, elemNames[rndIndex]);
            element.width = boardRowsAndColumns;
            element.height = boardRowsAndColumns;
            element.inputEnabled = true;
            element.events.onInputDown.add(selectElement);
            setElementPosition(element, i, j);
        }
    }
//    selectedElement = getElement(0, 0);
}

// select an element and remember its starting position
function selectElement(element) {
    if (allowInput) {
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
                    score_general++;
                }                
                selectedElement = element;
                selectedElementStartPos.x = element.posX;
                selectedElementStartPos.y = element.posY;
                selection = game.add.sprite(selectedElement.posX * ELEM_SIZE + xgamePanel, selectedElement.posY * ELEM_SIZE + ygamePanel, SELECT);
                selection.width = selectedElement.width;
                selection.height = selectedElement.height;
            }
        } else {
            if (selection !== null && typeof selection !== 'undefined') {
                selection.kill();
            score_general ++;
            }
            selectedElement = element;
            selectedElementStartPos.x = element.posX;
            selectedElementStartPos.y = element.posY;
            selection = game.add.sprite(selectedElement.posX * ELEM_SIZE + xgamePanel, selectedElement.posY * ELEM_SIZE + ygamePanel, SELECT);
            selection.width = selectedElement.width;
            selection.height = selectedElement.height;
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
    tweenElemPos(elem1, elem2.posX, elem2.posY, 3);
    tweenElemPos(elem2, elem1.posX, elem1.posY, 3);
    swapElemPosition(elem1, elem2); 
}

function checkGame() {
    checkAndKillElemMatches(tempShiftedElem);
    checkAndKillElemMatches(selectedElement);
    selectedElement = null;
    selection.kill();
            score_general ++;
    removeKilledElems();
    game.time.events.add(300, dropAndRefill);
}

// animated element movement
function tweenElemPos(elem, newPosX, newPosY, durationMultiplier) {
    if (durationMultiplier === null) {
        durationMultiplier = 1;
    }
    return game.add.tween(elem).to(
            {x: newPosX * ELEM_SIZE + xgamePanel, y: newPosY * ELEM_SIZE + ygamePanel}, 100 * durationMultiplier,
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
//        console.log("Elem = " + elem.key);
        var countUp = countSameElemElements(elem, 0, -1);
        var countDown = countSameElemElements(elem, 0, 1);
        var countLeft = countSameElemElements(elem, -1, 0);
        var countRight = countSameElemElements(elem, 1, 0);

        var countHoriz = countLeft + countRight + 1;
        var countVert = countUp + countDown + 1;

        if (countVert >= MATCH_MIN) {
            killElemRange(elem.posX, elem.posY - countUp, elem.posX, elem.posY + countDown);
            matched = true;
        }

        if (countHoriz >= MATCH_MIN) {
            killElemRange(elem.posX - countLeft, elem.posY, elem.posX + countRight, elem.posY);
            matched = true;
        }

        if (countVert < MATCH_MIN && countHoriz < MATCH_MIN) {
            if (elem.posX !== selectedElementStartPos.x || elem.posY !== selectedElementStartPos.y) {
                if (!matched) {
                    game.time.events.add(300, swapNoMatch, this, elem);
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
    }
    swapElemPosition(elem, tempShiftedElem);
}

// count how many elements of the same color lie in a given direction
// eg if moveX=1 and moveY=0, it will count how many elements of the same color lie to the right of the element
// stops counting as soon as a element of a different color or the board end is encountered
function countSameElemElements(elem, moveX, moveY) {
    var curX = elem.posX + moveX;
    var curY = elem.posY + moveY;
    var count = 0;
    while (curX >= 0 && curY >= 0 && curX < BOARD_COLS && curY < BOARD_ROWS
            && getElement(curX, curY).key === elem.key) {
        count++;
        curX += moveX;
        curY += moveY;
    }
    return count;
}

// kill all elements from a starting position to an end position
function killElemRange(fromX, fromY, toX, toY) {
    fromX = Phaser.Math.clamp(fromX, 0, BOARD_COLS - 1);
    fromY = Phaser.Math.clamp(fromY, 0, BOARD_ROWS - 1);
    toX = Phaser.Math.clamp(toX, 0, BOARD_COLS - 1);
    toY = Phaser.Math.clamp(toY, 0, BOARD_ROWS - 1);
    for (var i = fromX; i <= toX; i++) {
        for (var j = fromY; j <= toY; j++) {
            var elem = getElement(i, j);
            elem.kill();
            score_general ++;
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
    var boardRowsAndColumns = (gamePanelHeight - (2 * margin)) / BOARD_ROWS;
    for (var i = 0; i < BOARD_COLS; i++) {
        var elementsMissingFromCol = 0;
        for (var j = BOARD_ROWS - 1; j >= 0; j--) {
            var elem = getElement(i, j);
            if (elem === null) {
                elementsMissingFromCol++;
                var rndIndex = game.rnd.integerInRange(0, elemNames.length - 1);
                var elem = elements.create(i * ELEM_SIZE + xgamePanel,
                        -elementsMissingFromCol * ELEM_SIZE, elemNames[rndIndex]);
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
    allowInput = true;
    tempShiftedElem = null;
}
