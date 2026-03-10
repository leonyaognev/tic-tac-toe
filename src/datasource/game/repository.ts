import Game from 'src/domain/game/game.model';
import InStorage from './storage.class';
import gameMapper from './game.mapper';
import { UUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class Repository {
  constructor(private storage: InStorage) {}

  async save(game: Game) {
    await this.storage.saveGame(gameMapper.toDatasource(game));
  }

  async get(id: UUID): Promise<Game | undefined> {
    const data = await this.storage.getGame(id);
    return data ? gameMapper.toDomain(data) : undefined;
  }
}
