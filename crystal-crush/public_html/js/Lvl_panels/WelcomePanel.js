
WelcomePanel = function(game){

    this.x = canvasWidth / 12;
    this.y = canvasHeight /12;
    this.width = canvasWidth * 5 / 6 ;
    this.height = canvasHeight * 5 / 6 ;
    this.background;

    this.title_txt;
    this.title_box;
    this.description;

    this.xButton;
    this.playButton;

    this.clickCounter = 0;
};

WelcomePanel.prototype = {
create: function() {
            this.background = game.add.sprite(this.x, this.y, 'welcomePanelBackground');
            this.background.width = this.width;
            this.background.height = this.height;
            game.paused = true;
            game.input.onDown.add(this.unpause, self);

            this.xButton = game.add.sprite(this.x+this.width - 55, this.y+5, 'xButton');
            this.xButton.width  = 50;
            this.xButton.height = 50;


            this.playButton = game.add.sprite(this.x+this.width/4, this.y+this.height*5/8, 'playButton');
            this.playButton.width  = this.width/2;
            this.playButton.height = this.height/4;
        },
update: function() {
        },
unpause: function (event) {
             if(!game.paused){
                 return;
             }


        
             if (welcomePanel.eventInBorder(event, welcomePanel.xButton)){
             }
             if(welcomePanel.eventInBorder(event, welcomePanel.playButton)) {
             }
             if (welcomePanel.eventInBorder(event, welcomePanel.xButton) || welcomePanel.eventInBorder(event, welcomePanel.playButton)) {
                 game.paused = false;
                 welcomePanel.destroyWelcome();
             } else {
                 if(welcomePanel.clickCounter == 0){
                     welcomePanel.clickCounter ++;
                 }else{
                     game.paused = false;
                     welcomePanel.destroyWelcome();
                 }
             }
         },
destroyWelcome: function(){
                    welcomePanel.xButton.kill();
                    welcomePanel.playButton.kill();
                    welcomePanel.background.kill();
                },
eventInBorder: function(event, button){
    if(event.x >= button.x && event.x <= button.x + button.width){
        if(event.y >= button.y && event.y <= button.y + button.height){
        return true
        }
    }
    return false;
}
}

