var game;
var canvasWidth = window.innerWidth;
var canvasHeight = canvasWidth * 10 / 16 < window.innerHeight ? canvasWidth * 10 / 16 : window.innerHeight;
var margin = canvasHeight * 0.015;

var xScorePanel = margin;
var yScorePanel = margin;
var widthScorePanel = (canvasWidth * 0.3) - (2 * margin);
var heigthScorePanel = canvasHeight - (2 * margin);

var widthGamePanel = canvasHeight - (2 * margin);
var heigthGamePanel = canvasHeight - (2 * margin);
var xGamePanel = (canvasWidth + widthScorePanel + margin - widthGamePanel)/2;
var yGamePanel = margin;

var widthAlchemyPanel = canvasHeight - (2 * margin);
var heightAlchemyPanel = canvasHeight - (2 * margin);
var xAlchemyPanel = (2 * margin + widthAlchemyPanel) * -1;
var yAlchemyPanel = margin;

var BOARD_COLS = 6;
var BOARD_ROWS = 6;
var MATCH_MIN = 3;
var ELEM_SIZE = (heigthGamePanel - (2 * margin)) / BOARD_COLS;

var CU = "CU";
var ZN = "ZN";
var NA = "NA";
var CL = "CL";
var C = "C-";
var H = "H-";
var O = "O-";
var AL = "AL";
var CR = "CR";
var SI = "SI";
var TI = "TI";
var SELECT = "SELECT";
var SALT = "Salt";
var ICE = "Ice";
var SUGAR = "Sugar";
var CORUNDUM = "Corundum";
var RUBY = "Ruby";
var SAPPHIRE = "Sapphire";
var QUARTZ = "Quartz";
var elemNames = [];
var powerNames = [];
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

var style1 = { font: (canvasHeight/20)+"px Arial", fill: "#ffffff", align: "center" };
var style2 = { font: (canvasHeight/20)+"px Arial", fill: "#00ffff", align: "center" };

var CrystalCrush = {};