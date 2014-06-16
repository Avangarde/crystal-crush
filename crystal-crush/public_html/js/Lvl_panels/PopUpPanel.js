


// PopUp types: 'welcome', 'tuto', 'info'
PopUpPanel = function(game, x , y , width , height, father, type) {

    if(x == null){
        this.x = xPopup
    }else{
        this.x = x;
    }
    if(y == null){
        this.y = yPopup
    }else{
        this.y = y;
    }
    if(width == null){
        this.width = widthPopup
    }else{
        this.width = width;
    }
    if(height == null){
        this.height = heightPopup
    }else{
        this.height = height;
    }

    this.background;

    this.type = type;

    this.xButton;
    this.father = father;

    this.clickCounter = 0;
};

PopUpPanel.prototype = {
create: function() {
    if(popUpPanel.type === 'welcome'){
        this.createWelcome();
    } else if (popUpPanel.type === 'info'){
        this.createInfo();
    } else if (popUpPanel.type === 'tuto'){
        this.createTuto();
    }
},
createWelcome: function (){
        this.background = game.add.sprite(this.x, this.y, 'PopUpBackground');
        this.background.width = this.width;
        this.background.height = this.height;
        game.paused = true;
        gamePanel.timer.pause();
        game.input.onDown.add(this.unpause, self);
        
        this.xButton = game.add.sprite(this.x, this.y + 5, 'xButton');
        if(this.width * 0.05 < this.height * 0.05){
            this.xButton.width = this.width * 0.05;
        }else{
            this.xButton.width = this.height * 0.05;
        }
        this.xButton.height = this.xButton.width;

        this.xButton.x = this.x + this.width - this.xButton.width;
},
createInfo: function (){
        this.background = game.add.sprite(this.x, this.y, 'PopUpBackground');
        this.background.width = this.width;
        this.background.height = this.height;
        game.paused = true;
        // ACA TENES QUE PONER PAUSA ANDY!!!
        game.input.onDown.add(this.unpause, self);
        
        this.xButton = game.add.sprite(this.x + this.width - 55, this.y + 5, 'xButton');
        this.xButton.width = 50;
        this.xButton.height = 50;
},
createTuto: function (){
        this.background = game.add.sprite(this.x, this.y, 'PopUpBackground');
        this.background.width = this.width;
        this.background.height = this.height;
        game.paused = true;
        // ACA TENES QUE PONER PAUSA ANDY!!!
        game.input.onDown.add(this.unpause, self);
        
        this.xButton = game.add.sprite(this.x + this.width - 55, this.y + 5, 'xButton');
        this.xButton.width = 50;
        this.xButton.height = 50;
},

update: function() {
},

unpause: function(event) {
    if (!game.paused) {
        return;
    }

    if(popUpPanel.type === 'welcome'){
        popUpPanel.unpauseWelcome(event);
    } else if (popUpPanel.type === 'info'){
        popUpPanel.unpauseInfo(event);
    } else if (popUpPanel.type === 'tuto'){
        popUpPanel.unpauseTuto(event);
    }
},
unpauseWelcome: function(event){
    if (eventInBorder(event, popUpPanel.xButton)){
        game.paused = false;
        popUpPanel.destroypopUp();
    }else if (popUpName = 'welcome') {
        if(welcomePopUp.eventInButton(event)){
            game.paused = false;
            gamePanel.timer.resume();
            popUpPanel.destroypopUp();
        }
    }else if(!eventInBorder(event, popUpPanel)){
        if (popUpPanel.clickCounter == 0) {
            popUpPanel.clickCounter++;
        } else {
            game.paused = false;
            popUpPanel.destroypopUp();
        }
    }
},
unpauseInfo: function(event){
},
unpauseTuto: function(event){
},


destroypopUp: function() {
    popUpPanel.background.kill();
    popUpPanel.xButton.kill();
    if(popUpPanel.type === 'welcome'){
        welcomePopUp.destroy();
    }
}
}

function eventInBorder(event, button) {
    if(!scorePanel.inAlchemyPanel){
        if (event.x >= button.x && event.x <= button.x + button.width) {
            if (event.y >= button.y && event.y <= button.y + button.height) {
                return true
            }
        }
        return false;
    }
}


