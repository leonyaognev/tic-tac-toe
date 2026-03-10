import { UUID } from 'crypto';
import Game from './game/game.model';

export default interface GameService {
  calculateNextMove(game: Game): Promise<Game>;
  validateGame(game: Game): Promise<boolean>;
  isGameOver(game: Game): number | null;
  newGame(): Promise<Game>;
  getGame(id: UUID): Promise<Game>;
}
