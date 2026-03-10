import Game from './game/game.model';

export default interface GameService {
  calculateNextMove(game: Game): Promise<Game>;
  validateGame(game: Game): Promise<boolean>;
  isGameOver(game: Game): number;
  newGame(): Promise<Game>;
}
