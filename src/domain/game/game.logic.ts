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
    const bestMove = this.minimax(game, true, 0);
    if (bestMove.row !== -1 && bestMove.col !== -1) {
      game.board.grid[bestMove.row][bestMove.col] = CellType.zeros;
    }
    return game;
  }

  private static minimax(
    game: Game,
    isMaximizing: boolean,
    depth: number,
  ): { score: number; row: number; col: number } {
    const winner = game.board.checkWinner();
    if (winner === CellType.zeros)
      return { score: 10 - depth, row: -1, col: -1 };
    if (winner === CellType.crosses)
      return { score: depth - 10, row: -1, col: -1 };
    if (winner === CellType.empty) return { score: 0, row: -1, col: -1 };

    let bestMove = {
      score: isMaximizing ? -Infinity : Infinity,
      row: -1,
      col: -1,
    };

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (game.board.grid[i][j] === CellType.empty) {
          game.board.grid[i][j] = isMaximizing
            ? CellType.zeros
            : CellType.crosses;
          const result = this.minimax(game, !isMaximizing, depth + 1);
          game.board.grid[i][j] = CellType.empty;

          if (isMaximizing && result.score > bestMove.score) {
            bestMove = { score: result.score, row: i, col: j };
          }
          if (!isMaximizing && result.score < bestMove.score) {
            bestMove = { score: result.score, row: i, col: j };
          }
        }
      }
    }

    return bestMove;
  }

  static isGameOver(game: Game): number | null {
    return game.board.checkWinner();
  }
}
