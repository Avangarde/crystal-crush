


// PopUp types: 'welcome', 'tuto', 'info'
PopUpPanel = function(game, x , y , width , height, father, type) {

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.background;

    this.type = type;

    this.xButton;
    this.father = father;

    this.clickCounter = 0;
};

PopUpPanel.prototype = {
create: function() {
    if(popUpPanel === 'welcome'){
        this.createWelcome();
    } else if (popUpPanel === 'info'){
        this.createInfo();
    } else if (popUpPanel === 'tuto'){
        this.createTuto();
    }
},
createWelcome: function (){
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

    console.log('here we are');
    console.log(popUpPanel);
    if(popUpPanel === 'welcome'){
        console.log('enter the if');
        this.unpauseWelcome(event);
    } else if (popUpPanel === 'info'){
        this.unpauseInfo(event);
    } else if (popUpPanel === 'tuto'){
        this.unpauseTuto(event);
    }
},
unpauseWelcome: function(event){
    if (eventInBorder(event, popUpPanel.xButton)){
        game.paused = false;
        popUpPanel.destroypopUp();
    }else if (popUpName = 'welcome') {
        if(welcomePopUp.eventInButton(event)){
            game.paused = false;
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
    //if(this.father != null){
    if(popUpName === 'welcome'){
        welcomePopUp.destroy();
    }
    // ACA TENES QUE PONER PLAY ANDY!!!
    // PONE PLAAAAAAAAAAAAAAAAAAAAAAAAAAY
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


