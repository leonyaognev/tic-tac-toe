import { Module } from '@nestjs/common';
import GameServiceImpl from './game.service';
import Repository from './repository';
import InStorage from './storage.class';

@Module({
  providers: [
    {
      provide: 'GameService',
      useClass: GameServiceImpl,
    },
    Repository,
    InStorage,
  ],
  exports: ['GameService'],
})
export default class GameModule {}
