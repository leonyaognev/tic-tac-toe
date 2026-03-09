import { GameData } from './models/gameData.model';
import Game from 'src/domain/game/game.model';
import Board from 'src/domain/game/game.board.model';

class GameMapper {
  toDomain(gameData: GameData): Game {
    const board = new Board(
      gameData.boardData.grid.length,
      gameData.boardData.grid,
    );
    return new Game(gameData.id, board);
  }

  toDatasource(game: Game): GameData {
    return {
      id: game.id,
      boardData: {
        grid: structuredClone(game.board.grid),
      },
    };
  }
}

export default new GameMapper();
