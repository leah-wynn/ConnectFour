import {GameComponent} from './game.component';

export class ConnectFour {
  public board: Array<Array<string>>;

  constructor(game: GameComponent) {
    this.board = [
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', '']  ];
  }
}

