import Game from 'src/domain/game/game.model';
import InStorage from './storage.class';
import gameMapper from './game.mapper';
import { UUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class Repository {
  constructor(private storage: InStorage) {}

  save(game: Game) {
    this.storage.saveGame(gameMapper.toDatasource(game));
  }

  get(id: UUID): Game | undefined {
    const data = this.storage.getGame(id);
    return data ? gameMapper.toDomain(data) : undefined;
  }
}
