import {Component, OnInit} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  board: Array<Array<string>>;
  turn: string;
  _diskColor: string;

  constructor() {
    this.turn = '';
    this.board =
    [ ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', '']  ];
  }

  ngOnInit() {
    const canvas = document.getElementById('gameBoard');
  }


  takeATurn(columnNumber: number): string {
    if (this.isRedPlayersTurn() && this.isColumnAvailable(columnNumber)) {
      this.dropDisk(columnNumber, 'red');
      this.turn = 'black player';
    } else if (this.isBlackPlayersTurn() && this.isColumnAvailable(columnNumber)) {
      this.dropDisk(columnNumber, 'black');
      this.turn = 'red player';
    } else {
      return 'Column is full, Choose another';
    }
  }

  dropDisk(columnNumber: number, diskColor: string) {
    let bottomSlot;
    const column = this.board[columnNumber];
    for (let i = 0; i < column.length; i++) {
      if (column[i] === '') {
        bottomSlot = i;
        break;
      }
    }
    this._diskColor = diskColor;
    column[bottomSlot] = this._diskColor;

  }

  isColumnAvailable(columnNumber: number) {
    return this.board[columnNumber][5] === '';
  }

  isBlackPlayersTurn() {
    return this.turn === 'black player';
  }

  isRedPlayersTurn() {
    return this.turn === '' || this.turn === 'red player';
  }

  playerHasWon(): boolean {
    let diskCount = 0;
    const column = this.board[0];
    column.forEach((currentSlot, index) => {
      if (currentSlot === column[index + 1]) {
        diskCount += 1;
      }
    });
    return diskCount >= 4;
  }
}
