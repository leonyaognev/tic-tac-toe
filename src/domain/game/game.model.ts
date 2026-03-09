import type { UUID } from 'crypto';
import Board from './game.board.model';
import { GameSettings } from 'src/constants';

export default class Game {
  id: UUID;
  board: Board;

  constructor(id: UUID, board: Board = new Board(GameSettings.defaultGrid)) {
    this.id = id;
    this.board = board;
  }
}
