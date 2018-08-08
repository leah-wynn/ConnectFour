import {GameComponent} from './game.component';
import {ConnectFour} from './board';
import {Player} from './Player';

export class BluePlayerTurn extends Player {
  constructor(game: GameComponent, board: ConnectFour) {
  super(game, board, 'blue', 'Blue Player\'s Turn');
  }

  nextPlayersTurn() {
    this._game.setRedPlayerState();
  }

  playerWon() {
    this._game.setBluePlayerWonState();
  }
}
