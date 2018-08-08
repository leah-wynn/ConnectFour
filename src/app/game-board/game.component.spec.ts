import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a board', () => {
    expect(component._connectFour.board).toEqual([
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', '']
      ]);
  });
  it('should drop in the first disk', () => {
    component.takeATurn(0);
    expect(component._connectFour.board[0][0]).toEqual('red');
  });
  it('should drop in the second disk of the same column', () => {
    component.takeATurn(0);
    component.takeATurn(0);
    expect(component._connectFour.board[0][1]).toEqual('blue');
  });
  it('column is not available if column is full', () => {
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    expect(component._connectFour.isColumnAvailable(0)).toEqual(false);
  });
  it('column should be available if column is not full', () => {
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    expect(component._connectFour.isColumnAvailable(0)).toEqual(true);
  });

  it('should return error if column is not available', () => {
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    expect(component._state.displayText).toEqual('Red Player\'s Turn');
  });

  it('should stay same players turn if column is not available', () => {
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    expect(component._state.displayText).toEqual('Red Player\'s Turn');
    component.takeATurn(0);
    expect(component._state.displayText).toEqual('Red Player\'s Turn');
    expect(component.takeATurn(1));
    expect(component._state.displayText).toEqual('Blue Player\'s Turn');
  });

  it('determines red displayText has won if 4 disk are in a row vertically', () => {
    component.takeATurn(0);
    component.takeATurn(1);
    component.takeATurn(0);
    component.takeATurn(1);
    component.takeATurn(0);
    component.takeATurn(1);
    component.takeATurn(0);
    expect(component._state.displayText).toEqual('Red Player Has Won');
  });
  it('determines red displayText has won if 4 disk are in a row horizontally', () => {
    component.takeATurn(0);
    component.takeATurn(6);
    component.takeATurn(1);
    component.takeATurn(1);
    component.takeATurn(2);
    component.takeATurn(1);
    component.takeATurn(3);
    expect(component._state.displayText).toEqual('Red Player Has Won');
  });
  it('determines blue displayText has won if 4 disk are in a row horizontally', () => {
    component.takeATurn(0);
    component.takeATurn(1);
    component.takeATurn(0);
    component.takeATurn(2);
    component.takeATurn(6);
    component.takeATurn(3);
    component.takeATurn(5);
    component.takeATurn(4);
    expect(component._state.displayText).toEqual('Blue Player Has Won');
  });
  it('determines red player has won if 4 disk are in a row horizontally', () => {
    component.takeATurn(2);
    component.takeATurn(0);
    component.takeATurn(3);
    component.takeATurn(1);
    component.takeATurn(4);
    component.takeATurn(3);
    component.takeATurn(5);
    expect(component._state.displayText).toEqual('Red Player Has Won');
  });
  it('determines game over if second to last 4 disk are in a row horizontally', () => {
    component.takeATurn(0);
    component.takeATurn(2);
    component.takeATurn(1);
    component.takeATurn(3);
    component.takeATurn(2);
    component.takeATurn(4);
    component.takeATurn(4);
    component.takeATurn(5);
    expect(component._state.displayText).toEqual('Blue Player Has Won');
  });
  it('determines game over if player has won the last 4 disk are in a row horizontally', () => {
    component.takeATurn(3);
    component.takeATurn(2);
    component.takeATurn(4);
    component.takeATurn(0);
    component.takeATurn(5);
    component.takeATurn(0);
    component.takeATurn(6);
    expect(component._state.displayText).toEqual('Red Player Has Won');
  });
  it('should not continue to let player have a turn if the game is over', () => {
    component.takeATurn(3);
    component.takeATurn(2);
    component.takeATurn(4);
    component.takeATurn(0);
    component.takeATurn(5);
    component.takeATurn(0);
    component.takeATurn(6);
    component.takeATurn(6);
    expect(component._state.displayText).toEqual('Red Player Has Won');
  });
  it('should determine a player has won from left to right diagonally', () => {
    component.takeATurn(0);
    component.takeATurn(1);
    component.takeATurn(1);
    component.takeATurn(1);
    component.takeATurn(2);
    component.takeATurn(2);
    component.takeATurn(2);
    component.takeATurn(3);
    component.takeATurn(3);
    component.takeATurn(3);
    component.takeATurn(3);
    expect(component._state.displayText).toEqual('Red Player Has Won');
  });
  it('should determine a player has won second column from left to right diagonally', () => {
    component.takeATurn(1);
    component.takeATurn(2);
    component.takeATurn(2);
    component.takeATurn(2);
    component.takeATurn(3);
    component.takeATurn(3);
    component.takeATurn(3);
    component.takeATurn(4);
    component.takeATurn(4);
    component.takeATurn(4);
    component.takeATurn(4);
    expect(component._state.displayText).toEqual('Red Player Has Won');
  });
  it('should determine a player has won third column from left to right diagonally', () => {
    component.takeATurn(3);
    component.takeATurn(4);
    component.takeATurn(4);
    component.takeATurn(4);
    component.takeATurn(5);
    component.takeATurn(5);
    component.takeATurn(5);
    component.takeATurn(6);
    component.takeATurn(6);
    component.takeATurn(6);
    component.takeATurn(6);
    expect(component._state.displayText).toEqual('Red Player Has Won');
  });
  it('should determine a player has won first column from right to left diagonally', () => {
    component.takeATurn(6);
    component.takeATurn(5);
    component.takeATurn(5);
    component.takeATurn(5);
    component.takeATurn(4);
    component.takeATurn(4);
    component.takeATurn(4);
    component.takeATurn(3);
    component.takeATurn(3);
    component.takeATurn(3);
    component.takeATurn(3);
    expect(component._state.displayText).toEqual('Red Player Has Won');
  });
  it('should determine a player has won second column from right to left diagonally', () => {
    component.takeATurn(5);
    component.takeATurn(4);
    component.takeATurn(4);
    component.takeATurn(4);
    component.takeATurn(3);
    component.takeATurn(3);
    component.takeATurn(3);
    component.takeATurn(2);
    component.takeATurn(2);
    component.takeATurn(2);
    component.takeATurn(2);
    expect(component._state.displayText).toEqual('Red Player Has Won');
  });
  it('should determine a player has won third column from right to left diagonally', () => {
    component.takeATurn(4);
    component.takeATurn(3);
    component.takeATurn(3);
    component.takeATurn(3);
    component.takeATurn(2);
    component.takeATurn(2);
    component.takeATurn(2);
    component.takeATurn(1);
    component.takeATurn(1);
    component.takeATurn(1);
    component.takeATurn(1);
    expect(component._state.displayText).toEqual('Red Player Has Won');
  });
  it('should determine a player has won fourth column right to left diagonally', () => {
    component.takeATurn(3);
    component.takeATurn(2);
    component.takeATurn(2);
    component.takeATurn(2);
    component.takeATurn(1);
    component.takeATurn(1);
    component.takeATurn(1);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    expect(component._state.displayText).toEqual('Red Player Has Won');
  });
  it('should determine a player has won first column from left to right diagonally on first index', () => {
    component._connectFour.board = [
      ['', 'red', '', '', '', ''],
      ['', '', 'red', '', '', ''],
      ['', '', '', 'red', '', ''],
      ['red', 'blue', 'red', 'blue', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', '']  ];
    component.takeATurn(3);
    expect(component._state.displayText).toEqual('Red Player Has Won');
  });
  it('should determine a player has won first column from right to left diagonally on first index', () => {
    component._connectFour.board = [
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['red', 'blue', 'red', 'blue', '', ''],
      ['', '', '', 'red', '', ''],
      ['', '', 'red', '', '', ''],
      ['', 'red', '', '', '', '']  ];
    component.takeATurn(3);
    expect(component._state.displayText).toEqual('Red Player Has Won');
  });
});
