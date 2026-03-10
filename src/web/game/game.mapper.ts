import Game from 'src/domain/game/game.model';
import { PostGameDTO } from './game.dto';
import Board from 'src/domain/game/game.board.model';

class GameMapper {
  toDomain(DTO: PostGameDTO): Game {
    const board = new Board(DTO.size, DTO.grid);
    return new Game(DTO.id, board);
  }

  toDTO(game: Game, status?: 'win' | 'lose' | 'ongoing' | 'draw'): PostGameDTO {
    return {
      id: game.id,
      size: game.board.size,
      grid: game.board.grid,
      status: status,
    };
  }
}

export default new GameMapper();
