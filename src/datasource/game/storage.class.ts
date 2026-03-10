import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import type { GameData } from './models/gameData.model';

@Injectable()
export default class InStorage {
  private games: Map<UUID, GameData> = new Map<UUID, GameData>();

  async saveGame(gameData: GameData): Promise<void> {
    this.games.set(gameData.id, gameData);
    return Promise.resolve();
  }

  async getGame(id: UUID): Promise<GameData | undefined> {
    return Promise.resolve(this.games.get(id));
  }
}
