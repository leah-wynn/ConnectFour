import {GameComponent} from './game.component';
import {IState} from './state';
import {ConnectFour} from './board';

export class BlackPlayerTurn extends IState {
  diskColor = 'black';
  displayText = 'Black Player\'s Turn';
  _game: GameComponent;
  _board: ConnectFour;
  constructor(game: GameComponent, board: ConnectFour) {
    super();
    this._game = game;
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
      this._game.setRedPlayerState();
    }
  }
}
