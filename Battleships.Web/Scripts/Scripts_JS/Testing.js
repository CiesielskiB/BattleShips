"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test = /** @class */ (function () {
    function Test(x, y, hasShip) {
        this.x = x;
        this.y = y;
        this.hasShip = hasShip;
    }
    Test.prototype.DisplayParameters = function () {
        console.log(this.x);
        console.log(this.y);
        console.log(this.hasShip);
    };
    return Test;
}());
exports.Test = Test;
var Board = /** @class */ (function () {
    function Board() {
        this.tiles = [];
        for (var i = 0; i < 10; i++) {
            this.tiles[i] = [];
            for (var j = 0; j < 10; j++) {
                this.tiles[i][j] = new Test(j, i, true);
            }
        }
    }
    return Board;
}());
;
$(document).ready(function () {
    board = new Board();
});
$(".tile").click(function (event) {
    var test = new Board();
    var element = event.target;
    var x = $(element).attr("data-x");
    var y = $(element).attr("data-y");
    test.tiles[x][y].DisplayParameters();
});
//# sourceMappingURL=Testing.js.map