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

    this.score_general = 0;
    this.countElems = [];

    this.score_txt;
    this.highScore_txt;
    this.moves_txt;
    this.txt_group = [];
    this.img_group;

    this.animationScreen = false;
    this.inAlchemyPanel = false;
    this.camera;
    this.highScore = 0;
};

ScorePanel.prototype = {
    preload: function() {
        game.load.image('scorePanelBackground', 'assets/scorePanel.png');
        game.load.spritesheet('createElement', 'assets/buttons/button_create_element.png', BUTTONWIDTH, BUTTONHEIGHT);
        game.load.image('camera', 'assets/camera.png');
    },
    create: function() {
        //Camera
        this.camera = game.add.sprite(canvasWidth / 2, canvasHeight / 2, 'camera');
        game.camera.follow(this.camera);
        // Background
        this.background = game.add.sprite(this.x, this.y, 'scorePanelBackground');
        this.background.width = this.width;
        this.background.height = this.height;

        var buttonWidth = scorePanel.width - 2 * margin;
        var buttonHeight = buttonWidth * BUTTONHEIGHT / BUTTONWIDTH;
        buttonGame = game.add.button(2 * margin, scorePanel.height - margin - buttonHeight, 'createElement', this.actionOnClick, this, 2, 1, 0);
        buttonGame.height = buttonHeight;
        buttonGame.width = buttonWidth;

        //Score
        this.score_txt = game.add.text(this.x + this.width * 0.15, this.y + margin, '' + this.score_general, style1);
        this.highScore_txt = game.add.text(this.x + this.width * 0.15, this.score_txt.height + margin, '' + this.highScore, style1);
        this.moves_txt = game.add.text(this.x + this.width * 0.15, 2 * this.highScore_txt.height + margin, '' + numMoves, style1);

        //Elems_img
        var img_size = this.width * 0.20;

        var X1 = this.x + this.width * 0.15;
        var X2 = this.x + this.width * 0.55;
        var inter_img = this.width * 0.2;
        var startY = this.highScore_txt.y + 2 * this.highScore_txt.height + margin;// + inter_img;

        this.img_group = game.add.group();


        for (var i = 0; i < elemNames.length; i++) {
            if (i % 2 === 0) {
                var elem = this.img_group.create(X1, startY + inter_img * (i / 2), elemNames[i]);
            } else {
                var elem = this.img_group.create(X2, startY + inter_img * ((i - 1) / 2), elemNames[i]);
            }
            elem.width = img_size;
            elem.height = img_size;
            elem.name = elemNames[i];
            elem.id = i;
            elem.inputEnabled = true;
            elem.events.onInputDown.add(this.sendElementToAlchemy);
            elem.inputEnabled = true;
            elem.input.enableDrag(false, true);
        }

        //Elems_count
        for (var i = 0; i < elemNames.length; i++) {
            this.countElems[i] = 0;
            if (i % 2 === 0) {
                var txt = this.game.add.text(X1 + img_size, startY + img_size / 2 + inter_img * (i / 2), '' + this.countElems[i], style1);
            } else {
                var txt = this.game.add.text(X2 + img_size, startY + img_size / 2 + inter_img * ((i - 1) / 2), '' + this.countElems[i + 1], style1);
            }
            var tmp = txt.height;
            txt.height = img_size / 2;
            txt.width = txt.width / tmp * txt.height;
            this.txt_group[i] = txt;
            this.countElems[i + 1] = 0;
        }

    },
    update: function() {
        this.score_txt.text = "Score : " + this.score_general;
        this.highScore_txt.text = "High Score : " + this.highScore;
        this.moves_txt.text = "Moves Left : " + numMoves;
        //TODO Refresh High Score
        //TODO Count # elements
        for (var i = 0; i < elemNames.length; i++) {
            this.txt_group[i].text = this.countElems[i];
        }
        this.setButtonFrame();
    },
    addMatch2: function(elem_name, count) {
        var idx = elemNames.indexOf(elem_name);
        this.countElems[idx] += count;
    },
    addMatch: function(countHoriz, countVert, elem_name) {
        if (countHoriz < MATCH_MIN) {
            this.score_general = this.score_general + countVert;
            this.addMatch2(elem_name, 1);
        } else if (countVert < MATCH_MIN) {
            this.score_general = this.score_general + countHoriz;
            this.addMatch2(elem_name, 1);
        } else {
            this.score_general = this.score_general + (countHoriz + countVert) * 3;
            this.addMatch2(elem_name, 1);
        }
    },
    sendElementToAlchemy: function(element) {
        alchemyPanel.receiveElement(element);
    },
    decreaseElement: function(elem_name) {
        //TODO
        return true;
    },
    getElement: function(id) {
        return scorePanel.img_group[id];
    },
    actionOnClick: function() {
        this.animationScreen = true;
        alchemyPanel.elementToAdd = null;
        if (!this.inAlchemyPanel) {
            alchemyPanel.tweenElemPos(this.camera, -canvasWidth / 2 + scorePanel.width + 2 * margin, canvasHeight / 2);
            this.inAlchemyPanel = true;
        } else {
            alchemyPanel.tweenElemPos(this.camera, canvasWidth / 2, canvasHeight / 2);
            this.inAlchemyPanel = false;
        }
    }, setButtonFrame: function() {
        if (this.inAlchemyPanel) {
            buttonGame.setFrames(0, 0, 0, 0);
        } else {
            buttonGame.setFrames(2, 1, 1, 1);
        }
    },
    setHighScore: function(score) {
        this.highScore = score;
    }
};
