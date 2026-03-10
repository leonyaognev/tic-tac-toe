import Game from 'src/domain/game/game.model';
import GameRepository from './repository';
import { Injectable } from '@nestjs/common';
import GameService from 'src/domain/game.service.interface';
import GameLogic from 'src/domain/game/game.logic';
import { randomUUID, UUID } from 'crypto';

@Injectable()
export default class GameServiceImpl implements GameService {
  constructor(private repo: GameRepository) {}

  async validateGame(game: Game): Promise<boolean> {
    const prev = await this.repo.get(game.id);
    if (!prev) {
      const err = new Error('game not found');
      err.name = 'NotFoundError';
      throw err;
    }

    return GameLogic.validateGame(game, prev);
  }

  async calculateNextMove(game: Game): Promise<Game> {
    const result = GameLogic.calculateNextMove(game);
    await this.repo.save(result);
    return result;
  }

  isGameOver(game: Game): number | null {
    return GameLogic.isGameOver(game);
  }

  async newGame(): Promise<Game> {
    const game = new Game(randomUUID());
    await this.repo.save(game);

    return game;
  }

  async getGame(id: UUID): Promise<Game> {
    const game = await this.repo.get(id);
    if (!game) {
      const err = new Error('game not found');
      err.name = 'NotFoundError';
      throw err;
    }
    return game;
  }
}
