import {GameComponent} from './game.component';
import {IState} from './state';
import {ConnectFour} from './board';

export class RedPlayerTurn extends IState {
  diskColor = 'red';
  displayText = 'Red Player\'s Turn';
  _game: GameComponent;
  _board: ConnectFour;
  constructor(gameBoard: GameComponent,  board: ConnectFour) {
    super();
    this._game = gameBoard;
    this._board = board;
  }
  dropADisk() {
    if (this._board.isColumnAvailable(this._game._columnNumber)) {
      this._board.takeATurn(this.diskColor);
      this.setNewState();
    }
  }

  private setNewState() {
    if (this._board.playerHasWon(this._game._columnNumber)) {
      this._game.setGameOverState();
    } else {
      this._game.setBlackPlayerState();
    }
  }
}
