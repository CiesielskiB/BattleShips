
class Board {
    private tiles: Tile[][];
    private shipTypes: number[];
    private AIboard: boolean;
    private boardSize: number;

    public playerName: string;
    public shipPlaced: number;

    constructor(boardSize: number, shipTypes: number[], AIboard: boolean, playerName: string) {
        this.boardSize = boardSize;
        this.shipTypes = shipTypes;
        this.shipPlaced = 0;
        this.AIboard = AIboard;
        this.playerName = playerName;
        this.tiles = [];
        for (var i: number = 1; i < boardSize+1; i++) {
            this.tiles[i] = [];
            for (var j: number = 1; j < boardSize+1; j++) {
                this.tiles[i][j] = new Tile(j, i, this);
            }
        }
    }

    //TODO css class handling
    public placeShip(ship: Ship, x: number, y: number, horizontal: boolean):boolean {
        if (this.canPlaceShip(ship, x, y, horizontal)) {
            var shipLenght: number = ship.getShipType();
            if (horizontal) {
                //place ships to the right of the mouse
                for (var i: number = x; i < x + shipLenght; i++) {
                    this.tiles[i][y].setShip(ship);
                    if (!this.AIboard) {
                        //change classes to change looks with Jquery :)
                    }
                }
            } else {
                //place ships downwards from the mosue
                for (var i: number = y; i < y + shipLenght; i++) {
                    this.tiles[x][i].setShip(ship);
                    if (!this.AIboard) {
                        //change classes to change looks with Jquery :)
                    }
                }
            }
            this.shipTypes[shipLenght - 1]--; // decreasing the number of certain ship placed
            this.shipPlaced++;//increasing number of already placed ships
            return true;
        }
        return false;
    }

    //TODO this function
    private canPlaceShip(ship: Ship, x: number, y: number, horizontal: boolean): boolean {

    }

    private isValidTile(x: number, y: number): boolean {
        return x >= 1 && x <= this.boardSize && y >= 1 && y <= this.boardSize;
    }

    private areNeighborsFree(x: number, y: number): boolean {
        if (this.isValidTile(x + 1, y)) {
            if (this.getTile(x + 1, y).getShip() != null) return false;
        }
        if (this.isValidTile(x - 1, y)) {
            if (this.getTile(x - 1, y).getShip() != null) return false;
        }
        if (this.isValidTile(x, y + 1)) {
            if (this.getTile(x, y + 1).getShip() != null) return false;
        }
        if (this.isValidTile(x, y - 1)) {
            if (this.getTile(x, y - 1).getShip() != null) return false;
        }
        return true;
    }

    public getShipCount(shipType: number): number {
        return this.shipTypes[shipType - 1];
    }

    public getTile(x: number, y: number): Tile{
        if (this.isValidTile(x, y)) {
            return this.tiles[x][y];
        } else {
            return null;
        }
    }

};

class Tile {
    x: number;
    y: number;
    wasShot: boolean;
    private board: Board;
    private ship: Ship;

    constructor(x: number, y: number, board:Board) {
        this.x = x;
        this.y = y;
        this.board = board;
        this.ship = null;
        this.wasShot = false;
    }

    public shoot(): boolean {
        //TODO getting handle of tile on screen and changing it accordingly
        this.wasShot = true;
        if (this.ship != null) {
            //change classes to fill tile
            this.ship.hit();
            return true;
        } else {
            //change classes to fill tile
            return false;
        }
    }

    public getBoard(): Board {
        return this.board;
    }

    public getShip(): Ship {
        return this.ship;
    }

    public setShip(ship: Ship): void {
        this.ship = ship;
    }

}

class Ship {
    private shipType: number;
    private shipHp: number;
    private horizontal: boolean;

    constructor(shipType: number, horizontal: boolean) {
        this.shipType = shipType;
        this.horizontal = horizontal;
        this.shipHp = shipType;
    }

    public getShipType(): number {
        return this.shipType;
    }

    public hit(): void {
        this.shipHp--;
    }

    public isAlive(): boolean{
        return this.shipHp > 0;
    }

    public isHorizontal(): boolean {
        return this.horizontal;
    }
}