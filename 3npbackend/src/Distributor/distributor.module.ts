import { Module } from '@nestjs/common';
import { AppController, } from './distributor.controller';
import { AppService } from './distributor.service';

@Module({
  imports: [],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
