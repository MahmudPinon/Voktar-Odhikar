import { Module } from '@nestjs/common';
import { IndustryController } from './industry.controller';
import { IndustryService } from './industry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustryEntity } from './industry.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([IndustryEntity]),],
  controllers: [IndustryController],
  providers: [IndustryService],
})
export class IndustryModule {}
