
class Board {
    private tiles: Tile[][];
    private shipTypes: number[];
    private AIboard: boolean;
    private boardSize: number;

    public playerName: string;
    public shipPlaced: number;
    public playerID: number;

    constructor(boardSize: number, shipTypes: number[], AIboard: boolean, playerName: string, playerID:number) {
        this.boardSize = boardSize;
        this.shipTypes = [];
        for (let i = 0; i < 5; i++) {
            this.shipTypes[i] = shipTypes[i];
        }
        
        this.shipPlaced = 0;
        this.AIboard = AIboard;
        this.playerName = playerName;
        this.playerID = playerID;
        this.tiles = [];
        for (var i: number = 1; i < boardSize+1; i++) {
            this.tiles[i] = [];
            for (var j: number = 1; j < boardSize+1; j++) {
                this.tiles[i][j] = new Tile(i, j, this);
            }
        }
    }

    //TODO css class handling, basics are done, make it nicer
    public placeShip(ship: Ship, x: number, y: number, horizontal: boolean): boolean {
        if (this.isValidTile(x,y) && this.canPlaceShip(ship, x, y, horizontal)) {
            var shipLenght: number = ship.getShipType();
            if (horizontal) {
                //place ships to the right of the mouse
                for (var i: number = x; i < x + shipLenght; i++) {
                    this.tiles[i][y].setShip(ship);
                    ship.addPositions(i, y);
                    if (!this.AIboard) {
                        $("table[ data-player-number = '"+ this.playerID + "'] > tbody > tr >th[data-x =" + i + "][data-y = " + y + "]").addClass("ship-placed");
                    }
                }
            } else {
                //place ships downwards from the mosue
                for (var i: number = y; i < y + shipLenght; i++) {
                    this.tiles[x][i].setShip(ship);
                    ship.addPositions(x, i);
                    if (!this.AIboard) {
                         $("table[ data-player-number = '"+ this.playerID + "'] > tbody > tr >  th[data-x =" + x + "][data-y = " + i + "]").addClass("ship-placed");
                    }
                }
            }
            this.shipTypes[shipLenght - 1]--; // decreasing the number of certain ship placed
            this.shipPlaced++;//increasing number of already placed ships
            return true;
        }
        return false;
    }

    private canPlaceShip(ship: Ship, x: number, y: number, horizontal: boolean): boolean {
        //checkinf if ship can be placed
        if (horizontal) {
            for (var i: number = x; i < x + ship.getShipType(); i++) {
                if (!this.isValidTile(i, y)) return false;
                if (this.tiles[i][y].getShip() != null) return false;
                if (!this.areNeighborsFree(i, y)) return false;
            }
        } else {
            for (var i: number = y; i < y + ship.getShipType(); i++) {
                if (!this.isValidTile(x, i)) return false;
                if (this.tiles[x][i].getShip() != null) return false;
                if (!this.areNeighborsFree(x, i)) return false;
            }
        }
        return true;
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

    public unplaceShip(x: number, y: number): number {

        let startingTile: Tile = this.tiles[x][y];
        let lenght: number = startingTile.getShip().getShipType();
        let horizontal: boolean = startingTile.getShip().isHorizontal();
        let startingX = startingTile.getShip().getFirstX();
        let startingY = startingTile.getShip().getFirstY();
        if (horizontal) {
            for (let i: number = startingX; i < startingX + lenght; i++) {
                this.tiles[i][startingY].setShip(null);
                $("table[ data-player-number = '" + this.playerID + "'] > tbody > tr >th[data-x =" + i + "][data-y = " + startingY + "]").removeClass("ship-placed");
            }
        }else {
            for (let i: number = startingY; i < startingY + lenght; i++) {
                this.tiles[startingX][i].setShip(null);
                $("table[ data-player-number = '" + this.playerID + "'] > tbody > tr >th[data-x =" + startingX + "][data-y = " + i + "]").removeClass("ship-placed");
            }
        }
        this.shipPlaced--; // decreasing number of placed ship
        this.shipTypes[lenght - 1]++; // increasing number of possible ships of this type
        return lenght;
    }

    public destroyShip(x: number, y: number): void {
        let startingTile: Tile = this.tiles[x][y];
        let lenght: number = startingTile.getShip().getShipType();
        let horizontal: boolean = startingTile.getShip().isHorizontal();
        let startingX = startingTile.getShip().getFirstX();
        let startingY = startingTile.getShip().getFirstY();
        if (horizontal) {
            for (let i: number = startingX; i < startingX + lenght; i++) {
                $("table[ data-player-number = '" + this.playerID + "'] > tbody > tr >th[data-x =" + i + "][data-y = " + startingY + "]").addClass("ship-destroyed");
            }
        } else {
            for (let i: number = startingY; i < startingY + lenght; i++) {
                $("table[ data-player-number = '" + this.playerID + "'] > tbody > tr >th[data-x =" + startingX + "][data-y = " + i + "]").addClass("ship-destroyed");
            }
        }
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
            $("table[ data-player-number = '" + this.board.playerID + "'] > tbody > tr >th[data-x =" + this.x + "][data-y = " + this.y + "]").removeClass("ship-placed").addClass("ship-hit");
            this.ship.hit();
            return true;
        } else {
            //change classes to fill tile
            $("table[ data-player-number = '" + this.board.playerID + "'] > tbody > tr >th[data-x =" + this.x + "][data-y = " + this.y + "]").addClass("water-hit");
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
    private xPositions: number[];
    private yPositions: number[];


    constructor(shipType: number, horizontal: boolean) {
        this.shipType = shipType;
        this.horizontal = horizontal;
        this.shipHp = shipType;
        this.xPositions = [];
        this.yPositions = [];
    }

    public addPositions(x: number, y: number) {
        this.xPositions.push(x);
        this.yPositions.push(y);
    }

    public getFirstX() {
        return this.xPositions[0];
    }

    public getFirstY() {
        return this.yPositions[0];
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