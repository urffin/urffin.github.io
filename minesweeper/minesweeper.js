function Cell() {
    this.isOpen = false;
    this.value = 0;
    this.hasBomb = false;
}
Cell.prototype.trySetBomb = function () {
    if (!this.hasBomb) {
        this.hasBomb = 'b';
        return true;
    }
    return false;
}
Cell.prototype.incBombAround = function () {
    if (!this.hasBomb) {
        this.value += 1;
    }
}
Cell.prototype.renderCell = function ( row, col) {
    var cell = this;
    var cellElement = document.createElement('span');
    cellElement.className = 'cell closed';
    cellElement.addEventListener('click', function handler() {
        this.classList.remove('closed');
        this.classList.add('opened');
        this.textContent = cell.value;
        this.removeEventListener('click', handler);
    });
    return cellElement;
}
function Game(rows, cols, bombs) {
    this.rows = rows;
    this.cols = cols;
    this.bombs = bombs;
    this.cells = this.createCells(rows, cols);
    this.setBombs(bombs);
}
Game.prototype.createCells = function (rows, cols) {
    var cells = [];
    for (var i = 0; i < rows; i++) {
        cells[i] = [];
        for (var j = 0; j < cols; j++) {
            cells[i][j] = new Cell();
        }
    }
    return cells;
}
Game.prototype.getRelevant = function* getRelevant(row, col) {
    for (var i = -1; i <= 1; i++)
        for (var j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) continue;
            if (row + i < 0 || row + i >= this.rows ||
                col + j < 0 || col + j >= this.cols) continue;

            yield this.cells[row + i][col + j];
        }
}
Game.prototype.setBombs = function (bombs) {
    var length = this.cols * this.rows;
    while (bombs) {
        var bombIndex = Math.floor(Math.random() * length);
        var col = bombIndex % this.cols;
        var row = (bombIndex - col) / this.cols;
        if (this.cells[row][col].trySetBomb()) {
            bombs--;
            [...this.getRelevant(row, col)].forEach(cell => {
                cell.incBombAround();
            })
        }
    }
}

Game.prototype.render = function () {
    var board = document.createElement('div');
    board.classList.add('board');
    for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
            board.appendChild(this.cells[i][j].renderCell(i, j));
        }
    }
    return board;
}