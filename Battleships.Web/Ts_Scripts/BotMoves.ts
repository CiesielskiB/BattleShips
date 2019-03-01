class BotMoves {
    private currentX: number;
    private currentY: number;
    private shipOrientation: number; // -1 - unknown, 0 - horizontal, 1 - vertical;
    private shotDiection: number //-1 - unknown, 0 - right, 1 - left, 2 - up, 3 - down;

    private isShipHit: boolean;
    private firstHitX: number;
    private firstHitY: number;

    private nextMoveX: number;
    private nextMoveY: number;

    private board: number[][]
    private boardSize;

    constructor(boardSize: number) {
        this.boardSize = boardSize;
        this.shipOrientation = -1;
        this.shotDiection = -1;
        this.currentX = -1;
        this.currentY = -1;
        this.isShipHit = false;
        this.firstHitX = -1;
        this.firstHitY = -1;
        this.nextMoveX = -1;
        this.nextMoveY = -1;
        this.board = [];
        for (var i: number = 1; i < this.boardSize + 1; i++) {
            this.board[i] = [];
            for (var j: number = 1; j < this.boardSize + 1; j++) {
                this.board[i][j] = -1;
            }
        }
    }

    public getX():number {
        return this.nextMoveX;
    }
    public getY() {
        return this.nextMoveY;
    }

    public markAsMissed(x: number, y: number) {
        this.board[x][y] = 0;
        if (this.isShipHit) {
            this.currentX = this.firstHitX;
            this.currentY = this.firstHitY;
            if (this.shotDiection > -1) {
                if (this.shotDiection < 2) {
                    this.shotDiection = this.shotDiection == 0 ? 1 : 0;
                } else {
                    this.shotDiection = this.shotDiection == 2 ? 3 : 2;
                }
            }
            
        }

    }

    public markAsHit(x: number, y: number) {
        this.board[x][y] = 1;
        this.isShipHit = true;
        if (this.firstHitX < 0 || this.firstHitY < 0) {
            this.firstHitX = x;
            this.firstHitY = y;
            this.currentX = x;
            this.currentY = y;
        } else {
            if (this.shipOrientation < 0) {
                if (this.firstHitX - x != 0) {
                    this.shipOrientation = 0;
                    this.shotDiection = (this.firstHitX - x) < 0 ? 0 : 1
                } 
                if (this.firstHitY - y != 0) {
                    this.shipOrientation = 1;
                    this.shotDiection = (this.firstHitY - y) < 0 ? 3 : 2
                } 

            }
        }
    }

    public shipDestroyed() {
        this.firstHitX = -1;
        this.firstHitY = -1;
        this.currentX = -1;
        this.currentY = -1;
        this.shipOrientation = -1;
        this.shotDiection = -1;
        this.isShipHit = false;
    }

    public calculateNextMove(): void {
        let validMove: boolean = false;
        let x:number;
        let y: number;
        let moves: number[] = [1, -1, 1, -1];
        if (!this.isShipHit) {
            while (!validMove) {
                x = Math.floor(Math.random() * (this.boardSize - 1 + 1)) + 1;
                y = Math.floor(Math.random() * (this.boardSize - 1 + 1)) + 1;
                if (!this.wasAlreadyShot(x, y) && !this.isShipAdjacent(x, y)) {
                    validMove = true;
                }
            }
        } else {
            if (this.shipOrientation < 0) {
                while (!validMove) {
                    let move = Math.floor(Math.random() * 4);
                    if (move < 2) {
                        if (!this.wasAlreadyShot(this.currentX + moves[move], this.currentY)) {
                            validMove = true;
                            this.currentX += moves[move]
                        }
                    } else {
                        if (!this.wasAlreadyShot(this.currentX, this.currentY + moves[move])) {
                            validMove = true;
                            this.currentY += moves[move];
                        }
                    }
                }
                x = this.currentX;
                y = this.currentY;
            }else if (this.shipOrientation == 0) {
                while (!validMove) {
                    console.log(moves[this.shotDiection]);
                    console.log("direction " + this.shotDiection);
                    if (!this.wasAlreadyShot(this.currentX + moves[this.shotDiection], this.currentY)) {
                        validMove = true;
                        x = this.currentX + moves[this.shotDiection];
                        y = this.currentY;
                        this.currentX += moves[this.shotDiection];
                    } else {
                        console.log("nawrot");
                        this.currentX = this.firstHitX;
                        this.currentY = this.firstHitY;
                        this.shotDiection = this.shotDiection == 0 ? 1 : 0;
                        console.log(this.shotDiection);
                        console.log(this.currentX);
                        console.log(this.currentY);
                    }
                }
            } else if (this.shipOrientation == 1){

            }
        }
        this.nextMoveX = x;
        this.nextMoveY = y;
    }

    private isShipAdjacent(x: number, y: number): boolean {
        if (this.isValidTile(x + 1, y)) {
            if (this.board[x+1][y] == 1) return true;
        }
        if (this.isValidTile(x - 1, y)) {
            if (this.board[x - 1][y] == 1) return true;
        }
        if (this.isValidTile(x, y + 1)) {
            if (this.board[x][y + 1] == 1) return true;
        }
        if (this.isValidTile(x, y - 1)) {
            if (this.board[x][y - 1] == 1) return true;
        }
        return false;
    }

    private isValidTile(x: number, y: number): boolean {
        return x >= 1 && x <= this.boardSize && y >= 1 && y <= this.boardSize;
    }

    private wasAlreadyShot(x: number, y: number):boolean {
        return this.board[x][y] != -1
    }
}