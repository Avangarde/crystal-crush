var canvasWidth = window.innerWidth * 10/16 < window.innerHeight ? window.innerWidth : window.innerHeight * 16/10;
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
var A = "A";
var B = "B";
var SELECT = "SELECT";
var elemNames = [CU, ZN, NA, CL, A, B];

var allowInput;
var elements;
var selectedElement;
var selectedElementStartPos;
var selectedElemTween;
var tempShiftedElem = null;
var matched = false;
var selection;

var elemCount = [0, 0, 0, 0, 0, 0]; 
var score_general = 0;
var score_text = 'Score: ' + score_general;
var count_cu_text = 'Cu: ' + elemCount[0];
var count_zn_text = 'Zn: ' + elemCount[1];;
var count_na_text = 'Na: ' + elemCount[2];;
var count_cl_text = 'Cl: ' + elemCount[3];;
var count_a_text  = 'A:  ' + elemCount[4];;
var count_b_text  = 'B:  ' + elemCount[5];;

var style1 = { font: "20px Arial", fill: "#ff0000", align: "center" };
var style2 = { font: "12px Arial", fill: "#00ffff", align: "center" };

