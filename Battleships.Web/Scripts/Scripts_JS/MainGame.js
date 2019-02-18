var Board = /** @class */ (function () {
    function Board(boardSize, shipTypes, AIboard, playerName) {
        this.boardSize = boardSize;
        this.shipTypes = shipTypes;
        this.shipPlaced = 0;
        this.AIboard = AIboard;
        this.playerName = playerName;
        this.tiles = [];
        for (var i = 1; i < boardSize + 1; i++) {
            this.tiles[i] = [];
            for (var j = 1; j < boardSize + 1; j++) {
                this.tiles[i][j] = new Tile(j, i, this);
            }
        }
    }
    //TODO css class handling
    Board.prototype.placeShip = function (ship, x, y, horizontal) {
        console.log(x);
        if (this.canPlaceShip(ship, x, y, horizontal)) {
            var shipLenght = ship.getShipType();
            if (horizontal) {
                //place ships to the right of the mouse
                for (var i = x; i < x + shipLenght; i++) {
                    this.tiles[i][y].setShip(ship);
                    if (!this.AIboard) {
                        //change classes to change looks with Jquery :)
                        console.log("th[data-x =" + i + "][data-y = " + y + "]");
                        $("th[data-x =" + i + "][data-y = " + y + "]").addClass("ship-placed");
                    }
                }
            }
            else {
                //place ships downwards from the mosue
                for (var i = y; i < y + shipLenght; i++) {
                    this.tiles[x][i].setShip(ship);
                    if (!this.AIboard) {
                        //change classes to change looks with Jquery :)
                    }
                }
            }
            this.shipTypes[shipLenght - 1]--; // decreasing the number of certain ship placed
            this.shipPlaced++; //increasing number of already placed ships
            return true;
        }
        return false;
    };
    //TODO this function
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
                if (this.tiles[i][y].getShip() != null)
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
            this.ship.hit();
            return true;
        }
        else {
            //change classes to fill tile
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
$(document).ready(function () {
    board = new Board(10, [1, 1, 1, 1, 1], false, "Player");
});
$(".tile").click(function (event) {
    var element = event.target;
    var x = parseInt($(element).attr("data-x"));
    var y = parseInt($(element).attr("data-y"));
    board.placeShip(new Ship(3, true), x, y, true);
});
//# sourceMappingURL=MainGame.js.map