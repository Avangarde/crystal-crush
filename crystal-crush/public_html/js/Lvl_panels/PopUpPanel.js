
// PopUp types: 'welcome', 'tuto', 'info'
PopUpPanel = function(game, x, y, width, height, father, type) {

    if (x === null) {
        this.x = xPopup;
    } else {
        this.x = x;
    }
    if (y === null) {
        this.y = yPopup;
    } else {
        this.y = y;
    }
    if (width === null) {
        this.width = widthPopup;
    } else {
        this.width = width;
    }
    if (height === null) {
        this.height = heightPopup;
    } else {
        this.height = height;
    }

    this.background;
    this.type = type;
    this.welcome;
    this.xButton;
    this.father = father;
    this.infoToDisplay;
    this.clickCounter = 0;
    this.infoPanel;

};

PopUpPanel.prototype = {
    create: function() {
        if (this.type === 'welcome') {
            this.createWelcome();
            this.affiche = true;
        } else if (this.type === 'info') {
            this.createInfo();
        } else if (this.type === 'tuto') {
            this.createTuto();
        }
    },
    createWelcome: function() {
        this.background = game.add.sprite(this.x, this.y, 'PopUpBackground');
        this.background.width = this.width;
        this.background.height = this.height;
        this.welcome = game.add.sprite(this.x, this.y, game.welcomeImg);
        this.welcome.width = this.width;
        this.welcome.height = this.height;
        game.paused = true;
        gamePanel.timer.pause();
        game.input.onDown.add(this.unpause, self);
        this.xButton = game.add.sprite(this.x, this.y + 5, 'xButton');
        if (this.width * 0.15 < this.height * 0.15) {
            this.xButton.width = this.width * 0.15;
        } else {
            this.xButton.width = this.height * 0.15;
        }
        this.xButton.height = this.xButton.width;

        this.xButton.x = this.x + this.width - this.xButton.width;
    },
    createInfo: function() {
        
        this.background = game.add.sprite(this.x, this.y, 'PopUpBackground');
        this.background.width = this.width;
        this.background.height = this.height;
        this.infoPanel = game.add.sprite(this.x, this.y, this.infoToDisplay);
        this.infoPanel.width = this.width;
        this.infoPanel.height = this.height;
        game.paused = true;
        game.input.onDown.add(this.unpause, self);
        this.xButton = game.add.sprite(this.x + this.width - 55, this.y + 5, 'xButton');
        this.xButton.width = 50;
        this.xButton.height = 50;
    },
    createTuto: function() {
        var imageKey = "TUTO" + currentTuto;
        this.background = game.add.sprite(this.x, this.y, imageKey);
        this.background.width = this.width;
        this.background.height = this.height;

    },
    update: function() {
    },
    unpause: function(event) {

        if (!game.paused) {
            return;
        }
        if (popUpPanel.type === 'welcome') {
            popUpPanel.unpauseWelcome(event);
        } else if (popUpPanel.type === 'info') {
            popUpPanel.unpauseInfo(event);
        } else if (popUpPanel.type === 'tuto') {
            popUpPanel.killTuto(event);
        }
    },
    unpauseWelcome: function(event) {
        if (eventInBorder(event, popUpPanel.xButton)) {
            this.resumeWelcome();
        } else if (popUpName === 'welcome') {
            if (welcomePopUp.eventInButton(event)) {
                this.resumeWelcome();
            }
        } else if (!eventInBorder(event, popUpPanel)) {
            if (popUpPanel.clickCounter === 0) {
                popUpPanel.clickCounter++;
            } else {
                this.resumeWelcome();
            }
        }

    },
    resumeWelcome: function() {
        game.paused = false;
        gamePanel.timer.resume();
        popUpPanel.destroypopUp();
    },
    unpauseInfo: function(event) {
        if (eventInBorder(event, popUpPanel.xButton)) {
            this.resumeWelcome();
        } else if (!eventInBorder(event, popUpPanel)) {
            if (popUpPanel.clickCounter === 0) {
                popUpPanel.clickCounter++;
            } else {
                this.resumeWelcome();
            }
        }
    },
    killTuto: function(event) {
        var we = (welcomePopUp === null);
        if (we) {
            tutoPanel.background.destroy();
            game.input.onDown.remove(tutoPanel.killTuto, self);
        }
        if (currentTuto === 1) {
            if (we) {
                gamePanel.unHint = true;
                gamePanel.timer.loop(TIME_HELP, helpTest, this.game, this, true);
                gamePanel.timer.start();
                unselectHint();
                currentTuto++;
            } else {
                game.input.onDown.add(tutoPanel.killTuto, self);
            }
        } else if (currentTuto === 2) {
            tutoPanel = new PopUpPanel(game, gamePanel.x + (gamePanel.width / 2 - TUTO_WIDTH / 2),
                    gamePanel.y + (gamePanel.height / 2 - TUTO_HEIGHT / 2), TUTO_WIDTH,
                    TUTO_HEIGHT, this, 'tuto');
            currentTuto++;
            tutoPanel.create();
            game.input.onDown.add(tutoPanel.killTuto, self);
        } else if (currentTuto === 5) {
            tutoPanel = new PopUpPanel(game, recipesPanel.x + (recipesPanel.width - 30),
                    recipesPanel.y, TUTO_WIDTH, TUTO_HEIGHT, this, 'tuto');
            currentTuto++;
            tutoPanel.create();
            game.input.onDown.add(tutoPanel.killTuto, self);
        } else if (currentTuto === 6) {
            var button = recipesPanel.buttons[0];
            tutoPanel = new PopUpPanel(game, button.x + (button.width),
                    button.y, TUTO_WIDTH, TUTO_HEIGHT, this, 'tuto');
            currentTuto++;
            tutoPanel.create();
            selection = game.add.sprite(button.x + (9 * button.width / 11), button.y, SELECT);
            selection.width = button.width / 7;
            selection.height = button.height;
            game.input.onDown.add(tutoPanel.killTuto, self);
        } else if (currentTuto === 7) {
            tutoPanel = new PopUpPanel(game, alchemyPanel.x +
                    (alchemyPanel.width / 2 - TUTO_WIDTH / 2), alchemyPanel.y +
                    (alchemyPanel.height / 2 - TUTO_HEIGHT / 2), TUTO_WIDTH, TUTO_HEIGHT,
                    this, 'tuto');
            currentTuto++;
            tutoPanel.create();
            selection.kill();
            game.input.onDown.add(tutoPanel.killTuto, self);
        } else if (currentTuto === 10) {
            tutoPanel = new PopUpPanel(game, gamePanel.x + (gamePanel.width / 2 - TUTO_WIDTH / 2),
                    gamePanel.y + (gamePanel.height / 2 - TUTO_HEIGHT / 2), TUTO_WIDTH,
                    TUTO_HEIGHT, this, 'tuto');
            currentTuto++;
            tutoPanel.create();
            game.input.onDown.add(tutoPanel.killTuto, self);
        }
    },
    destroypopUp: function() {
        popUpPanel.background.kill();
        popUpPanel.xButton.kill();        
        if (popUpPanel.type === 'welcome') {
            welcomePopUp.destroy();
            welcomePopUp = null;
            popUpPanel.welcome.destroy();
            game.input.onDown.remove(popUpPanel.unpause, self);
        } else{
            popUpPanel.infoPanel.kill();
            game.input.onDown.remove(popUpPanel.unpause, self);
        }

    }
}

function eventInBorder(event, button) {
    if (!scorePanel.inAlchemyPanel) {
        if (event.x >= button.x && event.x <= button.x + button.width) {
            if (event.y >= button.y && event.y <= button.y + button.height) {
                return true;
            }
        }
        return false;
    }else{
        if (event.x  >= button.x - game.camera.x && event.x <= button.x + button.width - game.camera.x ) {
            if (event.y >= button.y && event.y <= button.y + button.height) {
                return true;
            }
        }
        return false;
    }
    
}


