var Board = /** @class */ (function () {
    function Board(boardSize, shipTypes, AIboard, playerName, playerID) {
        this.boardSize = boardSize;
        this.shipTypes = [];
        for (var i_1 = 0; i_1 < 5; i_1++) {
            this.shipTypes[i_1] = shipTypes[i_1];
        }
        this.shipPlaced = 0;
        this.AIboard = AIboard;
        this.playerName = playerName;
        this.playerID = playerID;
        this.tiles = [];
        for (var i = 1; i < boardSize + 1; i++) {
            this.tiles[i] = [];
            for (var j = 1; j < boardSize + 1; j++) {
                this.tiles[i][j] = new Tile(i, j, this);
            }
        }
    }
    //TODO css class handling, basics are done, make it nicer
    Board.prototype.placeShip = function (ship, x, y, horizontal) {
        if (this.isValidTile(x, y) && this.canPlaceShip(ship, x, y, horizontal)) {
            var shipLenght = ship.getShipType();
            if (horizontal) {
                //place ships to the right of the mouse
                for (var i = x; i < x + shipLenght; i++) {
                    this.tiles[i][y].setShip(ship);
                    if (!this.AIboard) {
                        //change classes to change looks with Jquery :)
                        $("table[ data-player-number = '" + this.playerID + "'] > tbody > tr >th[data-x =" + i + "][data-y = " + y + "]").addClass("ship-placed");
                    }
                }
            }
            else {
                //place ships downwards from the mosue
                for (var i = y; i < y + shipLenght; i++) {
                    this.tiles[x][i].setShip(ship);
                    if (!this.AIboard) {
                        //change classes to change looks with Jquery :)
                        $("table[ data-player-number = '" + this.playerID + "'] > tbody > tr >  th[data-x =" + x + "][data-y = " + i + "]").addClass("ship-placed");
                    }
                }
            }
            this.shipTypes[shipLenght - 1]--; // decreasing the number of certain ship placed
            this.shipPlaced++; //increasing number of already placed ships
            return true;
        }
        return false;
    };
    Board.prototype.canPlaceShip = function (ship, x, y, horizontal) {
        //checkinf if ship can be placed
        if (horizontal) {
            for (var i = x; i < x + ship.getShipType(); i++) {
                if (!this.isValidTile(i, y))
                    return false;
                if (this.tiles[i][y].getShip() != null)
                    return false;
                if (!this.areNeighborsFree(i, y))
                    return false;
            }
        }
        else {
            for (var i = y; i < y + ship.getShipType(); i++) {
                if (!this.isValidTile(x, i))
                    return false;
                if (this.tiles[x][i].getShip() != null)
                    return false;
                if (!this.areNeighborsFree(x, i))
                    return false;
            }
        }
        return true;
    };
    Board.prototype.isValidTile = function (x, y) {
        return x >= 1 && x <= this.boardSize && y >= 1 && y <= this.boardSize;
    };
    Board.prototype.areNeighborsFree = function (x, y) {
        if (this.isValidTile(x + 1, y)) {
            if (this.getTile(x + 1, y).getShip() != null)
                return false;
        }
        if (this.isValidTile(x - 1, y)) {
            if (this.getTile(x - 1, y).getShip() != null)
                return false;
        }
        if (this.isValidTile(x, y + 1)) {
            if (this.getTile(x, y + 1).getShip() != null)
                return false;
        }
        if (this.isValidTile(x, y - 1)) {
            if (this.getTile(x, y - 1).getShip() != null)
                return false;
        }
        return true;
    };
    Board.prototype.unplaceShip = function (x, y) {
        var startingTile = this.tiles[x][y];
        var lenght = startingTile.getShip().getShipType();
        var horizontal = startingTile.getShip().isHorizontal();
        var startingX = x;
        var startingY = y;
        if (horizontal) {
            var currentTile = startingTile;
            while (currentTile.getShip() != null) {
                $("table[ data-player-number = '" + this.playerID + "'] > tbody > tr >th[data-x =" + x + "][data-y = " + y + "]").removeClass("ship-placed");
                currentTile.setShip(null);
                if (this.isValidTile(++x, y))
                    currentTile = this.tiles[x][y];
            }
            x = startingX;
            if (this.isValidTile(--x, y)) {
                currentTile = this.tiles[x][y];
                while (currentTile.getShip() != null) {
                    $("table[ data-player-number = '" + this.playerID + "'] > tbody > tr >th[data-x =" + x + "][data-y = " + y + "]").removeClass("ship-placed");
                    currentTile.setShip(null);
                    if (this.isValidTile(--x, y))
                        currentTile = this.tiles[x][y];
                }
            }
        }
        else {
            var currentTile = startingTile;
            while (currentTile.getShip() != null) {
                $("table[ data-player-number = '" + this.playerID + "'] > tbody > tr >th[data-x =" + x + "][data-y = " + y + "]").removeClass("ship-placed");
                currentTile.setShip(null);
                if (this.isValidTile(x, ++y))
                    currentTile = this.tiles[x][y];
            }
            y = startingY;
            if (this.isValidTile(x, --y)) {
                currentTile = this.tiles[x][y];
                while (currentTile.getShip() != null) {
                    $("table[ data-player-number = '" + this.playerID + "'] > tbody > tr >th[data-x =" + x + "][data-y = " + y + "]").removeClass("ship-placed");
                    currentTile.setShip(null);
                    if (this.isValidTile(x, --y))
                        currentTile = this.tiles[x][y];
                }
            }
        }
        this.shipPlaced--; // decreasing number of placed ship
        this.shipTypes[lenght - 1]++; // increasing number of possible ships of this type
        return lenght;
    };
    Board.prototype.getShipCount = function (shipType) {
        return this.shipTypes[shipType - 1];
    };
    Board.prototype.getTile = function (x, y) {
        if (this.isValidTile(x, y)) {
            return this.tiles[x][y];
        }
        else {
            return null;
        }
    };
    return Board;
}());
;
var Tile = /** @class */ (function () {
    function Tile(x, y, board) {
        this.x = x;
        this.y = y;
        this.board = board;
        this.ship = null;
        this.wasShot = false;
    }
    Tile.prototype.shoot = function () {
        //TODO getting handle of tile on screen and changing it accordingly
        this.wasShot = true;
        if (this.ship != null) {
            //change classes to fill tile
            $("table[ data-player-number = '" + this.board.playerID + "'] > tbody > tr >th[data-x =" + this.x + "][data-y = " + this.y + "]").removeClass("ship-placed").addClass("ship-hit");
            this.ship.hit();
            return true;
        }
        else {
            //change classes to fill tile
            $("table[ data-player-number = '" + this.board.playerID + "'] > tbody > tr >th[data-x =" + this.x + "][data-y = " + this.y + "]").addClass("water-hit");
            return false;
        }
    };
    Tile.prototype.getBoard = function () {
        return this.board;
    };
    Tile.prototype.getShip = function () {
        return this.ship;
    };
    Tile.prototype.setShip = function (ship) {
        this.ship = ship;
    };
    return Tile;
}());
var Ship = /** @class */ (function () {
    function Ship(shipType, horizontal) {
        this.shipType = shipType;
        this.horizontal = horizontal;
        this.shipHp = shipType;
    }
    Ship.prototype.getShipType = function () {
        return this.shipType;
    };
    Ship.prototype.hit = function () {
        this.shipHp--;
    };
    Ship.prototype.isAlive = function () {
        return this.shipHp > 0;
    };
    Ship.prototype.isHorizontal = function () {
        return this.horizontal;
    };
    return Ship;
}());
/// <reference path="./Board.ts" />
//player1 player2;
$(document).ready(function () {
    var element = $("table[data-player-number = 0]");
    boardSize = parseInt($(element).attr("data-board-size"));
    shipTypes = [];
    shipsToPlace = 0;
    for (var i = 0; i < 5; i++) {
        shipTypes[i] = parseInt($($("span[data-type = 'Label-ship." + i + "']")).attr("data-amount"));
        console.log(shipTypes[i]);
        shipsToPlace += shipTypes[i];
    }
    horizontal = true;
    hasGameStarted = false;
    shipPlacing = 1;
    typeOfShipSelected = -1;
    isTurnDone = false;
    player1Board = new Board(boardSize, shipTypes, false, "Player", 0);
    player2Board = new Board(boardSize, shipTypes, true, "Player2", 1);
});
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
            }
            else {
                if (player1Board.getTile(x, y).getShip() != null) {
                    console.log("unship tile");
                    var deletedShip = player1Board.unplaceShip(x, y);
                    var menuTile = $("th[data-type = " + (deletedShip - 1) + "]");
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
    }
    else {
        if (parseInt(clickedBoard.attr("data-player-number")) == 1 && $(waterTile).attr("data-x") != undefined && $(waterTile).attr("data-y") != undefined) {
            var x = parseInt($(waterTile).attr("data-x"));
            var y = parseInt($(waterTile).attr("data-y"));
            var tile = player2Board.getTile(x, y);
            console.log("trying to shoot");
            if (!tile.wasShot && !isTurnDone) {
                //ship wasnt hit
                if (!tile.shoot()) {
                    isTurnDone = true;
                    shotAI();
                }
                else { //ship was hit
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
function updateMenu() {
    if (player1Board.getShipCount(typeOfShipSelected) > 0) {
        $(".choosen-tile").removeClass("choosen-tile").addClass("choose-tile");
    }
    else {
        $(".choosen-tile").attr("data-disabled", "True");
        $(".choosen-tile").removeClass("choosen-tile").addClass("disabled-choose-tile");
    }
    $("span[data-type='Label-ship." + (typeOfShipSelected - 1) + "']").text(player1Board.getShipCount(typeOfShipSelected) + "x");
}
$("#orientationButton").click(function (event) {
    horizontal = !horizontal;
    if (horizontal) {
        $("#orientationText").text('horizontal');
    }
    else {
        $("#orientationText").text('vertical');
    }
});
$("#startGame").click(function (event) {
    if (shipPlacing <= 0) {
        placeAIShips();
        hasGameStarted = true;
    }
});
function placeAIShips() {
    var placed = 0;
    for (var type = 1; type < shipTypes.length + 1; type++) {
        console.log("placing now type " + type + "times " + shipTypes[type - 1]);
        while (shipTypes[type - 1] > placed) {
            console.log("placed value: " + placed);
            var x = Math.floor(Math.random() * (boardSize - 1 + 1)) + 1;
            var y = Math.floor(Math.random() * (boardSize - 1 + 1)) + 1;
            var horizontal_1 = Math.random() < 0.5;
            if (player2Board.placeShip(new Ship(type, horizontal_1), x, y, horizontal_1)) {
                placed++;
            }
        }
        placed = 0;
    }
}
function shotAI() {
    while (isTurnDone) {
        var x = Math.floor(Math.random() * (boardSize - 1 + 1)) + 1;
        var y = Math.floor(Math.random() * (boardSize - 1 + 1)) + 1;
        var w = player1Board.getTile(x, y);
        if (!w.wasShot) {
            if (!w.shoot()) {
                isTurnDone = false;
            }
            else {
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
//# sourceMappingURL=MainGame.js.map