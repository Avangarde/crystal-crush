var canvasWidth = window.innerWidth * 10/16 < window.innerHeight ? window.innerWidth : window.innerHeight * 16/10;
var canvasHeight = canvasWidth * 10 / 16 < window.innerHeight ? canvasWidth * 10 / 16 : window.innerHeight;
var margin = canvasHeight * 0.015;
var scorePanelWidth = (canvasWidth * 0.3) - (2 * margin);
var scorePanelHeight = canvasHeight - (2 * margin);
var gamePanelWidth = canvasHeight - (2 * margin);
var gamePanelHeight = canvasHeight - (2 * margin);

var BOARD_COLS = 6;
var BOARD_ROWS = 6;
var MATCH_MIN = 3;
var ELEM_SIZE = (gamePanelHeight - (2 * margin)) / BOARD_COLS;

var CU = "CU";
var ZN = "ZN";
var NA = "NA";
var CL = "CL";
var A = "A";
var B = "B";
var elemNames = [CU, ZN, NA, CL, A, B];

var allowInput;
var elements;
var selectedElement;
var selectedElementStartPos;
var selectedElemTween;
var tempShiftedElem = null;
var matched = false;



