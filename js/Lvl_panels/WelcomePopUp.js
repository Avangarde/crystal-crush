
WelcomePopUp = function(game) {
    this.game = game;
    this.popup;
    this.playButton;
};
WelcomePopUp.prototype = {
    create: function() {
        this.popup = new PopUpPanel(game, null, null, null, null, this, 'welcome');
        popUpPanel = this.popup
        popUpName = 'welcome';
        this.popup.create();

        this.playButton = game.add.sprite(this.popup.x , this.popup.y + this.popup.height * 6 / 8, 'playButton');
        this.playButton.width = this.popup.width / 4;
        this.playButton.height = this.popup.height / 8;
        this.playButton.x = this.popup.x + (this.popup.width - this.playButton.width) / 2 ; 
    },
    update: function() {
    },
    destroy: function(){
        this.playButton.kill();
    },
    eventInButton: function(event){
        return eventInBorder(event, this.playButton);
    }
}
