import { Module } from '@nestjs/common';
import GameModule from './game/game.module';
import DomainModule from 'src/domain/domain.module';

@Module({
  imports: [GameModule, DomainModule],
  exports: [GameModule],
})
export default class DatasourceModule {}
