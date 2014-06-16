var RECIPEBUTTONWIDTH = 408;
var RECIPEBUTTONHEIGHT = 185;

RecipesPanel = function(game, x, y, width, height, lvl) {

    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.lvl = lvl;
    this.background;

    this.buttons = [];
};
RecipesPanel.prototype = {
    create: function() {
        var powerImgs = []
        switch(this.lvl){
            case 1:
                powerImgs[0] = 'salt';
                powerImgs[1] = 'ice';
                powerImgs[2] = 'sugar';
                break;
            case 2:
                powerImgs[0] = 'corondum';
                powerImgs[1] = 'sapphire';
                powerImgs[2] = 'ruby';
                powerImgs[3] = 'quartz';
                break;
            case 3:
                powerImgs[0] = 'aluminium';
                powerImgs[1] = 'brass';
                powerImgs[2] = 'steel';
            default:
                break;
        }
        
        
        this.background = game.add.sprite(this.x, this.y, 'recipesPanel');
        this.background.width = this.width;
        this.background.height = this.height;

        var buttonX = [];
        var buttonY = [];
        var buttonHeight = 0.95 * this.height / 4;
        var buttonWidth  = buttonHeight * RECIPEBUTTONWIDTH / RECIPEBUTTONHEIGHT;
        if(buttonWidth >= this.width * 0.95){
            var tmp = buttonWidth;
            buttonWidth = this.width * 0.95;
            buttonHeight = buttonHeight * buttonWidth / tmp;
        }
        var nb_powers = powerNames.length;
        for(var i = 0; i < nb_powers ; i++){
            buttonX[i] = this.x + (this.width - buttonWidth)/2
            buttonY[i] = this.y + i * this.height / nb_powers + (this.height / nb_powers - buttonHeight ) / 2;
        }
        


        for(var i = 0 ; i < nb_powers ; i++){
            var x = function(i){openPopUp(i);};
            this.buttons[i] = game.add.button(buttonX[i], buttonY[i], powerImgs[i], x, this, 0, 0, 0);
            //(function(i){openPopUp(i)})(i)
            this.buttons[i].width  = buttonWidth;
            this.buttons[i].height = buttonHeight;
        }
    },

    update: function() {
    }
}

function openPopUp(i){
    if(i.key ==='ice'){
        console.log('i = ice');
    }
    console.log(i.key);
    //var my_popUp = new InfoPopUp(game, 
}
