import { Module } from '@nestjs/common';
import { AppController, } from './distributor.controller';
import { AppService } from './distributor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistributorEntity } from './distributor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DistributorEntity])],
  controllers: [AppController,],
  providers: [AppService],
})
export class DisModule {}
