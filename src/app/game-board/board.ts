import {GameComponent} from './game.component';

export class ConnectFour {
  public board: Array<Array<string>>;
  bottomSlot: number;
  column: Array<string>;
  _game: GameComponent;

  constructor(game: GameComponent) {
    this._game = game;
    this.board = [
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', '']  ];
  }

  isColumnAvailable(columnNumber: number) {
    return this.board[columnNumber][5] === '';
  }

  takeATurn(color: string) {
    this.column = this.board[this._game._columnNumber];
    this.findBottomSlot(this.column);
    this.column[this.bottomSlot] = color;
  }

  findBottomSlot(column: string[]) {
    let bottomSlot;
    for (let i = 0; i < column.length; i++) {
      if (column[i] === '') {
        bottomSlot = i;
        break;
      }
    }
    this.bottomSlot = bottomSlot;
  }

  playerHasWon(columnNumber: number): boolean {
    const column = this.board[columnNumber];
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
      if (this.equalToNextDisk(0)
        && this.equalToNextDisk(1)
        && this.equalToNextDisk(2)) {
        return true;
      }
      else if (this.equalToNextDisk(1)
        && this.equalToNextDisk(2)
        && this.equalToNextDisk(3)) {
        return true;
      }
      else if (this.equalToNextDisk(2)
        && this.equalToNextDisk(3)
        && this.equalToNextDisk(4)) {
        return true;
      }
      else if (this.equalToNextDisk(3)
        && this.equalToNextDisk(4)
        && this.equalToNextDisk(5)) {
        return true;
      } else {
        return false;
      }
  }

  private bottomSlotIsEmpty(currentColumn) {
    return currentColumn[this.bottomSlot] === '';
  }

  private equalToNextDisk(i: number) {
    return this.board[i][this.bottomSlot] === this.board[i + 1][this.bottomSlot] && !this.bottomSlotIsEmpty(this.board[i]);
  }
  countDiagonalDisks() {
    if (!this.slotIsEmpty(0, 0) &&
        this.equalToDiagonalDisk(0, 0) &&
        this.equalToDiagonalDisk(1, 1) &&
        this.equalToDiagonalDisk(2, 2)
        ) {
      return true;
    }
    return false;
  }

  private equalToDiagonalDisk(indexX: number, indexY: number ) {
    return this.board[indexX][indexY] === this.board[indexX + 1][indexY + 1];
  }

  private slotIsEmpty(indexX: number, indexY: number) {
    return this.board[indexX][indexY] === '';
  }
}

