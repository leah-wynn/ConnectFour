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

  countVerticalDisks(column): number {
    let diskCount = 1;
    column.forEach((currentSlot, index) => {
      if (currentSlot === column[index + 1] && currentSlot !== '') {
        diskCount += 1;
      }
    });
    return diskCount;
  }

  countHorizontalDisks(bottomSlot: number) {
    let diskCount = 1;
    for (let i = 0; i < 6; i++) {
      const currentColumn = this.board[i];
      if (currentColumn[bottomSlot] === this.board[i + 1][bottomSlot] && currentColumn[bottomSlot] !== '') {
        diskCount += 1;
      }
    }
    return diskCount;
  }

  takeATurn(color: string) {
    this.column = this.board[this._game._columnNumber];
    this.findBottomSlot(this.column);
    this.column[this.bottomSlot] = color;
    return !this.playerHasWon(this._game._columnNumber, this.bottomSlot);
  }

  playerHasWon(columnNumber: number, bottomSlot: number): boolean {
    const column = this.board[columnNumber];
    const verticalDiskCount = this.countVerticalDisks(column);

    const horizontalDiskCount = this.countHorizontalDisks(bottomSlot);
    return horizontalDiskCount === 4 || verticalDiskCount === 4;
  }
}

