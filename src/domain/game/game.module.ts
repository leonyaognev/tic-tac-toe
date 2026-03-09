import { Module } from '@nestjs/common';
import GameLogic from './game.logic';

@Module({
  providers: [GameLogic],
})
export default class GameModule {}
