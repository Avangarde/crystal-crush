var LOST_MENU_WIDTH = 1500;
var LOST_MENU_HEIGHT = 751;
var TIME_HELP = 10000;
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
    this.ambientMusic;
    this.matchSound;
    this.timer;
    this.arrayHint = [];
    this.kill = true;
    this.findHint = false;
    this.swappedElement;
    this.playsLeft = false;
    this.currentScore = 0;
    this.isPower = false;
    this.matchAnimation;
};

GamePanel.prototype = {
    preload: function() {        
    },
    create: function() {
        if (audioActivated) {
            this.ambientMusic = game.add.audio('ambientMusic', 0.5, true);
            this.ambientMusic.play();
            this.matchSound = game.add.audio('matchSound');
            this.elementCreatedSound = game.add.audio('elementCreatedSound');
            this.createMistakeSound = game.add.audio('createMistakeSound');
            this.winSound = game.add.audio('winSound');
            this.lostSound = game.add.audio('lostSound');
            this.powerASound = game.add.audio('powerASound');
            this.powerBSound = game.add.audio('powerBSound');
            this.powerCSound = game.add.audio('powerCSound');
            this.powerDSound = game.add.audio('powerDSound');
        }
        this.timer = this.game.time.create(this.game);
        this.timer.loop(TIME_HELP, helpTest, this.game, this, true);
        this.background = game.add.sprite(this.x, this.y, 'gamePanel');
        this.background.width = this.width;
        this.background.height = this.height;
        selectedElementStartPos = {x: 0, y: 0};
        this.selectedPower = null;
        this.swappedElement = null;
        this.fillBoard();
        allowInput = true;

    },
    update: function() {
        if (game.input.activePointer.justReleased()) {
            if (this.selectedPower !== null && typeof this.selectedPower !== 'undefined') {
                if (this.selectedPower.x !== this.selectedPower.startX || this.selectedPower.y !== this.selectedPower.startY) {
                    if (allowInput) {
                        if (this.selectedPower.x + (this.selectedPower.width / 2) >= this.internalX && this.selectedPower.x + (this.selectedPower.width / 2) <= this.internalX + this.internalWidth
                                && this.selectedPower.y + (this.selectedPower.height / 2) >= this.internalY && this.selectedPower.y + (this.selectedPower.height / 2) <= this.internalY + this.internalHeight) {
                            var elem = this.getElement(this.getRelativeElementPos(this.selectedPower.x + (this.selectedPower.width / 2), true), this.getRelativeElementPos(this.selectedPower.y + (this.selectedPower.height / 2), false));
                            this.runPower(elem);
                        }
                    }
                    alchemyPanel.tweenElemPos(this.selectedPower, this.selectedPower.startX, this.selectedPower.startY,
                            Phaser.Math.distance(this.selectedPower.startX, this.selectedPower.startY, this.selectedPower.x, this.selectedPower.y) / canvasWidth);
                    this.selectedPower = null;
                }
            }
        }

        if (game.input.activePointer.isDown && allowInput) {
            if (selectedElement !== null && typeof selectedElement !== 'undefined') {

                var cursorGemPosX = this.getRelativeElementPos(game.input.activePointer.x, true);
                var cursorGemPosY = this.getRelativeElementPos(game.input.activePointer.y, false);

                if (this.canMove(selectedElementStartPos.x, selectedElementStartPos.y, cursorGemPosX, cursorGemPosY)) {
                    if (cursorGemPosX !== selectedElement.posX || cursorGemPosY !== selectedElement.posY) {
                        tempShiftedElem = this.getElement(cursorGemPosX, cursorGemPosY);

                        allowInput = false;
                        //Swap animation
                        this.swapElements(selectedElement, tempShiftedElem);
                        //Check game logic
                        game.time.events.add(300, this.checkGame);
                    }
                }
            }
        }
    },
    fillBoard: function() {
        elements = game.add.group();
        for (var i = 0; i < BOARD_COLS; i++) {
            for (var j = 0; j < BOARD_ROWS; j++) {
                var rndIndex = game.rnd.integerInRange(0, elemNames.length - 1);
                var element = elements.create(i * ELEM_SIZE + this.internalX,
                        j * ELEM_SIZE + this.internalY, elemNames[rndIndex]);
                element.name = elemNames[rndIndex];
                element.width = ELEM_SIZE;
                element.height = ELEM_SIZE;
                element.inputEnabled = true;

                element.events.onInputDown.add(selectElement);
                this.setElementPosition(element, i, j);
            }
        }
        boardRefilled();
    },
    // find a elem on the board according to its position on the board
    getElement: function(posX, posY) {
        return elements.iterate("id", this.calcElementId(posX, posY), Phaser.Group.RETURN_CHILD);
    },
    // convert world coordinates to board position
    getRelativeElementPos: function(coordinate, axisX) {
        if (axisX) {
            return Phaser.Math.floor((coordinate - this.internalX) / ELEM_SIZE);
        } else {
            return Phaser.Math.floor((coordinate - this.internalY) / ELEM_SIZE);
        }
    },
    setElementPosition: function(elem, posX, posY) {
        elem.posX = posX;
        elem.posY = posY;
        elem.id = this.calcElementId(posX, posY);
    },
    calcElementId: function(posX, posY) {
        return posX + posY * BOARD_COLS;
    },
    // Elements can only be moved 1 square up/down or left/right
    canMove: function(fromPosX, fromPosY, toPosX, toPosY) {
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
    },
    swapElements: function(elem1, elem2) {
        selection.kill();
        this.tweenElemPos(elem1, elem2.posX, elem2.posY, 3);
        this.tweenElemPos(elem2, elem1.posX, elem1.posY, 3);
        this.swapElemPosition(elem1, elem2);
    },
    // animated element movement
    tweenElemPos: function(elem, newPosX, newPosY, durationMultiplier) {
        if (durationMultiplier === null) {
            durationMultiplier = 1;
        }
        return game.add.tween(elem).to(
                {x: newPosX * ELEM_SIZE + this.internalX, y: newPosY * ELEM_SIZE + this.internalY}, 100 * durationMultiplier,
                Phaser.Easing.Linear.None, true);
    },
    checkGame: function() {
        gamePanel.checkAndKillElemMatches(tempShiftedElem);
        gamePanel.checkAndKillElemMatches(selectedElement);
        selectedElement = null;
        removeKilledElems();
        game.time.events.add(300, dropAndRefill);
    },
    // swap the position of 2 elements when the player drags the selected element into a new location
    swapElemPosition: function(elem1, elem2) {
        var tempPosX = elem1.posX;
        var tempPosY = elem1.posY;
        gamePanel.setElementPosition(elem1, elem2.posX, elem2.posY);
        gamePanel.setElementPosition(elem2, tempPosX, tempPosY);
    },
    checkAndKillElemMatches: function(elem) {

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
                        game.time.events.add(300, gamePanel.swapNoMatch, this, elem);
                        gamePanel.rightMove = false;
                    }
                }
                matched = false;
            }
        }
    },
    swapNoMatch: function(elem) {
        if (selectedElemTween !== null) {
            game.tweens.remove(selectedElemTween);
        }
        selectedElemTween = gamePanel.tweenElemPos(elem, selectedElementStartPos.x, selectedElementStartPos.y, 3);
        if (tempShiftedElem !== null) {
            gamePanel.tweenElemPos(tempShiftedElem, elem.posX, elem.posY, 3);
            gamePanel.swapElemPosition(elem, tempShiftedElem);
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
        this.isPower = true;
        gamePanel.timer.stop();
        gamePanel.timer.loop(TIME_HELP, helpTest, this.game, this, true);
        gamePanel.timer.start();
        unselectHint();
        if (powerA.indexOf(this.selectedPower.name) !== -1) {
            if (audioActivated) {
                this.powerASound.play();
            }
            PowerA(element);
        }
        else if (powerB.indexOf(this.selectedPower.name) !== -1) {
            if (audioActivated) {
                this.powerBSound.play();
            }
            PowerB(element);
        }
        else if (powerC.indexOf(this.selectedPower.name) !== -1) {
            if (audioActivated) {
                this.powerCSound.play();
            }
            PowerC(element);
        }
        else if(powerD.indexOf(this.selectedPower.name) !== -1){
            if (audioActivated) {
                this.powerDSound.play();
            }
            PowerD(element);
        }

    },
    checkWinLose: function() {
        if (scorePanel.score_general >= this.game.targetScore) {
            if (audioActivated) {
                this.ambientMusic.stop();
                this.winSound.play();
            }
            console.log("here");
            this.game.state.start("win");
        } else if (this.game.numMoves === 0) {
            if (audioActivated) {
                this.ambientMusic.stop();
                this.lostSound.play();
            }
            console.log("here");
            this.game.state.start("lost");            
        }
    },
    fadeElement: function(element) {
        this.matchAnimation = game.add.sprite(element.x, element.y, SELECTHINT);
        this.matchAnimation.width = element.width;
        this.matchAnimation.height = element.height;
        game.add.tween(this.matchAnimation).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true);
        game.time.events.add(300, gamePanel.unFadeElement, this, this.matchAnimation);
    },
    unFadeElement: function(element) {
        game.add.tween(element).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);

    }
};


//Power A
function PowerA(element) {
    allowInput = false;
    var rowElem = element.posY;
    var img = {startX:0, startY:0, endX:0, height:0};
    for (var i = 0; i < BOARD_COLS; i++) {
        var elem = gamePanel.getElement(i, rowElem);
        if(i === 0) {
            img.startX = elem.x;
            img.startY = elem.y;
        }
        if (i === BOARD_COLS - 1) {
            img.endX = elem.x + elem.width;
            img.height = elem.height;
        }
        elem.kill();
    }
    var anim = game.add.sprite(img.startX, img.startY, 'powerExplosion');
    anim.width = img.endX - img.startX;
    anim.height = img.height;
    anim.animations.add('explote');
    anim.animations.play('explote', 15, false, true);
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
    var img = {startX:0, startY:0, endY:0, width:0};
    for (var i = 0; i < BOARD_ROWS; i++) {
        var elem = gamePanel.getElement(colElem, i);
        if(i === 0) {
            img.startX = elem.x;
            img.startY = elem.y;
        }
        if (i === BOARD_COLS - 1) {
            img.endY = elem.y + elem.height;
            img.width = elem.width;
        }
        elem.kill();
    }
    var anim = game.add.sprite(img.startX, img.startY, 'powerExplosion');
    anim.width = img.width;
    anim.height = img.endY - img.startY;
    anim.animations.add('explote');
    anim.animations.play('explote', 15, false, true);
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
    var img = {startX:0, startY:0, endX:0, endY:0, width:0, height:0};
    for (var i = 0; i < BOARD_COLS; i++) {
        var elem = gamePanel.getElement(i, rowElem);
        if(i === 0) {
            img.startX = elem.x;
            img.startY = elem.y;
        }
        if (i === BOARD_COLS - 1) {
            img.endX = elem.x + elem.width;
            img.height = elem.height;
        }
        elem.kill();
    }
    var anim = game.add.sprite(img.startX, img.startY, 'powerExplosion');
    anim.width = img.endX - img.startX;
    anim.height = img.height;
    anim.animations.add('explote');
    anim.animations.play('explote', 15, false, true);
    var colElem = element.posX;
    for (var i = 0; i < BOARD_ROWS; i++) {
        var elem = gamePanel.getElement(colElem, i);
        if(i === 0) {
            img.startX = elem.x;
            img.startY = elem.y;
        }
        if (i === BOARD_COLS - 1) {
            img.endY = elem.y + elem.height;
            img.width = elem.width;
        }
        elem.kill();
    }
    var anim2 = game.add.sprite(img.startX, img.startY, 'powerExplosion');
    anim2.width = img.width;
    anim2.height = img.endY - img.startY;
    anim2.animations.add('explote');
    anim2.animations.play('explote', 15, false, true);
    removeKilledElems();
    scorePanel.score_general += (BOARD_COLS * MATCH_MIN) + (BOARD_ROWS * MATCH_MIN);
    game.time.events.add(300, dropAndRefill);
    var idx = panelElements.indexOf(gamePanel.selectedPower.name);
    scorePanel.decreaseElement(idx);
}

//Power D
function PowerD(element) {
    allowInput = false;
    var rowElem = element.posY;
    var colElem = element.posX;
    var destroyed = 0;
    var elem;
    var img = {startX:0, startY:0};
    for (var i = 0; i < BOARD_COLS; i++) {
        for (var j = 0; j < BOARD_ROWS; j++) {
            if (Math.abs(i - colElem)<2 && Math.abs(j - rowElem)<2) {
                destroyed++;
                elem = gamePanel.getElement(i, j);
                if(destroyed === 1) {
                    img.startX = elem.x;
                    img.startY = elem.y;
                }
                elem.kill();
            }
        }
    }
    var anim = game.add.sprite(img.startX, img.startY, 'powerExplosion');
    anim.width = elem.x + elem.width - img.startX;
    anim.height = elem.y + elem.height - img.startY;
    anim.animations.add('explote');
    anim.animations.play('explote', 15, false, true);
    removeKilledElems();
    scorePanel.score_general += (destroyed * MATCH_MIN);
    game.time.events.add(300, dropAndRefill);
    var idx = panelElements.indexOf(gamePanel.selectedPower.name);    
    scorePanel.decreaseElement(idx);
}
function helpTest(hint) {
    gamePanel.findHint = false;
    //for each element in matrix we try with the adjacent elements
    for (var i = 0; i < BOARD_COLS; i++) {
        for (var j = 0; j < BOARD_ROWS; j++) {
            var currentElem = gamePanel.getElement(i, j);
            var elemSwap;
            //we try with the above element
            if (j - 1 > 0) {
                elemSwap = gamePanel.getElement(i, j - 1);
                gamePanel.swapElemPosition(currentElem, elemSwap);
                gamePanel.swappedElement = currentElem;
                checkElemMatches(elemSwap, hint);
                gamePanel.swapElemPosition(elemSwap, currentElem);
                if (gamePanel.findHint)
                    break;
            }
            //we try with the below element
            if (j + 1 < BOARD_ROWS) {
                elemSwap = gamePanel.getElement(i, j + 1);
                gamePanel.swapElemPosition(currentElem, elemSwap);
                gamePanel.swappedElement = currentElem;
                checkElemMatches(elemSwap, hint);
                gamePanel.swapElemPosition(elemSwap, currentElem);
                if (gamePanel.findHint)
                    break;
            }
            //we try with the left element
            if (i - 1 > 0) {
                elemSwap = gamePanel.getElement(i - 1, j);
                gamePanel.swapElemPosition(currentElem, elemSwap);
                gamePanel.swappedElement = currentElem;
                checkElemMatches(elemSwap, hint);
                gamePanel.swapElemPosition(elemSwap, currentElem);

            }
            //we try with the rigth element
            if (i + 1 < BOARD_COLS) {
                elemSwap = gamePanel.getElement(i + 1, j);
                gamePanel.swapElemPosition(currentElem, elemSwap);
                gamePanel.swappedElement = currentElem;
                checkElemMatches(elemSwap, hint);
                gamePanel.swapElemPosition(elemSwap, currentElem);
                if (gamePanel.findHint)
                    break;
            }
        }
    }
}

// select an element and remember its starting position
function selectElement(element) {
    if (allowInput) {
        if (gamePanel.selectedPower !== null) {
            gamePanel.isPower = true;
            gamePanel.timer.stop();
            gamePanel.timer.loop(TIME_HELP, helpTest, this.game, this, true);
            gamePanel.timer.start();
            unselectHint();
            gamePanel.runPower(element);
            gamePanel.selectedPower = null;
        }
        else {
            if (selectedElement !== null && typeof selectedElement !== 'undefined') {
                if (gamePanel.canMove(selectedElementStartPos.x, selectedElementStartPos.y, element.posX, element.posY)) {
                    if (element.posX !== selectedElement.posX || element.posY !== selectedElement.posY) {
                        tempShiftedElem = element;
                        allowInput = false;
                        //Swap animation
                        gamePanel.swapElements(selectedElement, tempShiftedElem);
                        //Check game logic
                        game.time.events.add(300, gamePanel.checkGame);
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

// count how many elements of the same color lie in a given direction
// eg if moveX=1 and moveY=0, it will count how many elements of the same color lie to the right of the element
// stops counting as soon as a element of a different color or the board end is encountered
function countSameElemElements(elem, moveX, moveY) {
    var curX = elem.posX + moveX;
    var curY = elem.posY + moveY;
    var count = 0;
    while (curX >= 0 && curY >= 0 && curX < BOARD_COLS && curY < BOARD_ROWS
            && gamePanel.getElement(curX, curY) !== null &&
            gamePanel.getElement(curX, curY).key === elem.key) {
        count++;
        curX += moveX;
        curY += moveY;
    }

    return count;
}

// kill all elements from a starting position to an end position
function killElemRange(fromX, fromY, toX, toY) {
    gamePanel.timer.stop();
    gamePanel.timer.loop(TIME_HELP, helpTest, this.game, this, true);
    gamePanel.timer.start();
    unselectHint();

    //gamePanel.fx.play('dogui');
    fromX = Phaser.Math.clamp(fromX, 0, BOARD_COLS - 1);
    fromY = Phaser.Math.clamp(fromY, 0, BOARD_ROWS - 1);
    toX = Phaser.Math.clamp(toX, 0, BOARD_COLS - 1);
    toY = Phaser.Math.clamp(toY, 0, BOARD_ROWS - 1);
    for (var i = fromX; i <= toX; i++) {
        for (var j = fromY; j <= toY; j++) {
            var elem = gamePanel.getElement(i, j);
            var anim = game.add.sprite(elem.x, elem.y, 'explosion');
            anim.width = elem.width;
            anim.height = elem.height;
            anim.animations.add('explote');
            anim.animations.play('explote', 15, false, true);
            elem.kill();
        }
    }
}
//just check element's matches (does not kill them)(hint=true, ligth up the elements)
function checkElemMatches(elem, hint) {
    if (elem !== null) {
        var countUp = countSameElemElements(elem, 0, -1);
        var countDown = countSameElemElements(elem, 0, 1);
        var countLeft = countSameElemElements(elem, -1, 0);
        var countRight = countSameElemElements(elem, 1, 0);
        var countHoriz = countLeft + countRight + 1;
        var countVert = countUp + countDown + 1;
        if (countHoriz >= MATCH_MIN) {
            if (hint) {
                if (!gamePanel.findHint) {
                    hintSelect = game.add.sprite(gamePanel.swappedElement.posX * ELEM_SIZE + gamePanel.internalX, gamePanel.swappedElement.posY * ELEM_SIZE + gamePanel.internalY, SELECTHINT);
                    hintSelect.width = elem.width;
                    hintSelect.height = elem.height;
                    gamePanel.arrayHint.push(hintSelect);
                    hintElemRange(elem.posX - countLeft, elem.posY, elem.posX + countRight, elem.posY, elem.posX, elem.posY);
                }
                gamePanel.findHint = true;
            }
            else {
                gamePanel.playsLeft = true;
            }
        } else if (countVert >= MATCH_MIN) {
            if (hint) {
                if (!gamePanel.findHint) {
                    hintSelect = game.add.sprite(gamePanel.swappedElement.posX * ELEM_SIZE + gamePanel.internalX, gamePanel.swappedElement.posY * ELEM_SIZE + gamePanel.internalY, SELECTHINT);
                    hintSelect.width = elem.width;
                    hintSelect.height = elem.height;
                    gamePanel.arrayHint.push(hintSelect);
                    hintElemRange(elem.posX, elem.posY - countUp, elem.posX, elem.posY + countDown, elem.posX, elem.posY);
                }
                gamePanel.findHint = true;
            }
            else {
                gamePanel.playsLeft = true;
            }
        }
    }
}
function unselectHint() {
    for (var i = 0; i < gamePanel.arrayHint.length; i++) {
        gamePanel.arrayHint[i].kill();
    }
}
// hint all elements from a starting position to an end position
function hintElemRange(fromX, fromY, toX, toY, elemX, elemY) {
    fromX = Phaser.Math.clamp(fromX, 0, BOARD_COLS - 1);
    fromY = Phaser.Math.clamp(fromY, 0, BOARD_ROWS - 1);
    toX = Phaser.Math.clamp(toX, 0, BOARD_COLS - 1);
    toY = Phaser.Math.clamp(toY, 0, BOARD_ROWS - 1);
    for (var i = fromX; i <= toX; i++) {
        for (var j = fromY; j <= toY; j++) {

            var elem = gamePanel.getElement(i, j);
            if ((elem.posX !== elemX || elem.posY !== elemY)) {
                hintSelect = game.add.sprite(elem.posX * ELEM_SIZE + gamePanel.internalX, elem.posY * ELEM_SIZE + gamePanel.internalY, SELECTHINT);
                hintSelect.width = elem.width;
                hintSelect.height = elem.height;
                gamePanel.arrayHint.push(hintSelect);
            }
        }
    }
    game.time.events.add(1000, unselectHint);

}
// move elements that have been killed off the board
function removeKilledElems() {
    elements.forEach(function(element) {
        if (!element.alive) {
            gamePanel.setElementPosition(element, -1, -1);
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
            var elem = gamePanel.getElement(i, j);
            if (elem === null) {
                dropRowCount++;
            } else if (dropRowCount > 0) {
                gamePanel.setElementPosition(elem, elem.posX, elem.posY + dropRowCount);
                gamePanel.tweenElemPos(elem, elem.posX, elem.posY, dropRowCount);
            }
        }
        dropRowCountMax = Math.max(dropRowCount, dropRowCountMax);
    }
    return dropRowCountMax;
}

// look for any empty spots on the board and spawn new gems in their place that fall down from above
function refillBoard() {
    var maxElementsMissingFromCol = 0;
    for (var i = 0; i < BOARD_COLS; i++) {
        var elementsMissingFromCol = 0;
        for (var j = BOARD_ROWS - 1; j >= 0; j--) {
            var elem = gamePanel.getElement(i, j);
            if (elem === null) {
                elementsMissingFromCol++;
                var rndIndex = game.rnd.integerInRange(0, elemNames.length - 1);
                var elem = elements.create(i * ELEM_SIZE + gamePanel.internalX,
                        -elementsMissingFromCol * ELEM_SIZE, elemNames[rndIndex]);
                elem.name = elemNames[rndIndex];
                elem.width = ELEM_SIZE;
                elem.height = ELEM_SIZE;
                elem.inputEnabled = true;
                elem.events.onInputDown.add(selectElement);
                gamePanel.setElementPosition(elem, i, j);
                gamePanel.tweenElemPos(elem, elem.posX, elem.posY, elementsMissingFromCol * 2);
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
    selectedElement = null;
    for (var j = 0; j < BOARD_ROWS; j++) {
        for (var i = 0; i < BOARD_COLS; i++) {
            var elem = gamePanel.getElement(i, j);
            gamePanel.checkAndKillElemMatches(elem);
        }
    }
    removeKilledElems();
    if (stillGame) {
        game.time.events.add(300, dropAndRefill);
    }
    else {
        gamePanel.timer.start();
        allowInput = true;
        gamePanel.sequence = 0;
        if (gamePanel.beginningGame) {
            scorePanel.score_general = gamePanel.currentScore;
            gamePanel.beginningGame = false;
        } else if (gamePanel.rightMove) {
            if (!gamePanel.isPower) {
                --(this.game.numMoves);
                gamePanel.rightMove = false;
            }
        }
        gamePanel.isPower = false;
        gamePanel.playsLeft = false;
        helpTest(false);
        if (!gamePanel.playsLeft) {
            gamePanel.currentScore = scorePanel.score_general;
            gamePanel.beginningGame = true;
            for (var i = 0; i < BOARD_COLS; i++) {
                for (var j = 0; j < BOARD_ROWS; j++) {
                    var elem = gamePanel.getElement(i, j);
                    elem.kill();
                }
            }
            removeKilledElems();
            gamePanel.fillBoard();
        }
        gamePanel.checkWinLose();
    }

}
