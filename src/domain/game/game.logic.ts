import Game from 'src/domain/game/game.model';
import { Injectable } from '@nestjs/common';
import { CellType } from 'src/constants';

@Injectable()
export default class GameLogic {
  static validateGame(currentGame: Game, prevGame: Game): boolean {
    const prevGrid = prevGame.board.grid;
    const currentGrid = currentGame.board.grid;

    const size = prevGrid.length;

    if (
      currentGrid.length !== size ||
      currentGrid.some((row) => row.length !== size)
    ) {
      return false;
    }

    let moveCount = 0;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (currentGrid[i][j] !== prevGrid[i][j]) {
          if (
            prevGrid[i][j] !== CellType.empty ||
            !(
              currentGrid[i][j] === CellType.crosses ||
              currentGrid[i][j] === CellType.zeros
            )
          ) {
            return false;
          }
          moveCount++;
        }
      }
    }

    return moveCount === 1;
  }

  static calculateNextMove(game: Game): Game {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (game.board.grid[i][j] === CellType.empty) {
          game.board.grid[i][j] = CellType.zeros;
          return game;
        }
      }
    }

    return game;
  }

  static isGameOver(game: Game): number {
    return game.board.checkWinner();
  }
}
