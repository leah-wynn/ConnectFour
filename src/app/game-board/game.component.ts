
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
  _diskColor: string;
  _columnNumber: number;


  constructor() {
    this._connectFour = new ConnectFour(this);
    this._redPlayerState = new RedPlayerTurn(this, this._connectFour);
    this._blackPlayerState = new BlackPlayerTurn(this, this._connectFour);
    this._gameOverState = new GameOverState(this);
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

  takeATurn(columnNumber: number): any {
    this._columnNumber = columnNumber;
    if (!this._connectFour.isColumnAvailable(columnNumber)) {
      return 'Column is full, Choose another';
    }
    return this._state.dropADisk();
  }




}
