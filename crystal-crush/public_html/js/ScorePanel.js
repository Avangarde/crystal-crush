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

    this.inAlchemyPanel = false;
    this.camera;
    this.highScore = 0;
};

ScorePanel.prototype = {
preload: function() {
             game.load.image('scorePanelBackground', 'assets/scorePanel.png');
             game.load.spritesheet('createElement', 'assets/buttons/button_create_element.png', BUTTONWIDTH, BUTTONHEIGHT);
             game.load.image('camera', 'assets/camera.png');
             game.load.image('PowerA', 'assets/sprites/BluePower.png');
             game.load.image('PowerB', 'assets/sprites/VioletPower.png');
             game.load.image('PowerC', 'assets/sprites/GreenPower.png');
         },
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
                    this.highScore_txt.y +  this.highScore_txt.height + margin, '' + numMoves, style1);

            elemsPanelX = scorePanel.x + margin;
            elemsPanelY = this.moves_txt.y + this.moves_txt.height + margin;


            // Create Button
            // 408 x 80
            var buttonWidth = scorePanel.width - 2 * margin;
            var buttonHeight = buttonWidth * BUTTONHEIGHT / BUTTONWIDTH;
            var buttonX = scorePanel.x +  margin;
            var buttonY = scorePanel.y + scorePanel.height - margin - buttonHeight;
            if(0.15 * scorePanel.height < buttonHeight){
                buttonHeight = 0.15 * scorePanel.height;
                buttonWidth  = buttonHeight * BUTTONWIDTH / BUTTONHEIGHT;
                buttonX = scorePanel.x + (scorePanel.width - buttonWidth) / 2 ;  
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
            if(elemsPanelW < elemsPanelH){
                if( 0.18 * elemsPanelH < 0.35 * elemsPanelW){
                    img_size = 0.2 * elemsPanelH;
                }else{
                    img_size = 0.35 * elemsPanelW;
                }

                for(var i = 0 ; i < 5 ; i++){
                    elemsX[2*i] = elemsPanelX;
                }
                for(var i = 0 ; i < 5 ; i++){
                    elemsX[2*i+1] = elemsPanelX + elemsPanelW * 0.5;
                }

                for(var i = 0 ; i < 5 ; i++){
                    elemsY[2*i] = elemsPanelY + i * img_size;
                    elemsY[2*i+1] = elemsY[2*i];
                }

            } else {
                if( elemsPanelH / 3.0  < elemsPanelW / 4.0){
                    img_size = (elemsPanelH / 3.0);
                }else{
                    img_size = (elemsPanelW / 4.0);
                }
                elemsX[0] = elemsPanelX;
                elemsY[0] = elemsPanelY;

                elemsX[1] = elemsPanelX;
                elemsY[1] = elemsPanelY + img_size;

                elemsX[2] = elemsPanelX + elemsPanelW / 3;
                elemsY[2] = elemsPanelY;

                elemsX[3] = elemsX[2]; 
                elemsY[3] = elemsPanelY + img_size;

                elemsX[4] = elemsPanelX + elemsPanelW * 2 / 3;
                elemsY[4] = elemsPanelY;

                elemsX[5] = elemsX[4];
                elemsY[5] = elemsPanelY + img_size;

                elemsX[6] = elemsPanelX;
                elemsY[6] = elemsPanelY + 2 * img_size + margin;

                elemsX[7] = elemsX[6] + elemsPanelW / 4; 
                elemsY[7] = elemsPanelY + 2 * img_size;

                elemsX[8] = elemsX[7]  + elemsPanelW / 4;
                elemsY[8] = elemsPanelY + 2 * img_size;

                elemsX[9] =  elemsX[8] + elemsPanelW / 4;
                elemsY[9] = elemsPanelY + 2 * img_size;


            }

            // var X1 = this.x + this.width * 0.15;
            // var X2 = this.x + this.width * 0.55;
            // var inter_img = this.width * 0.2;
            // var startY = this.highScore_txt.y + 2 * this.highScore_txt.height + margin;// + inter_img;


            for (var i = 0; i < panelElements.length; i++) {
                var elem = this.img_group.create(elemsX[i], elemsY[i], panelElements[i]);
                elem.width = img_size;
                elem.height = img_size;
                elem.name = panelElements[i];
                elem.id = i;
                elem.inputEnabled = true;
                if (i < elemNames.length) {
                    elem.events.onInputDown.add(this.sendElementToAlchemy);
                }else {
                    elem.events.onInputDown.add(this.sendPowerToGame);
                }
                elem.inputEnabled = true;
            }

            //Elems_count
            for (var i = 0; i < panelElements.length; i++) {
                this.countElems[i] = 0;
                var txt = this.game.add.text(elemsX[i]+img_size, elemsY[i] + img_size /4, '' + this.countElems[i], style1);
                var tmp = txt.height;
                txt.height = img_size / 2;
                txt.width = txt.width / tmp * txt.height;
                this.txt_group[i] = txt;
                this.countElems[i + 1] = 0;
            }

},
update: function() {
               this.highScore = scorePanel.score_general > scorePanel.highScore ?
               scorePanel.score_general : scorePanel.highScore;
               this.score_txt.text = "Score : " + this.score_general;
               this.highScore_txt.text = "High Score : " + this.highScore;
               this.moves_txt.text = "Moves Left : " + numMoves;
               for (var i = 0; i < panelElements.length; i++) {
               this.txt_group[i].text = this.countElems[i];
               }
               this.setButtonFrame();
        },
addMatch2: function(elem_name, count) {
                  var idx = panelElements.indexOf(elem_name);
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
sendPowerToGame: function(element) {
                     if (scorePanel.countElems[element.id] > 0) {
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
getElement: function(id) {
                return scorePanel.img_group.iterate("id", id, Phaser.Group.RETURN_CHILD);
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
