import { Module } from '@nestjs/common';
import { distributorController, } from './distributor.controller';
import { distributorService } from './distributor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistributorEntity } from './distributor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DistributorEntity])],
  controllers: [distributorController,],
  providers: [distributorService],
})
export class DisModule {}
