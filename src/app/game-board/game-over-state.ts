import {GameComponent} from './game.component';
import {IState} from './state';
import {ConnectFour} from './board';

export class GameOverState extends IState {
  displayText = 'A Player Has Won';
  private _game: GameComponent;
  private _board: ConnectFour;
  constructor(game: GameComponent, board: ConnectFour) {
    super();
    this._game = game;
    this._board = board;
  }
  dropADisk() {
    this.displayText = 'A Player Has Won, Reset Game Board to Start New Game';
  }
}
