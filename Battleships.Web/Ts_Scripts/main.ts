/// <reference path="./Board.ts" />

declare var player1Board: Board;
declare var isTurnDone: boolean;
declare var hasGameStarted: boolean;
declare var shipPlacing: number;
declare var typeOfShipSelected: number;
declare var shipTypes: number[];
declare var horizontal: boolean;
//player1 player2;

$(document).ready(() => {
    let element = $("table[data-player-number = 0]");
    let boardSize: number = parseInt($(element).attr("data-board-size"));
    shipTypes = [];
    for (let i: number = 0; i < 5; i++) {
        shipTypes[i] = parseInt($($("span[data-type = 'Label-ship." + i + "']")).attr("data-amount"));
        console.log(shipTypes[i]);
    }
    horizontal = true;
    hasGameStarted = false;
    shipPlacing = 1;
    typeOfShipSelected = -1;
    isTurnDone = false;
    player1Board = new Board(boardSize, shipTypes, false, "Player",0);
})

$(".tile").click(function (event) {
    var waterTile = event.target;
    if ($(this).parent().parent().parent().attr("data-bot") == "False" && typeOfShipSelected > 0) { //checking if the event is triggered by the correct board (players board)
        var x = parseInt($(waterTile).attr("data-x"));
        var y = parseInt($(waterTile).attr("data-y"));
        if (player1Board.placeShip(new Ship(typeOfShipSelected, horizontal), x, y, horizontal) && x > 0 && y > 0) {
            updateMenu();
            typeOfShipSelected = -1;

        }
        
    }
    
});

function updateMenu(): void {
    if (player1Board.getShipCount(typeOfShipSelected) > 0) {
        $(".choosen-tile").removeClass("choosen-tile").addClass("choose-tile");
    } else {
        $(".choosen-tile").attr("data-disabled", "True");
        $(".choosen-tile").removeClass("choosen-tile").addClass("disabled-choose-tile");
    }
    $("span[data-type='Label-ship." + (typeOfShipSelected-1) + "']").text(player1Board.getShipCount(typeOfShipSelected) + "x");
}

$("#orientationButton").click(function (event) {
    horizontal = !horizontal;
    console.log(horizontal);
    if (horizontal) {
        $("#orientationText").text('horizontal');
    } else {
        $("#orientationText").text('vertical');
    }
   
    
});


//work in progress
$(".choose-tile").click(function (event) {
    var choosenShip = event.target;
    if (typeOfShipSelected > 0) {
        $(".choosen-tile").removeClass("choosen-tile").addClass("choose-tile");
        typeOfShipSelected = -1;
    }
    if ($(choosenShip).attr("data-disabled") == "False") {
        typeOfShipSelected = parseInt($(choosenShip).attr("data-type")) + 1;
        $(this).parent().children().removeClass("choose-tile").addClass("choosen-tile");
    }
});

