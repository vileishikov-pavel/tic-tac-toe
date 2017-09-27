class TicTacToe {
    constructor() {
        this.currentSymbol = 'x';
        this.gameState = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.gameFinished = false;
        this.gameDraw = false;
        this.gameWinner = null;        
    }

    getCurrentPlayerSymbol() {
        return this.currentSymbol;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.isFinished()) {
            return;
        }

        this.currentSymbol = this.currentSymbol === 'x' ? 'o' : 'x';
        this.gameState[rowIndex][columnIndex] = this.currentSymbol;

        if (this.noMoreTurns()) {
            this.gameFinished = true;
            this._check();
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
        var check = [];
        var row = [];


        check.concat(this.gameState);
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
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
        row = [];

        check.forEach((val) => {
            var res = val.join('');
            if (res === 'ooo') { 
                this.gameWinner = 'o'; 
            } else if (res = 'xxx') {
                this.gameWinner = 'x';
            }
        });
        
        if (!this.gameWinner) {
            this.gameDraw = true;
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
