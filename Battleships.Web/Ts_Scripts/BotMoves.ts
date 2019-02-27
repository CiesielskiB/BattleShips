class BotMoves {
    private currentX: number;
    private currentY: number;
    private shipOrientation: number; // -1 - uknown, 0 - horizontal, 1 - vertical

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
            this.currentX = x;
            this.currentY = y;
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
                if (this.currentX - x != 0) this.shipOrientation = 0;
                if (this.currentY - y != 0) this.shipOrientation = 1;
            }
        }
    }

    public shipDestroyed() {
        this.firstHitX = -1;
        this.firstHitY = -1;
        this.currentX = -1;
        this.currentY = -1;
        this.shipOrientation = -1;
        this.isShipHit = false;
    }

    public calculateNextMove(): void {
        let validMove: boolean = false;
        let x:number;
        let y:number;
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
                let randomDirection: boolean = Math.random() < 0.5;
                if (randomDirection) {
                    // random shot in a while
                } else {
                    //
                }
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