import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a board', () => {
    expect(component.board).toEqual([
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
    component.dropDisk(0, 'red');
    expect(component.board[0][0]).toEqual('red');
  });
  it('should drop in the second disk of the same column', () => {
    component.dropDisk(0, 'red');
    component.dropDisk(0, 'black');
    expect(component.board[0][1]).toEqual('black');
  });
  it('column is not available if column is full', () => {
    component.dropDisk(0, 'red');
    component.dropDisk(0, 'black');
    component.dropDisk(0, 'red');
    component.dropDisk(0, 'black');
    component.dropDisk(0, 'red');
    component.dropDisk(0, 'black');
    expect(component.isColumnAvailable(0)).toEqual(false);
  });
  it('column should be available if column is not full', () => {
    component.dropDisk(0, 'red');
    component.dropDisk(0, 'black');
    component.dropDisk(0, 'red');
    expect(component.isColumnAvailable(0)).toEqual(true);
  });
  it('should be red players turn', () => {
    expect(component.isBlackPlayersTurn()).toEqual(false);
    expect(component.isRedPlayersTurn()).toEqual(true);
  });
  it('should be black players turn', () => {
    component.takeATurn(0);
    expect(component.isBlackPlayersTurn()).toEqual(true);
  });
  it('should return error if column is not available', () => {
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    expect(component.takeATurn(0)).toEqual('Column is full, Choose another');
  });
  it('should stay same players turn if column is not available', () => {
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    expect(component.isRedPlayersTurn()).toEqual(true);
    expect(component.takeATurn(0)).toEqual('Column is full, Choose another');
    expect(component.isRedPlayersTurn()).toEqual(true);
    expect(component.takeATurn(1));
    expect(component.isBlackPlayersTurn()).toEqual(true);
  });

  it('determines player has won if 4 disk are in a row horizontally', () => {
    component.takeATurn(0);
    component.takeATurn(1);
    component.takeATurn(0);
    component.takeATurn(1);
    component.takeATurn(0);
    component.takeATurn(1);
    component.takeATurn(0);
    expect(component.playerHasWon()).toEqual(true);
  });
});
