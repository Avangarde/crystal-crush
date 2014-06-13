
WelcomePopUp = function(game) {
    this.game = game;
    this.popup;
    this.playButton;
};
WelcomePopUp.prototype = {
    create: function() {
        this.popup = new PopUpPanel(game, xPopup, yPopup, widthPopup, heightPopup, this, 'welcome');
        popUpPanel = this.popup
        popUpName = 'welcome';
        this.popup.create();

        this.playButton = game.add.sprite(this.popup.x + this.popup.width / 4, this.popup.y + this.popup.height * 5 / 8, 'playButton');
        this.playButton.width = this.popup.width / 2;
        this.playButton.height = this.popup.height / 4;
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
