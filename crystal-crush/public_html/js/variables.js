var canvasWidth = window.innerWidth;
var canvasHeight = canvasWidth * 10/16;
var margin = canvasHeight * 0.015;
var scorePanelWidth = (canvasWidth * 0.3) - (2*margin);
var scorePanelHeight = canvasHeight - (2*margin);
var gamePanelWidth = canvasHeight - (2*margin);
var gamePanelHeight = canvasHeight - (2*margin);

var BOARD_COLS = 6;
var BOARD_ROWS = 6;
//var ELEM_SIZE=64;
//var ELEM_SPACING=90;
//var ELEM_SIZE_SPACED = ELEM_SIZE + ELEM_SPACING;
ELEM_SIZE_SPACED = (gamePanelHeight-(2*margin))/BOARD_COLS;

var CU = "CU";
var ZN = "ZN";
var NA = "NA";
var CL = "CL";
var A = "A";
var B = "B";
var elemNames = [CU,ZN,NA,CL,A,B];

var elements;
var selectedElementStartPos;



