import { Module } from '@nestjs/common';
import DatasourceModule from './datasource/datasource.module';
import WebModule from './web/web.module';

@Module({
  imports: [DatasourceModule, WebModule],
})
export default class AppModule {}
