
import {ConnectFour} from './board';
import {RedPlayerTurn} from './red-player-state';
import {BluePlayerTurn} from './blue-player-state';
import {Component, OnInit} from '@angular/core';
import {IState} from './state';
import {BluePlayerWonState} from './blue-player-won-state';
import {RedPlayerWonState} from './red-player-won-state';



@Component({
  selector: 'app-game-board',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  _state: IState;
  _redPlayerState: IState;
  _bluePlayerState: IState;
  _connectFour: ConnectFour;
  _bluePlayerWonState: BluePlayerWonState;
  _redPlayerWonState: RedPlayerWonState;

  constructor() {
    this._connectFour = new ConnectFour(this);
    this._redPlayerState = new RedPlayerTurn(this, this._connectFour);
    this._bluePlayerState = new BluePlayerTurn(this, this._connectFour);
    this._bluePlayerWonState = new BluePlayerWonState(this, this._connectFour);
    this._redPlayerWonState = new RedPlayerWonState(this, this._connectFour);
    this._state = this._redPlayerState;
  }

  ngOnInit() {
  }
  resetGame() {
    this._state.resetGame();
  }

  setRedPlayerState() {
    this._state = this._redPlayerState;
  }
  setBluePlayerState() {
    this._state = this._bluePlayerState;
  }
  setBluePlayerWonState() {
    this._state = this._bluePlayerWonState;
  }
  setRedPlayerWonState() {
    this._state = this._redPlayerWonState;
  }
  takeATurn(columnNumber: number): any {
    this._state.dropADisk(columnNumber);
  }




}
