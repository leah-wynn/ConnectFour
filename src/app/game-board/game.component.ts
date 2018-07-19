
import {ConnectFour} from './board';
import {RedPlayerTurn} from './red-player-state';
import {BlackPlayerTurn} from './black-player-state';
import {GameOverState} from './game-over-state';
import {Component, OnInit} from '@angular/core';
import {IState} from './state';



@Component({
  selector: 'app-game-board',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  _state: IState;
  _redPlayerState: IState;
  _blackPlayerState: IState;
  _gameOverState: IState;
  _connectFour: ConnectFour;
  turn: string;
  _diskColor: string;
  _bottomSlot: number;
  _columnNumber: number;


  constructor() {
    this._connectFour = new ConnectFour(this);
    this._redPlayerState = new RedPlayerTurn(this);
    this._blackPlayerState = new BlackPlayerTurn(this);
    this._gameOverState = new GameOverState(this);
    this.turn = '';
    this._state = this._redPlayerState;
  }

  ngOnInit() {
  }

  setDiskColor() {
   this._diskColor =  this._state.diskColor;
  }

  setRedPlayerState() {
    this._state = this._redPlayerState;
  }
  setBlackPlayerState() {
    this._state = this._blackPlayerState;
  }
  setGameOverState() {
    this._state = this._gameOverState;
  }

  setBottomSlot() {
  this._bottomSlot = this._state.bottomSlot;
  }

  takeATurn(columnNumber: number): string {
    this._columnNumber = columnNumber;
    if (!this.isColumnAvailable(this._columnNumber)) {
      return 'Column is full, Choose another';
    }
    this._state.dropADisk();
    if (this.playerHasWon(this._columnNumber, this._bottomSlot)) {
      let winner = '';
      if (this._state === this._redPlayerState) {
        winner = 'black player';
      }
      if (this._state === this._blackPlayerState) {
        winner = 'red player';
      }
      return winner + ' has won';
    }
  }

  isColumnAvailable(columnNumber: number) {
    return this._connectFour.board[columnNumber][5] === '';
  }

  playerHasWon(columnNumber: number, bottomSlot: number): boolean {
    const column = this._connectFour.board[columnNumber];
    const verticalDiskCount = this.countVerticalDisks(column);

    const horizontalDiskCount = this.countHorizontalDisks(bottomSlot);
    return horizontalDiskCount === 4 || verticalDiskCount === 4;
  }

  countVerticalDisks(column): number {
    let diskCount = 1;
    column.forEach((currentSlot, index) => {
      if (currentSlot === column[index + 1] && currentSlot !== '') {
        diskCount += 1;
      }
    });
    return diskCount;
  }

  countHorizontalDisks(bottomSlot: number) {
    let diskCount = 1;
    for (let i = 0; i < 6; i++) {
      const currentColumn = this._connectFour.board[i];
      if (currentColumn[bottomSlot] === this._connectFour.board[i + 1][bottomSlot] && currentColumn[bottomSlot] !== '') {
        diskCount += 1;
      }
    }
    return diskCount;
  }
}
