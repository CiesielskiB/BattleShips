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
//# sourceMappingURL=TestClass.js.map