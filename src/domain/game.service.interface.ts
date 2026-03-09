import Game from './game/game.model';

export default interface GameService {
  calculateNextMove(game: Game): Game;
  validateGame(game: Game): boolean;
  isGameOver(game: Game): number;
}
