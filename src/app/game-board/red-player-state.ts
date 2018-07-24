import {GameComponent} from './game.component';
import {IState} from './state';
import {ConnectFour} from './board';

export class RedPlayerTurn extends IState {
  diskColor = 'red';
  player = 'red player';
  _game: GameComponent;
  _board: ConnectFour;
  constructor(gameBoard: GameComponent,  board: ConnectFour) {
    super();
    this._game = gameBoard;
    this._board = board;
  }
  dropADisk(): string {
    this._game.setDiskColor();
    if (this._board.takeATurn(this.diskColor)) {
      this._game.setBlackPlayerState();
    } else {
      this._game.setGameOverState();
      return 'red player has won';
    }
  }
}
