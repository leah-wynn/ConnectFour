import {IState} from './state';
import {ConnectFour} from './board';
import {GameComponent} from './game.component';

export abstract class Player implements IState {
  diskColor: string;
  displayText: string;
  _board: ConnectFour;
  _game: GameComponent;
  protected constructor(game: GameComponent, board: ConnectFour, diskColor: string, displayText: string) {
    this._board = board;
    this._game = game;
    this.diskColor = diskColor;
    this.displayText = displayText;
  }

  dropADisk(columnNumber: number) {
    if (this._board.isColumnAvailable(columnNumber)) {
      this._board.dropTheDisk(this.diskColor, columnNumber);
      this.setNewState(columnNumber);
    }
  }

  setNewState(columnNumber: number) {
    if (this._board.playerHasWon(columnNumber)) {
      this.playerWon();
    } else {
      this.nextPlayersTurn();
    }
  }

  abstract nextPlayersTurn();
  abstract playerWon();

  resetGame() {
    this._board.resetBoard();
    this._game.setRedPlayerState();
  }

}
