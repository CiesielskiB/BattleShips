/// <reference path="./Board.ts" />

declare var player1Board: Board;
declare var enemyBoard: Board;
declare var isTurnDone: boolean;
declare var hasGameStarted: boolean;
declare var shipPlacing: number;
declare var shipsToPlace: number;
declare var typeOfShipSelected: number;
declare var shipTypes: number[];
declare var horizontal: boolean;
declare var winnerIs: number;
declare var boardSize: number;
declare var isBotGame: boolean;
declare var ShipAI: BotMoves;
//player1 player2;

$(document).ready(() => {
    let element = $("table[data-player-number = 0]");
    boardSize = parseInt($(element).attr("data-board-size"));
    isBotGame = (($(element).attr("data-bot")) == 'True');
    shipTypes = [];
    shipsToPlace = 0;
    for (let i: number = 0; i < 5; i++) {
        shipTypes[i] = parseInt($($("span[data-type = 'Label-ship." + i + "']")).attr("data-amount"));
        shipsToPlace+= shipTypes[i];
    }
    horizontal = true;
    hasGameStarted = false;
    shipPlacing = isBotGame ? 1 : 2;
    typeOfShipSelected = -1;
    isTurnDone = false;
    winnerIs = -1;
    player1Board = new Board(boardSize, shipTypes, false, "Player",0); // nazwy graczy z dom
    enemyBoard = new Board(boardSize, shipTypes, isBotGame, "Player2", 1);
    ShipAI = new BotMoves(boardSize);
})

$(".BoardsContainter").on('click', ".tile", function (event) {
    var waterTile = event.target;
    var clickedBoard = $(this).parent().parent().parent();
    //ship placing phase
    if (!hasGameStarted && winnerIs <= -1) {
        // checking if tile is valid
        if (parseInt(clickedBoard.attr("data-player-number")) == player1Board.playerID && $(waterTile).attr("data-x") != undefined && $(waterTile).attr("data-y") != undefined) { //checking if the event is triggered by the correct board (players board)
            var x = parseInt($(waterTile).attr("data-x"));
            var y = parseInt($(waterTile).attr("data-y"));
            //placing ships
            if (typeOfShipSelected > 0) {
                if (player1Board.placeShip(new Ship(typeOfShipSelected, horizontal), x, y, horizontal) && x > 0 && y > 0) {
                    updateMenu();
                    typeOfShipSelected = -1;
                    if (shipsToPlace <= player1Board.shipPlaced) {
                        shipPlacing--;
                        if (isBotGame) {
                            $("#startGame").removeAttr("Disabled");
                        } else {
                            $("#endTurn").removeAttr("Disabled");
                        }
                       
                    }
                }
                // deplacing ships
            } else {
                if (player1Board.getTile(x, y).getShip() != null) {
                    if (shipsToPlace >= player1Board.shipPlaced) {
                        shipPlacing++;
                        $("#startGame").attr("disabled", "disabled");
                    }
                    let deletedShip: number = player1Board.unplaceShip(x, y);
                    let menuTile = $("th[data-type = " + (deletedShip - 1) + "]");
                    if ($(menuTile).hasClass("disabled-choose-tile")) {
                        $(menuTile).removeClass("disabled-choose-tile").addClass("choose-tile");
                        $(menuTile).attr("data-disabled", "False");
                    }
                    $("span[data-type='Label-ship." + (deletedShip - 1) + "']").text(player1Board.getShipCount(deletedShip) + "x");
                }
            }
        }
    //shooting phase
    } else {
        if (parseInt(clickedBoard.attr("data-player-number")) == enemyBoard.playerID && $(waterTile).attr("data-x") != undefined && $(waterTile).attr("data-y") != undefined && winnerIs <= -1) {
            var x = parseInt($(waterTile).attr("data-x"));
            var y = parseInt($(waterTile).attr("data-y"));
            let tile: Tile = enemyBoard.getTile(x, y);
            if (!tile.wasShot && !isTurnDone) {
                //ship wasnt hit
                if (!tile.shoot()) {
                } else { //ship was hit
                    if (!tile.getShip().isAlive()) {
                        enemyBoard.shipPlaced--;
                        enemyBoard.destroyShip(x, y);
                        if (enemyBoard.shipPlaced <= 0) {
                            winnerIs = player1Board.playerID;
                            annouceWinner();
                            
                        }
                    }
                    //points counting
                }
                isTurnDone = true;
                if (winnerIs < 0) {
                    if (isBotGame) {
                        shotAI();
                    } else {
                        $("#endTurn").removeAttr("Disabled");
                    }
                    
                }

            }
        }
    }
    
});

function annouceWinner(): void {
    $.ajax({
        url: '/Game/BotGameSave',
        data: { winner: winnerIs }
    }).done(function () {
        alert(winnerIs + " Won");
    });
    let winnerText: string = (winnerIs == player1Board.playerID ? player1Board.playerName : enemyBoard.playerName) + " won this game, GJ";
    $("#Winner").text(winnerText);
    $("#BackToMenu").removeAttr("hidden");
    $("#BackToMenu").addClass("btn btn-success");
    $("#BackToMenu").attr("href", "/Game/");
}

function updateMenu(): void {
    if (player1Board.getShipCount(typeOfShipSelected) > 0) {
        $(".choosen-tile").removeClass("choosen-tile").addClass("choose-tile");
    } else {
        $(".choosen-tile").attr("data-disabled", "True");
        $(".choosen-tile").removeClass("choosen-tile").addClass("disabled-choose-tile");
    }
    $("span[data-type='Label-ship." + (typeOfShipSelected-1) + "']").text(player1Board.getShipCount(typeOfShipSelected) + "x");
}

function resetMenu(): void {
    $(".disabled-choose-tile").attr("data-disabled", "False");
    $(".disabled-choose-tile").removeClass("disabled-choose-tile").addClass("choose-tile");
    for (let i: number = 0; i < 5; i++) {
        $("span[data-type='Label-ship." + i + "']").text(shipTypes[i] + "x");
    }
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
        $(this).attr("disabled", "disabled");
    }
});
$("#endTurn").click(function (event) {
    if (shipPlacing <= 0 && !hasGameStarted) {
        hasGameStarted = true;
        $(".ship-placing-container").toggle("slide");
    }
    isTurnDone = false;
    $(this).attr("disabled", "disabled");
    showTurnScreen();
    if (shipPlacing > 0) {
        resetMenu();
    }       
});

function showTurnScreen(): void {
    $(".BoardsContainter").toggle("slide", function () { switchBoards() });
}

$("#showBoards").click(function (event) {
    $(".ShowBoards").toggle();
    $(".BoardsContainter").toggle("slide");

});


function switchBoards(): void {
    player1Board.hideTiles();
    enemyBoard.hideTiles();
    let leftboard = $("table[data-player-number = " + player1Board.playerID.toString() + "]");
    let rightboard = $("table[data-player-number = " + enemyBoard.playerID.toString() + "]");
    let temp = player1Board;
    player1Board = enemyBoard;
    enemyBoard = temp;
    $(leftboard).attr("data-player-number", player1Board.playerID.toString());
    $(rightboard).attr("data-player-number", enemyBoard.playerID.toString());
    player1Board.showTiles();
    enemyBoard.showShotTiles();
    $(".ShowBoards").toggle("slow");

}


function placeAIShips():void {
    
    let placed:number = 0;
    for (let type: number = 1; type < shipTypes.length + 1; type++) {
        while (shipTypes[type - 1] > placed) {
            let x: number = Math.floor(Math.random() * (boardSize - 1 + 1)) + 1;
            let y: number = Math.floor(Math.random() * (boardSize - 1 + 1)) + 1;
            let horizontal:boolean = Math.random() < 0.5;
            if (enemyBoard.placeShip(new Ship(type, horizontal), x, y, horizontal)) {
                placed++;
            }
        }
        placed = 0;
    }
}

function shotAI(): void {
    while (isTurnDone) {
        ShipAI.calculateNextMove();
        let x = ShipAI.getX();
        let y = ShipAI.getY();
        let w: Tile = player1Board.getTile(x, y);
        if (!w.shoot()) {
            isTurnDone = false;
            ShipAI.markAsMissed(x, y);
        } else {
            ShipAI.markAsHit(x, y);
            isTurnDone = false;
            if (!w.getShip().isAlive()) {
                ShipAI.shipDestroyed();
                player1Board.shipPlaced--;
                player1Board.destroyShip(x, y);
                if (player1Board.shipPlaced <= 0) {
                    winnerIs = enemyBoard.playerID;
                    annouceWinner();
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

