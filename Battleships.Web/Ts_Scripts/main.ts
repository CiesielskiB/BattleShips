/// <reference path="./Board.ts" />

declare var board: Board;

$(document).ready(() => {
    board = new Board(10, [1, 1, 1, 1, 1], false, "Player");
})

$(".tile").click(function (event) {
    var element = event.target;
    var x = parseInt($(element).attr("data-x"));
    var y = parseInt($(element).attr("data-y"));
    board.placeShip(new Ship(3, true), x, y, true);
});