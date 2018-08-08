import {GameComponent} from './game.component';
import {ConnectFour} from './board';
import {Player} from './Player';

export class RedPlayerTurn extends Player {
  constructor(gameBoard: GameComponent,  board: ConnectFour) {
   super(gameBoard, board, 'red', 'Red Player\'s Turn');
  }
  nextPlayersTurn() {
    this._game.setBluePlayerState();
  }
  playerWon() {
    this._game.setRedPlayerWonState();
  }
}
