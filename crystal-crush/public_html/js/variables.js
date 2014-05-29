var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var scorePanelWidth = canvasWidth * 0.3;
var gamePanelWidth = canvasWidth * 0.7;

var BOARD_COLS = 6;
var BOARD_ROWS = 6;
var MATCH_MIN = 3;
var ELEM_SIZE = canvasHeight / BOARD_COLS;

var CU = "CU";
var ZN = "ZN";
var NA = "NA";
var CL = "CL";
var A = "A";
var B = "B";
var elemNames = [CU, ZN, NA, CL,A,B];

var allowInput;
var elements;
var selectedElement;
var selectedElementStartPos;
var selectedElemTween;
var tempShiftedElem = null;



