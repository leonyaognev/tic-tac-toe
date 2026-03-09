import { Module } from '@nestjs/common';
import GameController from './game.controller';
import DatasourceModule from 'src/datasource/datasource.module';

@Module({
  controllers: [GameController],
  imports: [DatasourceModule],
})
export default class GameModule {}
