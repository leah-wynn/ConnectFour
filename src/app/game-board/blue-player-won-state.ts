import {GameComponent} from './game.component';
import {IState} from './state';
import {ConnectFour} from './board';

export class BluePlayerWonState implements IState {
  displayText = 'Blue Player Has Won';
  private _game: GameComponent;
  private _board: ConnectFour;
  constructor(game: GameComponent, board: ConnectFour) {
    this._game = game;
    this._board = board;
  }
  dropADisk() {
  }
  resetGame() {
    this._board.resetBoard();
    this._game.setRedPlayerState();
  }
}
