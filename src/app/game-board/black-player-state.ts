import {GameComponent} from './game.component';
import {IState} from './state';
import {ConnectFour} from './board';

export class BlackPlayerTurn extends IState {
  diskColor = 'black';
  player = 'black player';
  _game: GameComponent;
  _board: ConnectFour;
  constructor(game: GameComponent, board: ConnectFour) {
    super();
    this._game = game;
    this._board = board;
  }

  dropADisk() {
    this._game.setDiskColor();
    this._game.setRedPlayerState();
    this._board.dropDisk(this.diskColor);
  }
}
