var game;
var canvasWidth = window.innerWidth;
var canvasHeight = canvasWidth * 10 / 16 < window.innerHeight ? canvasWidth * 10 / 16 : window.innerHeight;
var margin = canvasHeight * 0.015;

var xScorePanel = margin;
var yScorePanel = margin;
var widthScorePanel = ((canvasWidth - margin) / 3) -  margin;
var heightScorePanel = canvasHeight - (2 * margin);

var widthGamePanel = canvasHeight - (2 * margin);
var heightGamePanel = canvasHeight - (2 * margin);
var xGamePanel = (canvasWidth + widthScorePanel + margin - widthGamePanel)/2;
var yGamePanel = margin;

var widthAlchemyPanel = widthScorePanel;
var heightAlchemyPanel = heightScorePanel;
var xAlchemyPanel = widthAlchemyPanel * -1;
var yAlchemyPanel = margin;

var widthRecipesPanel = widthScorePanel;
var heightRecipesPanel = heightScorePanel;
var xRecipesPanel = - (widthRecipesPanel + widthAlchemyPanel + margin);
var yRecipesPanel= margin;

//var widthOptionPanel  = ELEM_SIZE;
var widthOptionPanel  = 100;
var heightOptionPanel = heightScorePanel;
var xOptionPanel = canvasWidth - widthOptionPanel - margin;
var yOptionPanel= margin;


// GUIDO
if((2 / 3 * canvasWidth - xGamePanel) / 2 < widthOptionPanel + 2 * margin){
    if(2 / 3 * canvasWidth - xGamePanel < widthOptionPanel + 2 * margin){
        //IF WE ARE HERE, WE ARE IN TROUBLES
    }
    xGamePanel = widthScorePanel + margin + (canvasWidth - widthScorePanel - margin - widthGamePanel - widthOptionPanel)/2;

    // Not enought place to our OptionButtoms! gamePanel needs to be replaced dude
}else{
    // enough place, just place them bitch
}

    
var widthPopup = canvasWidth * 5 / 6;
var heightPopup = canvasHeight * 5 / 6;
var xPopup = canvasWidth / 12;
var yPopup = canvasHeight / 12;

var BOARD_COLS = 6;
var BOARD_ROWS = 6;
var MATCH_MIN = 3;
var ELEM_SIZE = (heightGamePanel - (2 * margin)) / BOARD_ROWS;

var CU = "CU";
var ZN = "ZN";
var NA = "NA";
var CL = "CL";
var C = "C";
var H = "H";
var O = "O";
var AL = "AL";
var CR = "CR";
var SI = "SI";
var TI = "TI";
var AU = "AU";
var FE = "FE";
var SELECT = "SELECT";
var SELECTHINT = "SELECTHINT";
var SALT = "Salt";
var ICE = "Ice";
var SUGAR = "Sugar";
var CORUNDUM = "Corundum";
var RUBY = "Ruby";
var SAPPHIRE = "Sapphire";
var QUARTZ = "Quartz";
var BRASS = "Brass";
var STEEL = "Steel";
var GOLD = "Gold";
var ALUMINIUM = "Aluminium";
var elemNames = [];
var powerNames = [];
var powerA = [];
var powerB = [];
var powerC = [];
var powerD = [];
var panelElements = [];

var allowInput;
var elements;
var selectedElement;
var selectedElementStartPos;
var selectedElemTween;
var tempShiftedElem = null;
var matched = false;
var selection;
var stillGame;

// var audioActivated = true;
var audioActivated = false;

var style1 = { font: (canvasHeight/20)+"px Arial", fill: "#ffffff", align: "center" };
var style2 = { font: (canvasHeight/20)+"px Arial", fill: "#00ffff", align: "center" };
