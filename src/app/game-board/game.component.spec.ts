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
    expect(component._connectFour.board[0][1]).toEqual('black');
  });
  it('column is not available if column is full', () => {
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    expect(component.isColumnAvailable(0)).toEqual(false);
  });
  it('column should be available if column is not full', () => {
    component.takeATurn(0);
    component.takeATurn(0);
    component.takeATurn(0);
    expect(component.isColumnAvailable(0)).toEqual(true);
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
    expect(component._state.player).toEqual('red player');
    expect(component.takeATurn(0)).toEqual('Column is full, Choose another');
    expect(component._state.player).toEqual('red player');
    expect(component.takeATurn(1));
    console.log(component._state.player);
    expect(component._state.player).toEqual('black player');
  });

  it('determines red player has won if 4 disk are in a row vertically', () => {
    component.takeATurn(0);
    component.takeATurn(1);
    component.takeATurn(0);
    component.takeATurn(1);
    component.takeATurn(0);
    component.takeATurn(1);
    expect(component.takeATurn(0)).toEqual('red player has won');
  });
  it('determines red player has won if 4 disk are in a row horizontally', () => {
    component.takeATurn(0);
    component.takeATurn(6);
    component.takeATurn(1);
    component.takeATurn(1);
    component.takeATurn(2);
    component.takeATurn(1);
    expect(component.takeATurn(3)).toEqual('red player has won');
  });
  it('determines black player has won if 4 disk are in a row horizontally', () => {
    component.takeATurn(0);
    component.takeATurn(1);
    component.takeATurn(0);
    component.takeATurn(2);
    component.takeATurn(6);
    component.takeATurn(3);
    component.takeATurn(5);
    expect(component.takeATurn(4)).toEqual('black player has won');
  });
});
