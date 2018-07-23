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
  dropADisk() {
    this._game.setDiskColor();
    this._board.dropDisk(this.diskColor);
    this._game.setBlackPlayerState();
  }
}
