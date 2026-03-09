import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import type { GameData } from './models/gameData.model';

@Injectable()
export default class InStorage {
  private games: Map<UUID, GameData> = new Map<UUID, GameData>();

  saveGame(gameData: GameData) {
    this.games.set(gameData.id, gameData);
  }

  getGame(id: UUID): GameData | undefined {
    return this.games.get(id);
  }
}
