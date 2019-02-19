/// <reference path="./Board.ts" />

declare var player1Board: Board;
declare var isTurnDone: boolean;
declare var hasGameStarted: boolean;
declare var shipPlacing: number;
declare var typeOfShipSelected: number;
declare var shipTypes: number[];
//player1 player2;

$(document).ready(() => {
    let element = $("table[data-bot = 'False']");
    let boardSize: number = parseInt($(element).attr("data-board-size"));
    shipTypes = [];
    for (let i: number = 0; i < 5; i++) {
        shipTypes[i] = parseInt($($("span[data-type = 'Label-ship." + i + "']")).attr("data-amount"));
        console.log(shipTypes[i]);
    }
    hasGameStarted = false;
    shipPlacing = 1;
    typeOfShipSelected = -1;
    isTurnDone = false;
    player1Board = new Board(boardSize, shipTypes, false, "Player");
})

$(".tile").click(function (event) {
    var waterTile = event.target;
    if ($(this).parent().parent().parent().attr("data-bot") == "False" && typeOfShipSelected > 0) { //checking if the event is triggered by the correct board (players board)
        var x = parseInt($(waterTile).attr("data-x"));
        var y = parseInt($(waterTile).attr("data-y"));
        player1Board.placeShip(new Ship(typeOfShipSelected, true), x, y, true);
        typeOfShipSelected = -1;
    }
    
});


//work in progress
$(".choose-tile").click(function (event) {
    var choosenShip = event.target;
    if ($(choosenShip).attr("data-disabled") == "False") {
        typeOfShipSelected = parseInt($(choosenShip).attr("data-type")) + 1;
    }
});

