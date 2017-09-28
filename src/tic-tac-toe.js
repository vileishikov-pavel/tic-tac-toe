class TicTacToe {
    constructor() {        
        this.gameState = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.gameFinished = false;
        this.gameDraw = false;
        this.currentSymbol = 'x';
        this.gameWinner = null;
    }

    getCurrentPlayerSymbol() {
        return this.currentSymbol;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.isFinished() || this.gameState[rowIndex][columnIndex]) {
            return;
        }
        
        this.gameState[rowIndex][columnIndex] = this.currentSymbol;
        this.currentSymbol = this.currentSymbol === 'x' ? 'o' : 'x';
        this._check();

        if (this.noMoreTurns()) {
            this.gameFinished = true;            
        }
    }

    isFinished() {
        return this.gameFinished;
    }

    getWinner() {
        return this.gameWinner;
    }

    noMoreTurns() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!this.gameState[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }
    
    _check() {
        var hasNull = false;
        var check = [];
        var row = [];

        check = check.concat(this.gameState);
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!this.gameState[i][j]) {
                    hasNull = true;
                }                    
                row.push(this.gameState[j][i]);
            }
            check.push(row);
            row = [];
        }

        for (let k = 0; k < 3; k++) {
            row.push(this.gameState[k][k]);
        }

        check.push(row);
        row = [];

        for (let m = 0; m < 3; m++) {
            row.push(this.gameState[m][2-m]);
        }
        check.push(row);
        row = [];        

        check.forEach((val) => {
            var res = val.join('');            
            if (res === 'ooo') { 
                this.gameWinner = 'o';
                this.gameFinished = true;
            } else if (res === 'xxx') {
                this.gameWinner = 'x';
                this.gameFinished = true;
            }
        });
        
        if (!hasNull) {
            if (!this.gameWinner) {
                this.gameDraw = true;
            }
            this.gameFinished = true;
        }
    }

    isDraw() {
        return this.gameDraw;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.gameState[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;
