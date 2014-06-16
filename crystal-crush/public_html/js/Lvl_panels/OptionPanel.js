
OptionPanel = function(game, x , y , width , height){
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.backToMenuIcon;
    this.muteButton;
}
OptionPanel.prototype = {
create: function() {
    this.backToMenuIcon = game.add.button(this.x,this.y, 'backToMenuIcon', this.backToMenu, this);
    this.backToMenuIcon.width  = this.width;
    this.backToMenuIcon.height = this.width;

    var xmute = this.x;
    var ymute = this.backToMenuIcon.y + this.backToMenuIcon.height + margin;




    // GUIDOOOO
    //this.muteButton = game.add.button(xmute, ymute, 'muteIcon', this.muteUnmute, this, 0 , 0 , 0);
    this.muteButton = game.add.button(xmute, ymute, 'muteIcon', this.muteUnmute, this);

    this.muteUnmute.width  = this.backToMenuIcon.width;
    this.muteUnmute.height = this.backToMenuIcon.height;

    //GUIDOO
    /*
    if(audioActivated){
        this.muteButton.setFrames(0,0,0);
    }else{
        this.muteButton.setFrames(1,1,1);
    }
    */

},
backToMenu: function(){
        if (audioActivated) {
            gamePanel.ambientMusic.stop();
        }
        // ARE YOU SURE THAT YOU WANT TO GO ?
        this.game.state.start('home');
},

muteUnmute: function(){
    audioActivated = !audioActivated;
   /* if(audioActivated){
        this.muteButton.setFrames(0,0,0);
    }else{
        this.muteButton.setFrames(1,1,1);
    }
     */   
    if(audioActivated){
        console.log('audio activated');
    }else{
        console.log('audio desactivated');
    }

}
}
