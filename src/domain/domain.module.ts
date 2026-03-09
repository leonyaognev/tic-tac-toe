import { Module } from '@nestjs/common';
import GameModule from './game/game.module';

@Module({
  imports: [GameModule],
})
export default class DomainModule {}
