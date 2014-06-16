var BUTTONWIDTH = 408;
var BUTTONHEIGHT = 80;
var buttonGame;

ScorePanel = function(game, x, y, width, height) {

    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.background;
    this.separator;

    this.score_general = 0;
    this.countElems = [];

    this.score_txt;
    this.highScore_txt;
    this.moves_txt;
    this.txt_group = [];
    this.img_group;

    this.inAlchemyPanel = false;
    this.camera;
    this.highScore = 0;
};

ScorePanel.prototype = {
    create: function() {

        panelElements = elemNames.concat(powerNames);
        //Camera
        this.camera = game.add.sprite(canvasWidth / 2, canvasHeight / 2, 'camera');
        game.camera.follow(this.camera);
        // Background
        this.background = game.add.sprite(this.x, this.y, 'scorePanelBackground');
        this.background.width = this.width;
        this.background.height = this.height;

        var elemsPanelX;
        var elemsPanelY;
        var elemsPanelW;
        var elemsPanelH;

        // Text : Score, HighScore, MovesLeft
        this.score_txt = game.add.text(this.x + this.width * 0.15,
                this.y + margin, '' + this.score_general, style1);
        this.highScore_txt = game.add.text(this.x + this.width * 0.15,
                this.y + this.score_txt.height + margin, '' + this.highScore, style1);
        this.moves_txt = game.add.text(this.x + this.width * 0.15,
                this.highScore_txt.y + this.highScore_txt.height + margin, '' + this.game.numMoves, style1);

        elemsPanelX = scorePanel.x + margin;
        elemsPanelY = this.moves_txt.y + this.moves_txt.height + margin;


        // Create Button
        // 408 x 80
        var buttonWidth = scorePanel.width - 2 * margin;
        var buttonHeight = buttonWidth * BUTTONHEIGHT / BUTTONWIDTH;
        var buttonX = scorePanel.x + margin;
        var buttonY = scorePanel.y + scorePanel.height - margin - buttonHeight;
        if (0.15 * scorePanel.height < buttonHeight) {
            buttonHeight = 0.15 * scorePanel.height;
            buttonWidth = buttonHeight * BUTTONWIDTH / BUTTONHEIGHT;
            buttonX = scorePanel.x + (scorePanel.width - buttonWidth) / 2;
            buttonY = scorePanel.y + scorePanel.height - buttonHeight - margin;
        }

        buttonGame = game.add.button(buttonX, buttonY, 'createElement', this.actionOnClick, this, 2, 1, 0);
        buttonGame.height = buttonHeight;
        buttonGame.width = buttonWidth;

        elemsPanelW = scorePanel.width - 2 * margin;
        elemsPanelH = buttonY - elemsPanelY - margin;


        //Elems_img
        var elemsX = [];
        var elemsY = [];
        this.img_group = game.add.group();

        var img_size;
        var separatorX;
        var separatorY;
        var separatorW;
        var separatorH;

        var nb_pow = powerNames.length;

        if (elemsPanelW < elemsPanelH) {
            if (elemsPanelH / 5.5 < elemsPanelW / 2.66) {
                img_size = elemsPanelH / 5.5;
            } else {
                img_size = elemsPanelW / 2.66;
            }

            for (var i = 0; i < 5; i++) {
                elemsX[2 * i] = elemsPanelX + (elemsPanelW / 2 - img_size * 1.33) / 2;
            }
            for (var i = 0; i < 5; i++) {
                elemsX[2 * i + 1] = elemsPanelX + elemsPanelW / 2 + (elemsPanelW / 2 - img_size * 1.33) / 2;
            }

            for (var i = 0; i < 3; i++) {
                elemsY[2 * i] = elemsPanelY + i * img_size;
                elemsY[2 * i + 1] = elemsY[2 * i];
            }

            var separatorX = elemsPanelX;
            var separatorY = elemsPanelY + 3 * img_size;
            var separatorW = elemsPanelW;
            var separatorH = img_size * 0.5;

            for (var i = 3; i < 5; i++) {
                elemsY[2 * i] = elemsPanelY + (i + 0.5) * img_size;
                elemsY[2 * i + 1] = elemsY[2 * i];
            }
            if (nb_pow === 3) {
                elemsX[8] = elemsPanelX + (elemsPanelW - img_size * 1.33) / 2;
            }

        } else {
            if (elemsPanelH / 3.5 < elemsPanelW / (nb_pow * 1.33)) {
                img_size = (elemsPanelH / 3.5);
            } else {
                img_size = (elemsPanelW / (nb_pow * 1.33));
            }
            elemsX[0] = elemsPanelX + (elemsPanelW / 3 - img_size * 4 / 3) / 2;
            elemsY[0] = elemsPanelY;

            elemsX[1] = elemsX[0];
            elemsY[1] = elemsPanelY + img_size;

            elemsX[2] = elemsPanelX + elemsPanelW / 3 + (elemsPanelW / 3 - img_size * 4 / 3) / 2;
            elemsY[2] = elemsPanelY;

            elemsX[3] = elemsX[2];
            elemsY[3] = elemsY[1];

            elemsX[4] = elemsPanelX + elemsPanelW * 2 / 3 + (elemsPanelW / 3 - img_size * 4 / 3) / 2;
            elemsY[4] = elemsPanelY;

            elemsX[5] = elemsX[4];
            elemsY[5] = elemsY[1];

            elemsX[6] = elemsPanelX + (elemsPanelW / nb_pow - img_size * 4 / 3) / 2;
            elemsY[6] = elemsY[1] + img_size * 1.5;

            elemsX[7] = elemsPanelX + elemsPanelW / nb_pow + (elemsPanelW / nb_pow - img_size * 4 / 3) / 2;
            elemsY[7] = elemsY[6];

            elemsX[8] = elemsPanelX + elemsPanelW * 2 / nb_pow + (elemsPanelW / nb_pow - img_size * 4 / 3) / 2;
            elemsY[8] = elemsY[6];

            elemsX[9] = elemsPanelX + elemsPanelW * 3 / nb_pow + (elemsPanelW / nb_pow - img_size * 4 / 3) / 2;
            elemsY[9] = elemsY[6];

            var separatorH = img_size * 0.25;
            var separatorW = elemsPanelW;
            var separatorX = elemsPanelX;
            var separatorY = elemsPanelY + 2 * img_size + separatorH / 2;

        }


        for (var i = 0; i < panelElements.length; i++) {
            var elem = this.img_group.create(elemsX[i], elemsY[i], panelElements[i]);
            elem.width = img_size;
            elem.height = img_size;
            elem.name = panelElements[i];
            elem.index = i;
            elem.inputEnabled = true;
            if (i < elemNames.length) {
                elem.events.onInputDown.add(this.sendElementToAlchemy);
            } else {
                elem.events.onInputDown.add(this.sendPowerToGame);
            }
            elem.inputEnabled = true;
        }

        //Elems_count
        for (var i = 0; i < panelElements.length; i++) {
            this.countElems[i] = 30;
            var txt = this.game.add.text(elemsX[i] + img_size, elemsY[i] + img_size / 4, '' + this.countElems[i], style1);
            var tmp = txt.height;
            txt.height = img_size / 2;
            txt.width = txt.width / tmp * txt.height;
            if (txt.width > img_size * 0.33) {
                var tmp = txt.width;
                txt.width = img_size * 0.33;
                txt.height = txt.height / tmp * txt.width;
            }
            this.txt_group[i] = txt;
            this.countElems[i + 1] = 10;
        }

        // Separator
        this.separator = game.add.sprite(separatorX, separatorY, 'bar');
        this.separator.width = separatorW;
        this.separator.height = separatorH;

    },
    update: function() {
        this.highScore = (!gamePanel.beginningGame && scorePanel.score_general > scorePanel.highScore) ?
                scorePanel.score_general : scorePanel.highScore;
        this.score_txt.text = CrystalCrush.language.scoreText + " : " +
                (gamePanel.beginningGame ? gamePanel.currentScore : this.score_general);
        this.highScore_txt.text = CrystalCrush.language.highScoreText + " : " + this.highScore;
        this.moves_txt.text = CrystalCrush.language.movesLeftText + " : " + this.game.numMoves;
        for (var i = 0; i < panelElements.length; i++) {
            this.txt_group[i].text = this.countElems[i];
        }
        this.setButtonFrame();
    },
    addMatch2: function(elem_name, count) {
        var idx = panelElements.indexOf(elem_name);
        this.countElems[idx] += (gamePanel.beginningGame ? 0 : count);
        if (!gamePanel.beginningGame) {
            gamePanel.fadeElement(scorePanel.getElement(idx));
        }
    },
    addMatch: function(countHoriz, countVert, elem_name, seq) {
        var points = 0;
        if (countHoriz < MATCH_MIN) {
            if (countVert === MATCH_MIN) {
                points = (MATCH_MIN * seq);
            } else if (countVert === MATCH_MIN + 1) {
                points = (MATCH_MIN * 2 * seq);
            } else if (countVert > MATCH_MIN + 1) {
                points = ((MATCH_MIN * 3 + 1) * seq);
            }
        } else if (countVert < MATCH_MIN) {
            if (countHoriz === MATCH_MIN) {
                points = (MATCH_MIN * seq);
            } else if (countHoriz === MATCH_MIN + 1) {
                points = (MATCH_MIN * 2 * seq);
            } else if (countHoriz > MATCH_MIN + 1) {
                points = ((MATCH_MIN * 3 + 1) * seq);
            }
        } else {
            points = ((MATCH_MIN * 3 + 1) * seq);
        }
        if (audioActivated) {
            gamePanel.matchSound.play();
        }
        this.score_general += points;
        this.addMatch2(elem_name, 1);
    },
    sendElementToAlchemy: function(element) {
        alchemyPanel.receiveElement(element);
    },
    sendPowerToGame: function(element) {
        if (scorePanel.countElems[element.index] > 0) {
            gamePanel.receivePower(element);
        }
    },
    decreaseElement: function(elem_id) {
        if (this.countElems[elem_id] > 0) {
            this.countElems[elem_id]--;
            if (this.countElems[elem_id] === 0) {
                this.getElement(elem_id).input.disableDrag();
            }
            return true;
        } else {
            return false;
        }
    },
    getElement: function(index) {
        return scorePanel.img_group.iterate("index", index, Phaser.Group.RETURN_CHILD);
    },
    actionOnClick: function() {
        alchemyPanel.elementToAdd = null;
        if (!this.inAlchemyPanel) {
            alchemyPanel.tweenElemPos(this.camera, -canvasWidth / 2 + scorePanel.width + 2 * margin, canvasHeight / 2);
            for (var i = 0; i < panelElements.length; i++) {
                if (i < elemNames.length) {
                    if (scorePanel.countElems[i] > 0) {
                        scorePanel.getElement(i).input.enableDrag(false, true);
                    }
                } else {
                    scorePanel.getElement(i).input.disableDrag();
                }
            }
            this.inAlchemyPanel = true;
        } else {
            alchemyPanel.tweenElemPos(this.camera, canvasWidth / 2, canvasHeight / 2);
            for (var i = 0; i < panelElements.length; i++) {
                if (i < elemNames.length) {
                    scorePanel.getElement(i).input.disableDrag();
                } else {
                    if (scorePanel.countElems[i] > 0) {
                        scorePanel.getElement(i).input.enableDrag(false, true);
                    }
                }
            }
            this.inAlchemyPanel = false;
            gamePanel.selectedPower = null;
        }
    },
    setButtonFrame: function() {
        if (this.inAlchemyPanel) {
            buttonGame.setFrames(0, 0, 0, 0);
        } else {
            buttonGame.setFrames(2, 1, 1, 1);
        }
    }
};
