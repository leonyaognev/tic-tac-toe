import Game from 'src/domain/game/game.model';
import GameRepository from './repository';
import { Injectable } from '@nestjs/common';
import GameService from 'src/domain/game.service.interface';
import GameLogic from 'src/domain/game/game.logic';

@Injectable()
export default class GameServiceImpl implements GameService {
  constructor(private repo: GameRepository) {}

  validateGame(game: Game): boolean {
    const prev = this.repo.get(game.id);
    if (!prev) {
      const err = new Error('game not found');
      err.name = 'NotFoundError';
      throw err;
    }

    return GameLogic.validateGame(prev, game);
  }

  calculateNextMove(game: Game): Game {
    const result = GameLogic.calculateNextMove(game);
    this.repo.save(result);
    return result;
  }

  isGameOver(game: Game): number {
    return GameLogic.isGameOver(game);
  }
}
