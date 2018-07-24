import {GameComponent} from './game.component';
import {IState} from './state';

export class GameOverState extends IState {
  diskColor: string;
  bottomSlot: number;
  player: string;
  constructor(gameBoard: GameComponent) {
    super();
  }
  dropDisk(column: number) {}
  dropADisk() {}

}
