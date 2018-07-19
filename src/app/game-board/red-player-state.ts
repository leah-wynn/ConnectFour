import {GameComponent} from './game.component';
import {IState} from './state';

export class RedPlayerTurn extends IState {
  diskColor = 'red';
  player = 'red player';
  _game: GameComponent;
  bottomSlot: any;
  constructor(gameBoard: GameComponent) {
    super();
    this._game = gameBoard;
  }
  dropADisk() {
    const column = this._game._connectFour.board[this._game._columnNumber];
    this.bottomSlot = this.findBottomSlot(column);
    this._game.setDiskColor();
    this._game.setBottomSlot();
    this._game.setBlackPlayerState();
    this.dropDisk(column);
  }

  dropDisk(column) {
    column[this._game._bottomSlot] = this.diskColor;
  }

  findWinningPlayer() {

  }

  private findBottomSlot(column) {
    let bottomSlot;
    for (let i = 0; i < column.length; i++) {
      if (column[i] === '') {
        bottomSlot = i;
        break;
      }
    }
    return bottomSlot;
  }
}
