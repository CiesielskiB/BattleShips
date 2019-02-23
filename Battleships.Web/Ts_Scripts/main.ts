/// <reference path="./Board.ts" />

declare var player1Board: Board;
declare var player2Board: Board;
declare var isTurnDone: boolean;
declare var hasGameStarted: boolean;
declare var shipPlacing: number;
declare var shipsToPlace: number;
declare var typeOfShipSelected: number;
declare var shipTypes: number[];
declare var horizontal: boolean;
declare var boardSize
//player1 player2;

$(document).ready(() => {
    let element = $("table[data-player-number = 0]");
    boardSize = parseInt($(element).attr("data-board-size"));
    shipTypes = [];
    shipsToPlace = 0;
    for (let i: number = 0; i < 5; i++) {
        shipTypes[i] = parseInt($($("span[data-type = 'Label-ship." + i + "']")).attr("data-amount"));
        console.log(shipTypes[i]);
        shipsToPlace+= shipTypes[i];
    }
    horizontal = true;
    hasGameStarted = false;
    shipPlacing = 1;
    typeOfShipSelected = -1;
    isTurnDone = false;
    player1Board = new Board(boardSize, shipTypes, false, "Player",0);
    player2Board = new Board(boardSize, shipTypes, true, "Player2", 1);
})

$(".BoardsContainter").on('click', ".tile", function (event) {
    var waterTile = event.target;
    var clickedBoard = $(this).parent().parent().parent();
    //ship placing phase
    if (!hasGameStarted) {
        
        // checking if tile is valid
        if (parseInt(clickedBoard.attr("data-player-number")) == 0 && $(waterTile).attr("data-x") != undefined && $(waterTile).attr("data-y") != undefined) { //checking if the event is triggered by the correct board (players board)
            var x = parseInt($(waterTile).attr("data-x"));
            var y = parseInt($(waterTile).attr("data-y"));
            //placing ships
            if (typeOfShipSelected > 0) {
                if (player1Board.placeShip(new Ship(typeOfShipSelected, horizontal), x, y, horizontal) && x > 0 && y > 0) {
                    shipsToPlace--;
                    updateMenu();
                    typeOfShipSelected = -1;
                    if (shipsToPlace <= 0) {
                        shipPlacing--;
                    }
                }
                // deplacing ships
            } else {
                if (player1Board.getTile(x, y).getShip() != null) {
                    console.log("unship tile");
                    let deletedShip: number = player1Board.unplaceShip(x, y);
                    let menuTile = $("th[data-type = " + (deletedShip - 1) + "]");
                    if (shipsToPlace <= 0) {
                        shipPlacing++;
                    }
                    shipsToPlace++;
                    if ($(menuTile).hasClass("disabled-choose-tile")) {
                        console.log("it does lol");
                        $(menuTile).removeClass("disabled-choose-tile").addClass("choose-tile");
                        $(menuTile).attr("data-disabled", "False");
                    }
                    $("span[data-type='Label-ship." + (deletedShip - 1) + "']").text(player1Board.getShipCount(deletedShip) + "x");
                }
            }
        }
    //shooting phase
    } else {
        
        if (parseInt(clickedBoard.attr("data-player-number")) == 1 && $(waterTile).attr("data-x") != undefined && $(waterTile).attr("data-y") != undefined) {
            var x = parseInt($(waterTile).attr("data-x"));
            var y = parseInt($(waterTile).attr("data-y"));
            let tile: Tile = player2Board.getTile(x, y);
            console.log("trying to shoot");
            if (!tile.wasShot && !isTurnDone) {
                //ship wasnt hit
                if (!tile.shoot()) {
                    isTurnDone = true;
                    shotAI();
                } else { //ship was hit
                    console.log("we shooting");
                    if (!tile.getShip().isAlive()) {
                        player2Board.shipPlaced--;
                        if (player2Board.shipPlaced <= 0) {
                            console.log("victory");
                        }
                    }
                    //points counting
                }
            }
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
    if (horizontal) {
        $("#orientationText").text('horizontal');
    } else {
        $("#orientationText").text('vertical');
    }
   
    
});

$("#startGame").click(function (event) {
    if (shipPlacing <= 0) {
        placeAIShips();
        hasGameStarted = true;
    }
    

});
function placeAIShips():void {
    
    let placed:number = 0;
    for (let type: number = 1; type < shipTypes.length + 1; type++) {
        console.log("placing now type " + type + "times " + shipTypes[type - 1]);
        while (shipTypes[type - 1] > placed) {
            console.log("placed value: " + placed);
            let x: number = Math.floor(Math.random() * (boardSize - 1 + 1)) + 1;
            let y: number = Math.floor(Math.random() * (boardSize - 1 + 1)) + 1;
            let horizontal:boolean = Math.random() < 0.5;
            if (player2Board.placeShip(new Ship(type, horizontal), x, y, horizontal)) {
                placed++;
            }
        }
        placed = 0;
    }
}

function shotAI(): void {
    while (isTurnDone) {
        let x: number = Math.floor(Math.random() * (boardSize - 1 + 1)) + 1;
        let y: number = Math.floor(Math.random() * (boardSize - 1 + 1)) + 1;
        let w: Tile = player1Board.getTile(x, y);
        if (!w.wasShot) {
            if (!w.shoot()) {
                isTurnDone = false;
            } else {
                if (!w.getShip().isAlive()) {
                    player1Board.shipPlaced--;
                    if (player1Board.shipPlaced <= 0) {
                        console.log("victory");
                    }
                }
            }
        }

    }
}


//work in progress
$(".ship-placing-container").on('click', ".choose-tile", function (event) {
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


//deselecting choosen ship
$(".ship-placing-container").on('click', ".choosen-tile", function () {
    $(".choosen-tile").removeClass("choosen-tile").addClass("choose-tile");
    typeOfShipSelected = -1;
});

