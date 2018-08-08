export class BoardWinnerGrader {
  private readonly _board: Array<Array<string>>;
  private readonly _bottomSlot: number;
  constructor(board: Array<Array<string>>, bottomSlot: number) {
    this._board = board;
    this._bottomSlot = bottomSlot;
  }
  isBoardWon(columnNumber) {
    const column = this._board[columnNumber];
    const fourVerticalDisks = this.countVerticalDisks(column);
    const fourHorizontalDisks = this.countHorizontalDisks();
    const fourDiagonalDisks = this.countDiagonalDisks();
    return fourHorizontalDisks || fourVerticalDisks || fourDiagonalDisks;
  }

  countVerticalDisks(column): boolean {
    let diskCount = 1;
    column.forEach((currentSlot, index) => {
      if (currentSlot === column[index + 1] && currentSlot !== '') {
        diskCount += 1;
      }
    });
    return diskCount === 4;
  }

  countHorizontalDisks() {
    return this.fourHorizontalDisksInARow(0) ||
           this.fourHorizontalDisksInARow(1) ||
           this.fourHorizontalDisksInARow(2) ||
           this.fourHorizontalDisksInARow(3);
  }

  private fourHorizontalDisksInARow(i) {
    return this.equalToNextDisk(i)
      && this.equalToNextDisk(i + 1)
      && this.equalToNextDisk(i + 2);
  }

  private equalToNextDisk(i: number) {
    return this._board[i][this._bottomSlot] === this._board[i + 1][this._bottomSlot] && !this.bottomSlotIsEmpty(this._board[i]);
  }

  private bottomSlotIsEmpty(currentColumn) {
    return currentColumn[this._bottomSlot] === '';
  }

  countDiagonalDisks() {
    if (this.countRightDiagonalDisksOnBoard()) {
      return true;
    } else { return this.countLeftDiagonalDisksOnBoard(); }
  }

  countRightDiagonalDisksOnBoard() {
    let diskCount = 0;
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 6; y++) {
        if (this.findFourRightDiagonalDisksInARow(x, y)) {
          diskCount = 4;
          break;
        }
      }
    }
    return diskCount === 4;
  }


  private findFourRightDiagonalDisksInARow(x: number, y: number) {
    return !this.slotIsEmpty(x, y) &&
      this.isEqualToRightDiagonalDisk(x, y) &&
      this.isEqualToRightDiagonalDisk(x + 1, y + 1) &&
      this.isEqualToRightDiagonalDisk(x + 2, y + 2);
  }

  private isEqualToRightDiagonalDisk(x, y) {
    return this._board[x][y] === this._board[x + 1][y + 1];
  }

  countLeftDiagonalDisksOnBoard() {
    let diskCount = 0;
    for (let x = 6; x > 2; x-- ) {
      for (let y = 0; y < 6; y++) {
        if (this.findFourLeftDiagonalDisksInARow(x, y)) {
          diskCount = 4;
          break;
        }
      }
    }
    return diskCount === 4;
  }

  private findFourLeftDiagonalDisksInARow(x: number, y: number) {
    return !this.slotIsEmpty(x, y) &&
      this.isEqualToLeftDiagonalDisk(x, y) &&
      this.isEqualToLeftDiagonalDisk(x - 1, y + 1) &&
      this.isEqualToLeftDiagonalDisk(x - 2, y + 2);
  }

  private isEqualToLeftDiagonalDisk(x, y) {
    return this._board[x][y] === this._board[x - 1][y + 1];
  }

  private slotIsEmpty(indexX: number, indexY: number) {
    return this._board[indexX][indexY] === '';
  }

}
