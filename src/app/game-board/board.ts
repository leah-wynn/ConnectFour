import {GameComponent} from './game.component';
import {BoardWinnerGrader} from './board-winner-grader';

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

  dropTheDisk(color: string, columnNumber: number) {
    this.column = this.board[columnNumber];
    this.bottomSlot = this.findBottomSlot(this.column);
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
    return bottomSlot;
  }

  playerHasWon(columnNumber: number): boolean {
    const grader = new BoardWinnerGrader(this.board, this.bottomSlot);
    return grader.isBoardWon(columnNumber);
  }
  resetBoard() {
    this.board = [
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', '']  ];
  }
}

