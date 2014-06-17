var game;
var canvasWidth = window.innerWidth;
var canvasHeight = canvasWidth * 10 / 16 < window.innerHeight ? canvasWidth * 10 / 16 : window.innerHeight;
var margin = canvasHeight * 0.015;

//////////
// Panels sizes
//////////

// ScorePanel
var xScorePanel = margin;
var yScorePanel = margin;
var widthScorePanel = ((canvasWidth - margin) / 3) -  margin;
var heightScorePanel = canvasHeight - (2 * margin);

// GamePanel
var sizeGamePanel = canvasHeight - (2 * margin);

var BOARD_COLS = 6;
var BOARD_ROWS = 6;
var MATCH_MIN = 3;
var ELEM_SIZE = (sizeGamePanel - (2 * margin)) / BOARD_ROWS;

if( canvasWidth  < 4*margin + widthScorePanel + sizeGamePanel + ELEM_SIZE){
    sizeGamePanel = ((BOARD_ROWS * ( canvasWidth - 4*margin - widthScorePanel)- 2*margin)/(BOARD_ROWS+1));
    ELEM_SIZE = (sizeGamePanel - (2 * margin)) / BOARD_ROWS;
    heightScorePanel = sizeGamePanel;
    yScorePanel = (canvasHeight- heightScorePanel ) / 2 ;
}

var widthGamePanel = sizeGamePanel;
var heightGamePanel = sizeGamePanel;
var xGamePanel = xScorePanel + widthScorePanel + margin;
var xGamePanel = xGamePanel + (canvasWidth * 2 / 3 - ELEM_SIZE - 3 * margin - sizeGamePanel) / 2
var yGamePanel = yScorePanel;


// AlchemyPanel
var widthAlchemyPanel = widthScorePanel;
var heightAlchemyPanel = heightScorePanel;
var xAlchemyPanel = widthAlchemyPanel * -1;
var yAlchemyPanel = yScorePanel;

// RecipesPanel
var widthRecipesPanel = widthScorePanel;
var heightRecipesPanel = heightScorePanel;
var xRecipesPanel = - (widthRecipesPanel + widthAlchemyPanel + margin);
var yRecipesPanel= yScorePanel;

// OptionPanel
var widthOptionPanel  = ELEM_SIZE;
var heightOptionPanel = heightScorePanel;
var xOptionPanel = canvasWidth - widthOptionPanel - margin;
var yOptionPanel= yScorePanel;

    
// PopUpPanel
var widthPopup = canvasWidth * 5 / 6;
var heightPopup = canvasHeight * 5 / 6;
var xPopup = canvasWidth / 12;
var yPopup = canvasHeight / 12;

//////////
// Important strings for images
//////////

// Elements
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

// Graphics
var SELECT = "SELECT";
var SELECTHINT = "SELECTHINT";

// Powers
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

//////////
// Important Arrays
//////////
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

//var audioActivated = true;
var audioActivated = false;

var style1 = { font: (canvasHeight/20)+"px Arial", fill: "#ffffff", align: "center" };
var style2 = { font: (canvasHeight/20)+"px Arial", fill: "#00ffff", align: "center" };

var RECIPE = '_recipe';
var INFO = '_info';
